'use client';

import React from 'react';
import { LayoutTemplate, FileText, PieChart, Loader2 } from 'lucide-react';
import * as docx from 'docx-preview';

import { SlideData, SlideElement } from '@/services/pptx-parser';

interface DocumentSidebarProps {
    fileUrl: string;
    fileType: 'pptx' | 'docx' | 'xlsx' | 'pdf';
    activePage: number;
    onPageClick: (page: number) => void;
    slides?: SlideData[];
}

export function DocumentSidebar({ fileUrl, fileType, activePage, onPageClick, slides = [] }: DocumentSidebarProps) {
    // If we have native slides data (e.g. from PPTX parser), use it
    const hasNativeSlides = slides.length > 0;
    const pageCount = hasNativeSlides ? slides.length : 6;

    const renderThumbnail = (index: number) => {
        const isSelected = activePage === index + 1;

        if (hasNativeSlides && slides[index]) {
            // Render a mini version of the native slide
            return (
                <div className="w-full h-full bg-white relative scale-[0.2] origin-top-left w-[500%] h-[500%]">
                    {slides[index].elements.map((el) => (
                        <div
                            key={el.id}
                            className="absolute bg-transparent overflow-hidden"
                            style={{
                                left: `${el.x}%`,
                                top: `${el.y}%`,
                                width: `${el.width}%`,
                                height: `${el.height}%`,
                                fontSize: `${(el.fontSize || 24) * 0.8}px`,
                                color: el.color || 'inherit',
                                textAlign: el.textAlign || 'left'
                            }}
                        >
                            {el.content}
                        </div>
                    ))}
                </div>
            );
        }

        if (fileType === 'pptx') {
            return (
                <div className="w-full h-full bg-orange-50/20 flex flex-col items-center justify-center p-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-orange-100/30 rounded-bl-xl border-b border-l border-orange-200" />
                    <LayoutTemplate className="w-8 h-8 text-orange-500 mb-2 opacity-60" />
                    <div className="w-full h-1 bg-orange-200/30 rounded-full mb-1" />
                    <div className="w-2/3 h-1 bg-orange-200/30 rounded-full" />
                </div>
            );
        }

        if (fileType === 'docx') {
            // For DOCX, since they are long documents, a generic page skeleton is better than a broken iframe
            return (
                <div className="flex flex-col items-center justify-center p-4 h-full bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-blue-50/50 rounded-bl-xl border-b border-l border-blue-100" />
                    <div className="w-3/4 h-2 bg-blue-100/50 rounded-full mb-3 self-start" />
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mb-1.5" />
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mb-1.5" />
                    <div className="w-5/6 h-1.5 bg-gray-100 rounded-full mb-4" />

                    <div className="w-full h-1.5 bg-gray-50 rounded-full mb-1.5 opacity-60" />
                    <div className="w-full h-1.5 bg-gray-50 rounded-full mb-1.5 opacity-60" />
                    <div className="w-3/4 h-1.5 bg-gray-50 rounded-full mb-4 opacity-60" />

                    <FileText className="w-6 h-6 text-blue-500/20 absolute bottom-4 right-4" />
                </div>
            );
        }

        // Fallback/Skeleton for others
        return (
            <div className="flex flex-col items-center justify-center p-4 h-full bg-white">
                <div className="w-3/4 h-1.5 bg-muted rounded mb-1.5 opacity-40" />
                <div className="w-full h-1.5 bg-muted rounded mb-1 opacity-20" />
                <div className="w-full h-1.5 bg-muted rounded mb-1 opacity-20" />
                <div className="w-5/6 h-1.5 bg-muted rounded mb-3 opacity-20" />
                <div className="w-full grow bg-muted/5 rounded-sm" />
            </div>
        );
    };

    const renderThumbnailWrapper = (index: number) => {
        const isPresentation = fileType === 'pptx';
        const isSelected = activePage === index + 1;

        return (
            <div
                key={`thumb_${index}`}
                className={`relative group cursor-pointer transition-all duration-200 rounded-md overflow-hidden bg-white border ${isSelected
                    ? 'ring-2 ring-primary ring-offset-2 border-primary'
                    : 'hover:border-primary/50 border-border shadow-sm'
                    }`}
                onClick={() => onPageClick(index + 1)}
            >
                <div className={`${isPresentation ? 'aspect-[16/9]' : 'aspect-[3/4]'} overflow-hidden bg-white border-b border-border`}>
                    {renderThumbnail(index)}
                </div>
                <div className="text-[10px] text-center text-muted-foreground font-medium py-1 bg-muted/30">
                    {isPresentation ? 'Slide' : 'Página'} {index + 1}
                </div>
            </div>
        );
    };

    return (
        <div className="hidden lg:flex flex-col gap-4 w-48 shrink-0 h-full overflow-y-auto pr-2 pb-24 custom-scrollbar">
            {Array.from({ length: pageCount }).map((_, i) => (
                <React.Fragment key={`thumb_frag_${i}`}>
                    {renderThumbnailWrapper(i)}
                </React.Fragment>
            ))}

            {fileType !== 'pdf' && (
                <div className="px-2 py-4 text-center">
                    <p className="text-[9px] text-muted-foreground italic opacity-60">
                        Mostrando as primeiras {pageCount} páginas.
                    </p>
                </div>
            )}
        </div>
    );
}
