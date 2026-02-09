'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as docx from 'docx-preview';
import { Loader2 } from 'lucide-react';

interface DocxFaithfulViewerProps {
    fileUrl: string;
}

export function DocxFaithfulViewer({ fileUrl }: DocxFaithfulViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function renderDocx() {
            if (!containerRef.current || !fileUrl) return;

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(fileUrl);
                if (!response.ok) throw new Error('Falha ao carregar arquivo');

                const blob = await response.blob();

                // Clear container
                containerRef.current.innerHTML = '';

                await docx.renderAsync(blob, containerRef.current, undefined, {
                    className: "docx-faithful-render",
                    inWrapper: true,
                    ignoreWidth: false,
                    ignoreHeight: false,
                    debug: false
                });

                setLoading(false);
            } catch (err: any) {
                console.error("DocxPreview Error:", err);
                setError(err.message || 'Erro ao renderizar documento');
                setLoading(false);
            }
        }

        renderDocx();
    }, [fileUrl]);

    return (
        <div className="w-full h-full bg-[#f8f9fa] overflow-auto custom-scrollbar flex flex-col items-center p-8">
            {loading && (
                <div className="flex flex-col items-center justify-center p-12 bg-white shadow-xl rounded-lg w-[794px] min-h-[500px]">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Renderizando visualização fiel...</p>
                </div>
            )}

            {error && (
                <div className="p-8 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 max-w-md text-center">
                    <p className="font-semibold">Erro na visualização fiel</p>
                    <p className="text-sm opacity-80">{error}</p>
                </div>
            )}

            <div
                ref={containerRef}
                className={`docx-container bg-white shadow-2xl mb-12 ${loading ? 'hidden' : 'block'}`}
                style={{ width: '794px' }}
            />

            <style jsx global>{`
                .docx-faithful-render {
                    padding: 0 !important;
                    margin: 0 !important;
                    background: white !important;
                }
                .docx-wrapper {
                    padding: 0 !important;
                    background: transparent !important;
                }
                .docx-container section {
                    margin-bottom: 2rem !important;
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
                }
            `}</style>
        </div>
    );
}
