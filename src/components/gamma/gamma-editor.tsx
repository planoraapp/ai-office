'use client';

import React, { useState } from 'react';
import { useDocument } from '@/contexts/document-context';
import { GammaCard } from './gamma-card';
import { Plus, LayoutTemplate, Sparkles, MoveVertical } from 'lucide-react';

import { FileType } from "@/components/processing-view";

interface GammaEditorProps {
    fileType?: FileType;
}

export function GammaEditor({ fileType = 'pptx' }: GammaEditorProps) {
    const { slides, activeSlideId, addElement, setSlides } = useDocument();

    const handleAddCard = (index: number) => {
        // Create new slide logic here
        // For now, we'll just duplicate or create empty
        const newSlide = {
            id: Date.now(),
            layout: 'content' as const,
            elements: [],
            label: `Novo Card`
        };
        const newSlides = [...slides];
        newSlides.splice(index + 1, 0, newSlide);
        setSlides(newSlides);
    };

    if (slides.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <LayoutTemplate className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Comece sua Narrativa</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                    Adicione o primeiro card para começar a construir sua apresentação modular.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => handleAddCard(-1)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Criar Primeiro Card
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-full shadow-sm hover:shadow hover:bg-muted transition-all font-medium text-foreground">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        Gerar com IA
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl min-h-screen pb-32 flex flex-col items-center relative gap-8">
            {/* Ambient Background Glow (optional) */}
            <div className="fixed inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-0" />

            {/* Cards Flow */}
            <div className="w-full z-10 flex flex-col gap-0 pb-32 items-center">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="relative group/card-wrapper flex flex-col items-center w-full">
                        <GammaCard
                            slide={slide}
                            index={index}
                            isActive={activeSlideId === slide.id}
                            layoutType={fileType === 'docx' ? 'page' : 'slide'}
                        />

                        {/* Divider / Add Button between cards (Modeled after reference) */}
                        <div className="h-12 w-full flex items-center justify-center opacity-0 group-hover/card-wrapper:opacity-100 hover:opacity-100 transition-opacity z-20 -mt-2 mb-2">
                            <div className="relative flex items-center gap-2">
                                {/* Line Left */}
                                <div className="w-32 h-[1px] bg-border/50" />

                                {/* Action Group */}
                                <div className="flex items-center gap-1 bg-white border shadow-sm rounded-full p-1 transform transition-transform hover:scale-105">
                                    <button
                                        onClick={() => handleAddCard(index)}
                                        className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                                        title="Inserir cartão"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                    <div className="w-[1px] h-4 bg-border/50 mx-0.5" />
                                    <button
                                        className="p-2 rounded-full hover:bg-purple-50 text-muted-foreground hover:text-purple-600 transition-colors"
                                        title="Inserir com IA"
                                        onClick={() => handleAddCard(index)} // Placeholder for AI
                                    >
                                        <Sparkles className="w-4 h-4" />
                                    </button>
                                    <div className="w-[1px] h-4 bg-border/50 mx-0.5" />
                                    <button
                                        className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                        title="Adicionar a partir de modelo"
                                    >
                                        <LayoutTemplate className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Line Right */}
                                <div className="w-32 h-[1px] bg-border/50" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Add Trigger */}
            <button
                onClick={() => handleAddCard(slides.length - 1)}
                className="w-full max-w-md h-32 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all gap-2 z-10 opacity-50 hover:opacity-100"
            >
                <Plus className="w-8 h-8 opacity-50" />
                <span className="font-medium">Adicionar Novo Card</span>
            </button>
        </div>
    );
}
