import mammoth from 'mammoth';

export const DocxService = {
    /**
     * Converts a DOCX file to HTML using mammoth.js
     * Mammoth focuses on converting semantic information (paragraphs, headings, lists)
     * rather than direct visual representation, which is better for editing.
     */
    convertToHtml: async (file: Blob | ArrayBuffer | string): Promise<string> => {
        try {
            let arrayBuffer: ArrayBuffer;
            if (typeof file === 'string') {
                const response = await fetch(file);
                arrayBuffer = await response.arrayBuffer();
            } else if (file instanceof Blob) {
                arrayBuffer = await file.arrayBuffer();
            } else {
                arrayBuffer = file;
            }

            const options = {
                styleMap: [
                    "p[style-name='Title'] => h1.title",
                    "p[style-name='Subtitle'] => p.subtitle",
                    "p[style-name='Heading 1'] => h1",
                    "p[style-name='Heading 2'] => h2",
                    "p[style-name='Heading 3'] => h3",
                    "p[style-name='Heading 4'] => h4",
                    "p[style-name='Quotation'] => blockquote",
                    "p[style-name='Intense Quote'] => blockquote.intense",
                    "u => u",
                    "strike => del",
                ],
                convertImage: mammoth.images.dataUri
            };

            const result = await mammoth.convertToHtml({ arrayBuffer }, options);

            if (result.messages.length > 0) {
                console.warn("Mammoth conversion messages:", result.messages);
            }

            return result.value || "";
        } catch (error) {
            console.error("Error converting DOCX to HTML:", error);
            throw error;
        }
    }
};
