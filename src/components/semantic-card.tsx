'use client';

import React from 'react';
import { SlideData, SlideElement } from '@/services/pptx-parser';
import { useDocument } from '@/contexts/document-context';

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
        <div
            id={`slide-${slide.id}`}
            className={`w-full max-w-4xl mx-auto mb-12 rounded-2xl transition-all duration-300 border-2 cursor-pointer
                ${isActive ? 'border-primary ring-4 ring-primary/10' : 'border-transparent hover:border-muted-foreground/20'}
                bg-white shadow-xl overflow-hidden`}
            onClick={() => {
                setActiveSlideId(slide.id);
                setSelectedElementId(null);
            }}
        >
            <div className="relative group">
                {/* Visual Accent */}
                <div
                    className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: slide.accentColor }}
                />

                {/* Background (if any) */}
                {slide.backgroundUrl && (
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.backgroundUrl})` }}
                    />
                )}

                <div className="relative z-10">
                    {renderLayout()}
                </div>

                {/* Card Controls (visible on hover) */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button className="p-2 bg-muted rounded-md hover:bg-muted/80 text-xs font-medium shadow-sm">
                        Editar Layout
                    </button>
                    <button className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-xs font-medium shadow-sm">
                        IA ✨
                    </button>
                </div>
            </div>

            <div className="px-6 py-3 bg-muted/30 border-t border-border flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                <span>Cartão {index + 1}</span>
                <span>{slide.layout}</span>
            </div>
        </div>
    );
}
