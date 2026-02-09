import JSZip from 'jszip';

export interface SlideElement {
    id: string;
    type: 'text' | 'shape' | 'image' | 'list';
    content: string;
    x?: number; // Optional for cards
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
    fontSize?: number;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    isHeading?: boolean;
    level?: number; // For headings
}

export type CardLayout = 'title' | 'content' | 'split' | 'blank' | 'agenda';

export interface SlideData {
    id: number;
    layout: CardLayout;
    elements: SlideElement[];
    accentColor?: string;
    backgroundUrl?: string;
    columns?: { elements: SlideElement[] }[]; // For split layouts
}

export const PptxParser = {
    parse: async (file: Blob | string): Promise<SlideData[]> => {
        try {
            const zip = new JSZip();
            const contents = typeof file === 'string'
                ? await (await fetch(file)).blob()
                : file;

            const zipData = await zip.loadAsync(contents);

            // 1. Find all slides
            const slideFiles = Object.keys(zipData.files).filter(name =>
                name.startsWith('ppt/slides/slide') && name.endsWith('.xml') && !name.includes('_rels')
            ).sort((a, b) => {
                const numA = parseInt(a.match(/\d+/)![0]);
                const numB = parseInt(b.match(/\d+/)![0]);
                return numA - numB;
            });

            const slides: SlideData[] = [];

            for (let i = 0; i < slideFiles.length; i++) {
                const slidePath = slideFiles[i];
                const slideNum = slidePath.match(/\d+/)![0];
                const relsPath = `ppt/slides/_rels/slide${slideNum}.xml.rels`;

                const slideXml = await zipData.file(slidePath)?.async('string');
                const relsXml = await zipData.file(relsPath)?.async('string');

                if (slideXml) {
                    // Extract relationships map (rId -> target)
                    const relsMap: Record<string, string> = {};
                    if (relsXml) {
                        const relsDoc = new DOMParser().parseFromString(relsXml, "text/xml");
                        const rels = relsDoc.getElementsByTagName('Relationship');
                        for (let j = 0; j < rels.length; j++) {
                            const id = rels[j].getAttribute('Id');
                            const target = rels[j].getAttribute('Target');
                            if (id && target) {
                                // Targets are relative to slides, e.g., "../media/image1.png"
                                relsMap[id] = target.replace('../', 'ppt/');
                            }
                        }
                    }

                    const elements = await PptxParser.extractElements(slideXml, zipData, relsMap);

                    // Guess layout based on elements
                    let layout: CardLayout = 'content';
                    const textElements = elements.filter(el => el.type === 'text');
                    const imageElements = elements.filter(el => el.type === 'image');

                    if (textElements.length === 1 && textElements[0].fontSize && textElements[0].fontSize > 40) {
                        layout = 'title';
                    } else if (textElements.length > 3 && textElements.every(el => el.content.match(/^\d+/) || el.content.length < 50)) {
                        layout = 'agenda';
                    } else if (imageElements.length > 0 && textElements.length > 0) {
                        layout = 'split';
                    }

                    slides.push({
                        id: i + 1,
                        layout,
                        elements
                    });
                }
            }

            return slides;
        } catch (error) {
            console.error("Error parsing PPTX:", error);
            throw error;
        }
    },

    extractElements: async (xmlString: string, zip: JSZip, relsMap: Record<string, string>): Promise<SlideElement[]> => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        const elements: SlideElement[] = [];

        // Scale factors for 16:9 Widescreen (assuming standard 9144000x5143500 EMU)
        const emuToX = (emu: string) => (parseInt(emu) / 9144000) * 100;
        const emuToY = (emu: string) => (parseInt(emu) / 5143500) * 100;

        // 1. Extract Shapes/Text
        const shapes = xmlDoc.getElementsByTagName('p:sp');
        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i];
            const textNodes = shape.getElementsByTagName('a:t');
            let content = "";
            for (let j = 0; j < textNodes.length; j++) {
                content += textNodes[j].textContent || "";
            }

            if (!content.trim()) continue;

            const xfrm = shape.getElementsByTagName('a:xfrm')[0];
            const off = xfrm?.getElementsByTagName('a:off')[0];
            const ext = xfrm?.getElementsByTagName('a:ext')[0];

            if (off && ext) {
                elements.push({
                    id: `txt_${i}_${Math.random().toString(36).substr(2, 5)}`,
                    type: 'text',
                    content,
                    x: emuToX(off.getAttribute('x') || '0'),
                    y: emuToY(off.getAttribute('y') || '0'),
                    width: emuToX(ext.getAttribute('cx') || '0'),
                    height: emuToY(ext.getAttribute('cy') || '0'),
                    fontSize: 24,
                    isHeading: i === 0 || elements.length === 0, // Heuristic for title
                    level: i === 0 ? 1 : 2
                });
            }
        }

        // 2. Extract Images
        const pics = xmlDoc.getElementsByTagName('p:pic');
        for (let i = 0; i < pics.length; i++) {
            const pic = pics[i];
            const blip = pic.getElementsByTagName('a:blip')[0];
            const rId = blip?.getAttribute('r:embed');

            if (rId && relsMap[rId]) {
                const imgPath = relsMap[rId];
                const imgFile = zip.file(imgPath);

                if (imgFile) {
                    const imgData = await imgFile.async('base64');
                    const extension = imgPath.split('.').pop()?.toLowerCase();
                    const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg';
                    const src = `data:${mimeType};base64,${imgData}`;

                    const xfrm = pic.getElementsByTagName('p:spPr')[0]?.getElementsByTagName('a:xfrm')[0];
                    const off = xfrm?.getElementsByTagName('a:off')[0];
                    const ext = xfrm?.getElementsByTagName('a:ext')[0];

                    if (off && ext) {
                        elements.push({
                            id: `img_${i}_${Math.random().toString(36).substr(2, 5)}`,
                            type: 'image',
                            content: src,
                            x: emuToX(off.getAttribute('x') || '0'),
                            y: emuToY(off.getAttribute('y') || '0'),
                            width: emuToX(ext.getAttribute('cx') || '0'),
                            height: emuToY(ext.getAttribute('cy') || '0')
                        });
                    }
                }
            }
        }

        return elements;
    }
};
