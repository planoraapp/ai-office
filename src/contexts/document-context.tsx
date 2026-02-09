'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { SlideData, SlideElement } from '@/services/pptx-parser';

interface DocumentContextType {
    slides: SlideData[];
    activeSlideId: number;
    selectedElementId: string | null;
    content: string; // Used for Word/Excel/JSON state
    editor: any | null; // TipTap editor instance
    viewStyle: 'canvas' | 'flow'; // Added for Gamma-like flow
    setSlides: (slides: SlideData[]) => void;
    setActiveSlideId: (id: number) => void;
    setSelectedElementId: (id: string | null) => void;
    setContent: (content: string) => void;
    setEditor: (editor: any | null) => void;
    setViewStyle: (style: 'canvas' | 'flow') => void;
    updateElement: (slideId: number, elementId: string, updates: Partial<SlideElement>) => void;
    addElement: (slideId: number, element: SlideElement) => void;
    removeElement: (slideId: number, elementId: string) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
    const [slides, setSlides] = useState<SlideData[]>([]);
    const [activeSlideId, setActiveSlideId] = useState(1);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [content, setContent] = useState('');
    const [editor, setEditor] = useState<any | null>(null);
    const [viewStyle, setViewStyle] = useState<'canvas' | 'flow'>('flow');

    const updateElement = useCallback((slideId: number, elementId: string, updates: Partial<SlideElement>) => {
        setSlides(prev => prev.map(slide => {
            if (slide.id !== slideId) return slide;
            return {
                ...slide,
                elements: slide.elements.map(el =>
                    el.id === elementId ? { ...el, ...updates } : el
                )
            };
        }));
    }, []);

    const addElement = useCallback((slideId: number, element: SlideElement) => {
        setSlides(prev => prev.map(slide => {
            if (slide.id !== slideId) return slide;
            return {
                ...slide,
                elements: [...slide.elements, element]
            };
        }));
    }, []);

    const removeElement = useCallback((slideId: number, elementId: string) => {
        setSlides(prev => prev.map(slide => {
            if (slide.id !== slideId) return slide;
            return {
                ...slide,
                elements: slide.elements.filter(el => el.id !== elementId)
            };
        }));
    }, []);

    return (
        <DocumentContext.Provider value={{
            slides,
            activeSlideId,
            selectedElementId,
            content,
            editor,
            viewStyle,
            setSlides,
            setActiveSlideId,
            setSelectedElementId,
            setContent,
            setEditor,
            setViewStyle,
            updateElement,
            addElement,
            removeElement
        }}>
            {children}
        </DocumentContext.Provider>
    );
}

export function useDocument() {
    const context = useContext(DocumentContext);
    if (context === undefined) {
        throw new Error('useDocument must be used within a DocumentProvider');
    }
    return context;
}
