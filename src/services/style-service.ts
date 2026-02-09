export interface Theme {
    id: string;
    name: string;
    description: string;
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    headingStyles: {
        fontSize: number;
        bold: boolean;
        color: string;
        textTransform?: 'uppercase' | 'none';
        marginBottom: number;
    };
    paragraphStyles: {
        fontSize: number;
        lineHeight: number;
        color: string;
        marginBottom: number;
    };
    pageMargins: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}

export const THEMES: Record<string, Theme> = {
    modern: {
        id: 'modern',
        name: 'Executivo Moderno',
        description: 'Limpo, direto e profissional com fontes sans-serif.',
        fontFamily: 'Inter, sans-serif',
        primaryColor: '#000000',
        secondaryColor: '#3b82f6',
        headingStyles: {
            fontSize: 24,
            bold: true,
            color: '#000000',
            marginBottom: 12
        },
        paragraphStyles: {
            fontSize: 11,
            lineHeight: 1.5,
            color: '#374151',
            marginBottom: 8
        },
        pageMargins: {
            top: 1440, // 1 inch in TWIPs
            right: 1440,
            bottom: 1440,
            left: 1440
        }
    },
    corporate: {
        id: 'corporate',
        name: 'Corporativo Clássico',
        description: 'Elegância tradicional com tons de azul e fontes serifadas.',
        fontFamily: 'Times New Roman, serif',
        primaryColor: '#1e3a8a',
        secondaryColor: '#1e40af',
        headingStyles: {
            fontSize: 22,
            bold: true,
            color: '#1e3a8a',
            textTransform: 'uppercase',
            marginBottom: 15
        },
        paragraphStyles: {
            fontSize: 12,
            lineHeight: 1.2,
            color: '#1f2937',
            marginBottom: 10
        },
        pageMargins: {
            top: 1800,
            right: 1800,
            bottom: 1800,
            left: 1800
        }
    },
    creative: {
        id: 'creative',
        name: 'Criativo e Vibrante',
        description: 'Design dinâmico para apresentações de alto impacto.',
        fontFamily: 'Outfit, sans-serif',
        primaryColor: '#7c3aed',
        secondaryColor: '#db2777',
        headingStyles: {
            fontSize: 28,
            bold: true,
            color: '#7c3aed',
            marginBottom: 20
        },
        paragraphStyles: {
            fontSize: 11,
            lineHeight: 1.6,
            color: '#4b5563',
            marginBottom: 12
        },
        pageMargins: {
            top: 1000,
            right: 1000,
            bottom: 1500,
            left: 1000
        }
    }
};

export const StyleService = {
    getTheme: (id: string): Theme => THEMES[id] || THEMES.modern,
    getAllThemes: (): Theme[] => Object.values(THEMES)
};
