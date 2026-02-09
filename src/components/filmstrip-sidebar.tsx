'use client';

import React from 'react';
import { useDocument } from '@/contexts/document-context';
import { Plus, Sparkles, Layout, List } from 'lucide-react';

export function FilmstripSidebar() {
    const { slides, activeSlideId, setActiveSlideId } = useDocument();

    const scrollToSlide = (id: number) => {
        setActiveSlideId(id);
        const element = document.getElementById(`slide-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="w-16 sm:w-20 shrink-0 h-full border-r border-border bg-card flex flex-col items-center py-6 gap-6 z-20">
            {/* View Toggle (Mock) */}
            <div className="flex flex-col bg-muted/50 rounded-lg p-1 gap-1">
                <button className="p-2 bg-white rounded-md shadow-sm text-primary">
                    <Layout className="w-4 h-4" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground">
                    <List className="w-4 h-4" />
                </button>
            </div>

            <div className="h-[1px] w-8 bg-border/50" />

            {/* Filmstrip List */}
            <div className="flex-1 w-full overflow-y-auto custom-scrollbar flex flex-col items-center gap-4 px-2">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        onClick={() => scrollToSlide(slide.id)}
                        className="group relative flex flex-col items-center gap-1 cursor-pointer"
                    >
                        {/* Slide Index */}
                        <span className={`text-[10px] font-bold transition-colors ${activeSlideId === slide.id ? 'text-primary' : 'text-muted-foreground'}`}>
                            {index + 1}
                        </span>

                        {/* Thumbnail Preview */}
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 transition-all duration-300 flex items-center justify-center bg-white shadow-sm overflow-hidden
                            ${activeSlideId === slide.id ? 'border-primary ring-4 ring-primary/10 shadow-md scale-105' : 'border-transparent hover:border-muted-foreground/20 hover:scale-105'}
                        `}>
                            {slide.layout === 'title' ? (
                                <div className="w-full h-full flex flex-col items-center justify-center p-1 gap-0.5">
                                    <div className="w-6 h-1 bg-muted rounded-full" />
                                    <div className="w-4 h-0.5 bg-muted/50 rounded-full" />
                                </div>
                            ) : (
                                <div className="w-full h-full p-2 flex flex-col gap-1">
                                    <div className="w-full h-1.5 bg-muted rounded-sm" />
                                    <div className="w-full h-1 bg-muted/40 rounded-sm" />
                                    <div className="w-2/3 h-1 bg-muted/40 rounded-sm" />
                                </div>
                            )}

                            {/* Label Indicator (Corner) */}
                            {slide.label && (
                                <div className="absolute top-4 right-0 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-white" />
                            )}
                        </div>
                    </div>
                ))}

                {/* Add Card Button */}
                <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all group">
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
            </div>

            <div className="mt-auto">
                <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                    <Sparkles className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
