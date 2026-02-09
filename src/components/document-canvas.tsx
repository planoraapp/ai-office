'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SlideData, SlideElement } from '@/services/pptx-parser';
import { useDocument } from '@/contexts/document-context';

interface DocumentCanvasProps {
    slide: SlideData;
}

export function DocumentCanvas({ slide }: DocumentCanvasProps) {
    const { updateElement, selectedElementId, setSelectedElementId } = useDocument();

    return (
        <div
            className="w-full h-full bg-white relative shadow-2xl overflow-hidden select-none origin-center transition-transform duration-300"
            onClick={() => setSelectedElementId(null)}
        >
            {/* Slide Background/Canvas Area */}
            <div className="absolute inset-0 bg-white" />

            {/* Elements Layer */}
            {slide.elements.map((el) => (
                <EditableElement
                    key={el.id}
                    element={el}
                    isSelected={selectedElementId === el.id}
                    onSelect={() => setSelectedElementId(el.id)}
                    onChange={(content) => updateElement(slide.id, el.id, { content })}
                />
            ))}
        </div>
    );
}

interface EditableElementProps {
    element: SlideElement;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (content: string) => void;
}

function EditableElement({ element, isSelected, onSelect, onChange }: EditableElementProps) {
    const textRef = useRef<HTMLDivElement>(null);

    // Sync content if it changes from outside
    useEffect(() => {
        if (element.type === 'text' && textRef.current && textRef.current.innerText !== element.content) {
            textRef.current.innerText = element.content;
        }
    }, [element.content, element.type]);

    return (
        <div
            className={`absolute transition-shadow duration-200 ${isSelected ? 'ring-2 ring-primary ring-offset-1 z-20 shadow-lg' : 'hover:ring-1 hover:ring-primary/30 z-10'
                }`}
            style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.width}%`,
                height: `${element.height}%`,
                minHeight: element.type === 'text' ? `${element.height}%` : undefined,
                cursor: isSelected ? 'move' : 'pointer'
            }}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
        >
            {element.type === 'text' ? (
                <div
                    ref={textRef}
                    contentEditable={isSelected}
                    suppressContentEditableWarning
                    onBlur={(e) => onChange(e.currentTarget.innerText)}
                    className="w-full h-full outline-none break-words whitespace-pre-wrap p-1"
                    style={{
                        fontSize: `${element.fontSize || 24}px`,
                        color: element.color || 'inherit',
                        textAlign: element.textAlign || 'left'
                    }}
                />
            ) : (
                <img
                    src={element.content}
                    alt="Slide Element"
                    className="w-full h-full object-contain pointer-events-none"
                    draggable={false}
                />
            )}
        </div>
    );
}
