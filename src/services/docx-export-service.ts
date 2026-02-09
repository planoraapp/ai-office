import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun, SectionType } from 'docx';
import { SlideData, SlideElement } from '@/services/pptx-parser';
import { Theme } from './style-service';

export const DocxExportService = {
    exportToDocx: async (slides: SlideData[], theme: Theme, fileName: string = 'Documento.docx') => {
        try {
            const sections = [];

            for (const slide of slides) {
                const children: any[] = [];

                // Render each element based on type and layout
                for (const el of slide.elements) {
                    if (el.type === 'image') {
                        // Extract base64 data
                        const base64Data = el.content.split(',')[1];
                        if (base64Data) {
                            // Convert base64 to Uint8Array for browser compatibility
                            const binaryString = window.atob(base64Data);
                            const bytes = new Uint8Array(binaryString.length);
                            for (let j = 0; j < binaryString.length; j++) {
                                bytes[j] = binaryString.charCodeAt(j);
                            }

                            children.push(
                                new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    spacing: { before: 400, after: 400 },
                                    children: [
                                        new ImageRun({
                                            data: bytes,
                                            transformation: {
                                                width: 400 * (el.width || 1),
                                                height: 400 * (el.height || 1),
                                            },
                                        } as any),
                                    ],
                                })
                            );
                        }
                    } else {
                        // Text/Heading handling
                        const isHeading = el.isHeading || el.level === 1;
                        const style = isHeading ? theme.headingStyles : theme.paragraphStyles;

                        children.push(
                            new Paragraph({
                                heading: isHeading ? HeadingLevel.HEADING_1 : undefined,
                                alignment: el.textAlign === 'center' ? AlignmentType.CENTER : el.textAlign === 'right' ? AlignmentType.RIGHT : AlignmentType.LEFT,
                                spacing: {
                                    after: style.marginBottom * 20, // Conversion to twips
                                },
                                children: [
                                    new TextRun({
                                        text: el.content,
                                        bold: 'bold' in style ? style.bold : false,
                                        size: style.fontSize * 2, // docx uses half-points
                                        color: style.color.replace('#', ''),
                                        allCaps: 'textTransform' in style ? style.textTransform === 'uppercase' : false,
                                        font: theme.fontFamily.split(',')[0],
                                    }),
                                ],
                            })
                        );
                    }
                }

                sections.push({
                    properties: {
                        type: SectionType.NEXT_PAGE,
                        page: {
                            margin: theme.pageMargins
                        }
                    },
                    children: children,
                });
            }

            const doc = new Document({
                sections: sections,
            });

            const blob = await Packer.toBlob(doc);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);

            return true;
        } catch (error) {
            console.error("Error exporting to DOCX:", error);
            throw error;
        }
    }
};
