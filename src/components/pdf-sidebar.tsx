'use client';

import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2 } from 'lucide-react';

// Using a more stable worker source from the local package if possible, or a fixed version CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

interface PdfSidebarProps {
    fileUrl: string;
    activePage: number;
    onPageClick: (page: number) => void;
}

export function PdfSidebar({ fileUrl, activePage, onPageClick }: PdfSidebarProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    return (
        <div className="hidden lg:flex flex-col gap-4 w-48 shrink-0 h-full overflow-y-auto pr-2 pb-20 custom-scrollbar">
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex flex-col items-center gap-2 p-12">
                        <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
                        <span className="text-xs text-muted-foreground">Carregando páginas...</span>
                    </div>
                }
                error={
                    <div className="text-xs text-destructive p-4 text-center">
                        Erro ao carregar miniaturas.
                    </div>
                }
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <div
                        key={`page_${index + 1}`}
                        onClick={() => onPageClick(index + 1)}
                        className={`mb-4 relative group cursor-pointer transition-all duration-200 rounded-md overflow-hidden ${activePage === index + 1
                            ? 'ring-2 ring-primary ring-offset-2'
                            : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-1 shadow-sm'
                            }`}
                    >
                        <Page
                            pageNumber={index + 1}
                            width={160}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="bg-white"
                        />
                        <div className="text-[10px] text-center mt-1 text-muted-foreground font-medium py-1 bg-muted/50">
                            Página {index + 1}
                        </div>
                    </div>
                ))}
            </Document>

            {/* If not a PDF or loading failed, but we want a nice skeleton for other types */}
            {!loading && numPages === 0 && (
                <div className="flex flex-col items-center gap-4 py-8">
                    <p className="text-[10px] text-muted-foreground text-center px-4 italic">
                        Miniaturas reais disponíveis apenas para PDF para este formato no momento.
                    </p>
                </div>
            )}
        </div>
    );
}
