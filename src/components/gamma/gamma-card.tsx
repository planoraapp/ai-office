'use client';

import React, { useRef, useState } from 'react';
import { SlideData, SlideElement } from '@/services/pptx-parser';
import { useDocument } from '@/contexts/document-context';
import { SmartLayoutRenderer } from './smart-layout-renderer';
import {
    Plus,
    Image as ImageIcon,
    Type,
    Trash2,
    GripVertical,
    Palette,
    Sparkles,
    ChevronDown,
    NotebookPen
} from 'lucide-react';

interface GammaCardProps {
    slide: SlideData;
    index: number;
    isActive: boolean;
    layoutType?: 'page' | 'slide';
}

export function GammaCard({ slide, index, isActive, layoutType = 'slide' }: GammaCardProps) {
    const { updateElement, addElement, removeElement, setActiveSlideId } = useDocument();
    const sortedElements = [...slide.elements].sort((a, b) => (a.y || 0) - (b.y || 0));
    const [showPalette, setShowPalette] = useState(false);

    // Default accent color for the card (simulated)
    const accentColor = slide.accentColor || '#ec4899'; // Default pinkish accent

    // Determine dimensions based on layout type
    const cardStyle = layoutType === 'page'
        ? "w-[794px] min-h-[1123px] aspect-[210/297]" // A4
        : "w-full max-w-5xl aspect-[16/9]"; // Slide

    return (
        <div className={`group flex items-start gap-4 transition-all duration-300 mb-8 relative justify-center ${isActive ? 'scale-[1.01]' : 'opacity-80 hover:opacity-100'}`}>

            {/* LEFT SIDEBAR CONTROLS (Drag Handle, Palette, AI Edit, Notes) */}
            <div className="w-12 pt-4 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -left-16 top-0">
                {/* Drag Handle */}
                <div
                    className="p-1.5 text-muted-foreground/50 hover:text-foreground cursor-grab active:cursor-grabbing mb-2"
                    draggable
                >
                    <GripVertical className="w-5 h-5" />
                </div>

                {/* Palette / Style Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); setShowPalette(!showPalette); }}
                    className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
                    title="Estilo do cartão"
                >
                    <div className="flex flex-col items-center gap-0.5">
                        <Palette className="w-4 h-4" />
                        <ChevronDown className="w-2 h-2 opacity-50" />
                    </div>
                </button>

                {/* AI Edit Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); /* Add AI Edit Logic */ }}
                    className="p-2 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors"
                    title="Editar com IA"
                >
                    <div className="flex flex-col items-center gap-0.5">
                        <Sparkles className="w-4 h-4" />
                        <ChevronDown className="w-2 h-2 opacity-50" />
                    </div>
                </button>

                <div className="h-4" /> {/* Spacer */}

                {/* Add Notes Button */}
                <button
                    className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Adicionar notas"
                >
                    <NotebookPen className="w-4 h-4" />
                </button>
            </div>

            <div
                className={`bg-white shadow-lg transition-all relative overflow-hidden flex flex-col ${cardStyle}`}
                onClick={() => setActiveSlideId(slide.id)}
            >



                {/* Main Content Area */}
                <div className="p-12 flex-1 flex flex-col gap-4">
                    {/* Render Title explicitly if exists, or use first text element as title */}
                    {sortedElements.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50 border-2 border-dashed border-border/50 rounded-lg">
                            <Type className="w-8 h-8 mx-auto mb-2" />
                            <p>Página Vazia</p>
                            <p className="text-xs">Comece digitando ou use / para comandos</p>
                        </div>
                    )}

                    {sortedElements.map((el) => (
                        <GammaBlock
                            key={el.id}
                            element={el}
                            onUpdate={(updates) => updateElement(slide.id, el.id, updates)}
                            onRemove={() => removeElement(slide.id, el.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface GammaBlockProps {
    element: SlideElement;
    onUpdate: (updates: Partial<SlideElement>) => void;
    onRemove: () => void;
}

function GammaBlock({ element, onUpdate, onRemove }: GammaBlockProps) {
    const textRef = useRef<HTMLDivElement>(null);

    // Determine basic block styling based on element type
    const isHeading = element.isHeading || (element.fontSize && element.fontSize > 20);

    if (element.type === 'smart-layout') {
        return (
            <div className="group/block relative w-full -mx-4 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                {/* Block Actions (Hover) */}
                <div className="absolute -left-2 top-1 opacity-0 group-hover/block:opacity-100 transition-opacity z-10">
                    <div className="flex bg-white shadow-sm border rounded-md p-0.5">
                        <button onClick={onRemove} className="p-1 hover:bg-red-50 text-muted-foreground hover:text-red-500 rounded">
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                </div>
                <SmartLayoutRenderer element={element} onUpdate={onUpdate} />
            </div>
        );
    }

    return (
        <div className="group/block relative w-full -mx-4 px-4 py-1 rounded-lg hover:bg-slate-50 transition-colors">
            {/* Block Actions (Hover) */}
            <div className="absolute -left-2 top-1 opacity-0 group-hover/block:opacity-100 transition-opacity z-10">
                <div className="flex bg-white shadow-sm border rounded-md p-0.5">
                    <button onClick={onRemove} className="p-1 hover:bg-red-50 text-muted-foreground hover:text-red-500 rounded">
                        <Trash2 className="w-3 h-3" />
                    </button>
                    <div className="w-[1px] bg-border mx-0.5" />
                    <button className="p-1 hover:bg-muted text-muted-foreground rounded cursor-grab">
                        <GripVertical className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {element.type === 'image' ? (
                <div className="relative w-full flex justify-center py-2">
                    <img
                        src={element.content}
                        alt="Block Content"
                        className="max-w-full h-auto rounded-lg shadow-sm object-contain max-h-[500px]"
                    />
                </div>
            ) : (
                <div
                    ref={textRef}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => onUpdate({ content: e.currentTarget.innerText })}
                    className={`outline-none empty:before:content-['Digite_algo...'] empty:before:text-muted-foreground/50 selection:bg-primary/20 bg-transparent`}
                    style={{
                        fontSize: isHeading ? '1.75rem' : '1rem',
                        fontWeight: isHeading ? 700 : 400,
                        lineHeight: isHeading ? 1.3 : 1.6,
                        color: element.color || 'inherit',
                        textAlign: element.textAlign || 'left',
                        marginBottom: isHeading ? '0.5rem' : '0'
                    }}
                >
                    {element.content}
                </div>
            )}
        </div>
    );
}
