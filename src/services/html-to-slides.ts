import { SlideData, SlideElement } from './pptx-parser';

export const HtmlToSlidesService = {
    parse: (html: string): SlideData[] => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const slides: SlideData[] = [];
        let currentElements: SlideElement[] = [];
        let cardId = 1;

        // Helper to finalize current card and start a new one
        const finalizeCard = () => {
            if (currentElements.length > 0) {
                slides.push({
                    id: cardId++, // Now a number
                    elements: [...currentElements],
                    layout: 'content', // Default layout
                    accentColor: getRandomAccentColor(), // Assign a random accent color
                });
                currentElements = [];
            }
        };

        // Iterate through body children to build slides
        Array.from(doc.body.children).forEach((node) => {
            const tagName = node.tagName.toLowerCase();

            // New Card on H1 or H2 (Major section breaks)
            if (tagName === 'h1' || tagName === 'h2') {
                finalizeCard();
            }

            // Create Element from Node
            const element = createSlideElement(node);
            if (element) {
                currentElements.push(element);
            }
        });

        // Finalize the last card
        finalizeCard();

        return slides;
    }
};

function createSlideElement(node: Element): SlideElement | null {
    const tagName = node.tagName.toLowerCase();
    const id = `el-${Math.random().toString(36).substr(2, 9)}`;

    if (tagName === 'img') {
        return {
            id,
            type: 'image',
            content: (node as HTMLImageElement).src,
            x: 0, y: 0, width: 400, height: 300, // Default sizing, layout handles responsiveness
        };
    }

    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'blockquote'].includes(tagName)) {
        // User requested to strip HTML tags and keep only textual part
        let content = node.textContent || "";
        const isHeading = tagName.startsWith('h');

        // Basic cleanup
        content = content.trim();
        if (!content) return null; // Skip empty text nodes

        return {
            id,
            type: 'text',
            content,
            x: 0, y: 0, width: 800, height: 50,
            fontSize: isHeading ? 24 : 16,
            isHeading,
            textAlign: 'left', // Default
        };
    }

    return null;
}

function getRandomAccentColor() {
    const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
    return colors[Math.floor(Math.random() * colors.length)];
}
