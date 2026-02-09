'use client';

import React from 'react';
import {
    FileText,
    Image as ImageIcon,
    Type,
    ChevronRight,
    Search,
    Copy,
    Wand2
} from 'lucide-react';

interface ExtractedContentPanelProps {
    content?: string;
    images?: string[];
    fileName?: string;
}

export function ExtractedContentPanel({ content, images = [], fileName }: ExtractedContentPanelProps) {
    return (
        <div className="flex-1 h-full border-r border-border bg-card flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border sticky top-0 bg-card z-10 shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        Conteúdo Extraído
                    </h3>
                    <div className="flex gap-1">
                        <button className="p-1 hover:bg-muted rounded transition-colors" title="Buscar">
                            <Search className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded transition-colors" title="Copiar tudo">
                            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                    </div>
                </div>
                <div className="px-2 py-1 bg-muted rounded text-[10px] font-mono text-muted-foreground truncate">
                    {fileName || 'document.docx'}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                {/* TEXT SECTION */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                            <Type className="w-3 h-3" /> Texto
                        </h4>
                        <span className="text-[9px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            {content ? content.split(' ').length : 0} palavras
                        </span>
                    </div>
                    <div className="bg-muted rounded-xl p-3 border border-border/50">
                        <div className="text-[11px] leading-relaxed text-foreground/80 line-clamp-[15] space-y-2">
                            {content ? (
                                extractParagraphs(content).map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))
                            ) : (
                                'Nenhum texto extraído ainda. Carregue um documento para começar.'
                            )}
                        </div>
                        {content && (
                            <button className="w-full mt-3 py-1.5 border border-dashed border-border hover:border-primary/50 text-[10px] font-bold text-muted-foreground hover:text-primary transition-all flex items-center justify-center gap-2 rounded-lg">
                                Ver texto completo <ChevronRight className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>

                {/* IMAGES SECTION */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <ImageIcon className="w-3 h-3" /> Imagens
                    </h4>
                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                            {images.map((img, i) => (
                                <div key={i} className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                                    <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={`Extracted ${i}`} />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button className="p-1.5 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                            <Wand2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 bg-muted/20 border border-dashed border-border rounded-xl text-muted-foreground">
                            <ImageIcon className="w-6 h-6 opacity-20 mb-2" />
                            <span className="text-[10px]">Nenhuma imagem encontrada</span>
                        </div>
                    )}
                </div>
            </div>

            {/* SUGGESTION FOOTER (FIXED) */}
            <div className="p-4 border-t border-border bg-white shrink-0 z-10">
                <div className="bg-muted rounded-xl p-3 border border-border">
                    <p className="text-[10px] text-primary font-medium flex items-center gap-1.5 mb-2">
                        <Wand2 className="w-3 h-3" /> Dica da IA
                    </p>
                    <p className="text-[10px] text-primary/70 leading-normal">
                        Você pode selecionar partes do texto ou imagens específicas para usar como base para novos slides.
                    </p>
                </div>
            </div>
        </div>
    );
}

function extractParagraphs(html: string): string[] {
    if (!html) return [];

    // Create a temporary DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const paragraphs: string[] = [];

    // Select all relevant block tags
    const blocks = doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote');

    blocks.forEach(block => {
        const text = block.textContent?.trim();
        if (text) {
            paragraphs.push(text);
        }
    });

    // If no blocks found (maybe just plain text or other structure), try body text
    if (paragraphs.length === 0) {
        const bodyText = doc.body.textContent?.trim();
        if (bodyText) paragraphs.push(bodyText);
    }

    return paragraphs;
}
