'use client';

import React from 'react';
import { SlideData, SlideElement } from '@/services/pptx-parser';
import { useDocument } from '@/contexts/document-context';
import { Plus, Sparkles } from 'lucide-react';

interface SemanticCardProps {
    slide: SlideData;
    index: number;
}

export function SemanticCard({ slide, index }: SemanticCardProps) {
    const { activeSlideId, setActiveSlideId, setSelectedElementId } = useDocument();
    const isActive = activeSlideId === slide.id;

    const renderElement = (el: SlideElement) => {
        if (el.type === 'image') {
            return (
                <img
                    key={el.id}
                    src={el.content}
                    alt="Card element"
                    className="max-w-full rounded-lg shadow-sm"
                />
            );
        }

        if (el.isHeading) {
            const Tag = el.level === 1 ? 'h1' : el.level === 2 ? 'h2' : 'h3';
            return (
                <Tag
                    key={el.id}
                    className="font-bold tracking-tight text-foreground mb-4"
                    style={{ fontSize: el.fontSize ? `${el.fontSize}px` : 'inherit' }}
                >
                    {el.content}
                </Tag>
            );
        }

        return (
            <p
                key={el.id}
                className="text-muted-foreground leading-relaxed mb-4"
                style={{
                    fontSize: el.fontSize ? `${el.fontSize}px` : 'inherit',
                    color: el.color || 'inherit',
                    textAlign: el.textAlign || 'left'
                }}
            >
                {el.content}
            </p>
        );
    };

    const renderLayout = () => {
        switch (slide.layout) {
            case 'title':
                return (
                    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                        {slide.elements.map(renderElement)}
                    </div>
                );
            case 'split':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
                        <div className="space-y-4">
                            {slide.elements.slice(0, Math.ceil(slide.elements.length / 2)).map(renderElement)}
                        </div>
                        <div className="space-y-4">
                            {slide.elements.slice(Math.ceil(slide.elements.length / 2)).map(renderElement)}
                        </div>
                    </div>
                );
            case 'agenda':
                return (
                    <div className="p-12">
                        <div className="space-y-6">
                            {slide.elements.map((el, i) => (
                                <div key={el.id} className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <div className="pt-1">
                                        {renderElement(el)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="p-8">
                        {slide.elements.map(renderElement)}
                    </div>
                );
        }
    };

    return (
        <div className="relative group/card-container w-full max-w-4xl mx-auto mb-8">
            {/* Card Divider (Insert before) */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/card-container:opacity-100 transition-all duration-200 z-30 scale-90 hover:scale-100">
                <button className="flex items-center gap-2 px-3 py-1 bg-white border border-primary/20 text-primary rounded-full shadow-lg text-[10px] font-bold hover:bg-primary hover:text-white transition-all">
                    <Plus className="w-3 h-3" />
                    Inserir Cartão
                </button>
            </div>

            <div
                id={`slide-${slide.id}`}
                className={`w-full rounded-2xl transition-all duration-500 border-2 cursor-pointer
                    ${isActive ? 'border-primary ring-8 ring-primary/5 shadow-2xl scale-[1.01]' : 'border-transparent hover:border-muted-foreground/10 hover:shadow-xl'}
                    bg-white overflow-hidden relative`}
                onClick={() => {
                    setActiveSlideId(slide.id);
                    setSelectedElementId(null);
                }}
            >
                {/* Status Bar / Label */}
                {slide.label && (
                    <div className="absolute top-6 left-8 z-20">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full backdrop-blur-md border border-primary/20 animate-in fade-in slide-in-from-left-4 duration-500">
                            <Sparkles className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{slide.label}</span>
                        </div>
                    </div>
                )}

                <div className="relative group">
                    {/* Visual Accent */}
                    <div
                        className="absolute top-0 left-0 w-1.5 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: slide.accentColor || 'var(--primary)' }}
                    />

                    {/* Background (if any) */}
                    {slide.backgroundUrl && (
                        <div
                            className="absolute inset-0 opacity-5 pointer-events-none bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.backgroundUrl})` }}
                        />
                    )}

                    <div className={`relative z-10 ${slide.label ? 'pt-16' : ''}`}>
                        {renderLayout()}
                    </div>

                    {/* Card Controls (visible on hover) */}
                    <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2 translate-y-2 group-hover:translate-y-0">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/80 backdrop-blur-md rounded-lg hover:bg-muted text-[10px] font-bold shadow-sm transition-all border border-border/50">
                            Layout
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-[10px] font-bold shadow-lg transition-all border border-primary/20">
                            <Sparkles className="w-3 h-3" />
                            IA
                        </button>
                    </div>
                </div>

                <div className="px-8 py-4 bg-muted/20 border-t border-border/50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-foreground/5 text-[10px] font-bold text-muted-foreground">
                            {index + 1}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">
                            {slide.layout}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">Salvo</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
