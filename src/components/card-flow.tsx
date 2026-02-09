'use client';

import React, { useRef, useEffect } from 'react';
import { useDocument } from '@/contexts/document-context';
import { SemanticCard } from './semantic-card';
import { EditorInput } from './editor-input';
import { Plus, Sparkles } from 'lucide-react';

export function CardFlow() {
    const { slides, activeSlideId } = useDocument();
    const flowRef = useRef<HTMLDivElement>(null);

    // Scroll to active card when it changes
    useEffect(() => {
        if (activeSlideId) {
            const element = document.getElementById(`slide-${activeSlideId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeSlideId]);

    return (
        <div
            ref={flowRef}
            className="w-full h-full overflow-y-auto custom-scrollbar bg-slate-50/50 pb-40 px-4 sm:px-8 pt-20"
        >
            {/* Top Agent Focused Input (Gamma-style) */}
            <div className="max-w-4xl mx-auto mb-16 relative z-20">
                <div className="bg-white rounded-2xl shadow-2xl border border-primary/20 p-6 transform hover:scale-[1.01] transition-all">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <h3 className="font-semibold text-sm">O que vamos criar hoje?</h3>
                    </div>
                    <EditorInput
                        value=""
                        onChange={() => { }}
                        onSubmit={() => { }}
                        placeholder="Ex: Adicione um slide sobre o mercado de IA no Brasil..."
                        isProcessing={false}
                    />
                </div>
            </div>

            {/* The Cards Grid/List */}
            <div className="flex flex-col gap-8">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="relative group/card">
                        {/* Connector or Gap Action */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity z-30">
                            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-border rounded-full shadow-lg text-xs font-medium hover:bg-muted transition-colors">
                                <Plus className="w-3.3 h-3.3" />
                                Adicionar Cartão
                            </button>
                        </div>

                        <SemanticCard slide={slide} index={index} />
                    </div>
                ))}

                {/* Empty State / End of Flow */}
                {slides.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-20 text-center opacity-40">
                        <Sparkles className="w-12 h-12 mb-4 text-primary" />
                        <p className="text-lg font-medium">Pronto para começar!</p>
                        <p className="text-sm">Use o comando acima para gerar seu primeiro cartão.</p>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            {slides.length > 0 && (
                <div className="max-w-4xl mx-auto mt-12 mb-20 flex justify-center">
                    <button className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full shadow-xl hover:bg-primary/90 transition-all font-bold group">
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        Novo Cartão
                    </button>
                </div>
            )}
        </div>
    );
}
