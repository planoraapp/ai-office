import React from 'react';
import { SlideElement } from '@/services/pptx-parser';
import { Columns, ArrowRight, CheckCircle2, Circle } from 'lucide-react';

interface SmartLayoutRendererProps {
    element: SlideElement;
    onUpdate: (updates: Partial<SlideElement>) => void;
}

export function SmartLayoutRenderer({ element, onUpdate }: SmartLayoutRendererProps) {
    if (!element.layoutData) return <div>Invalid Layout Data</div>;

    const { type, items, config } = element.layoutData;

    const handleItemUpdate = (index: number, content: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], content };
        onUpdate({
            layoutData: {
                ...element.layoutData!,
                items: newItems
            }
        });
    };

    const renderEditableText = (content: string, index: number, className = "") => (
        <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleItemUpdate(index, e.currentTarget.innerText)}
            className={`outline-none empty:before:content-['...'] empty:before:text-muted-foreground/50 ${className}`}
        >
            {content}
        </div>
    );

    // --- Layout Implementations ---

    if (type === 'columns') {
        const cols = config?.columns || 2;
        return (
            <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {items.map((item, idx) => (
                    <div key={idx} className="p-4 border rounded-lg bg-muted/20">
                        {renderEditableText(item.content, idx)}
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'boxes') {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item, idx) => (
                    <div key={idx} className="p-6 bg-white border shadow-sm rounded-xl flex flex-col gap-2 items-center text-center">
                        {item.icon && <div className="text-4xl mb-2">{item.icon}</div>}
                        <h4 className="font-bold text-lg">{renderEditableText(item.title || "Título", idx, "font-bold")}</h4>
                        <div className="text-sm text-muted-foreground">
                            {renderEditableText(item.content, idx)}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'timeline') {
        return (
            <div className="relative border-l-2 border-primary/20 ml-4 pl-8 space-y-8 py-4">
                {items.map((item, idx) => (
                    <div key={idx} className="relative">
                        <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-sm flex items-center justify-center">
                            <span className="text-[10px] text-white font-bold">{idx + 1}</span>
                        </div>
                        <h4 className="font-bold text-lg">{renderEditableText(item.title || `Etapa ${idx + 1}`, idx, "font-bold")}</h4>
                        <div className="text-muted-foreground">
                            {renderEditableText(item.content, idx)}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="p-4 border border-dashed rounded-lg text-muted-foreground text-center">
            Unknown Layout Type: {type}
        </div>
    );
}
