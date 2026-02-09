'use client';

import React from 'react';
import {
    Type,
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Italic,
    Underline,
    Heading1,
    Heading2,
    Trash2,
    Palette,
    TextCursorInput,
    Image as ImageIcon
} from 'lucide-react';
import { useDocument } from '@/contexts/document-context';

export function PropertyPanel() {
    const {
        slides,
        activeSlideId,
        selectedElementId,
        updateElement,
        removeElement,
        setSelectedElementId,
        content,
        editor
    } = useDocument();

    const activeSlide = slides.find(s => s.id === activeSlideId);
    const selectedElement = activeSlide?.elements.find(el => el.id === selectedElementId);

    // Determine if we are in "Word mode"
    const isWord = editor !== null;

    if (!selectedElement && !isWord) {
        return (
            <aside className="w-64 border-l border-border bg-card p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <TextCursorInput className="w-6 h-6 text-muted-foreground/50" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium">Nenhum elemento selecionado</p>
                    <p className="text-xs text-muted-foreground">Selecione um texto ou objeto no slide, ou edite o documento Word ao lado.</p>
                </div>
            </aside>
        );
    }

    const COLORS = [
        { name: 'Preto', value: '#000000' },
        { name: 'Cinza', value: '#4B5563' },
        { name: 'Azul', value: '#2563EB' },
        { name: 'Vermelho', value: '#DC2626' },
        { name: 'Verde', value: '#16A34A' },
        { name: 'Roxo', value: '#7C3AED' },
    ];

    return (
        <aside className="w-64 border-l border-border bg-card flex flex-col overflow-y-auto">
            <div className="h-16 flex items-center px-4 border-b border-border shrink-0">
                <h3 className="font-semibold text-sm">Propriedades</h3>
            </div>

            <div className="p-4 space-y-6">
                {isWord && !selectedElement ? (
                    /* WORD FORMATTING TOOLS */
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rich Text (Word)</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={`p-2 border border-border rounded hover:bg-muted ${editor.isActive('bold') ? 'bg-primary/10 border-primary' : ''}`}
                            >
                                <Bold className="w-4 h-4 mx-auto" />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={`p-2 border border-border rounded hover:bg-muted ${editor.isActive('italic') ? 'bg-primary/10 border-primary' : ''}`}
                            >
                                <Italic className="w-4 h-4 mx-auto" />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                className={`p-2 border border-border rounded hover:bg-muted ${editor.isActive('heading', { level: 1 }) ? 'bg-primary/10 border-primary' : ''}`}
                            >
                                <Heading1 className="w-4 h-4 mx-auto" />
                            </button>
                        </div>
                        <div className="pt-2 border-t border-border">
                            <span className="text-[10px] text-muted-foreground">Cor do Texto</span>
                            <div className="grid grid-cols-6 gap-1 mt-2">
                                {COLORS.map(c => (
                                    <button
                                        key={c.value}
                                        onClick={() => editor.chain().focus().setColor(c.value).run()}
                                        className="w-6 h-6 rounded-full border border-border"
                                        style={{ backgroundColor: c.value }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : selectedElement?.type === 'text' ? (
                    /* SLIDE TEXT TOOLS */
                    <>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Conteúdo</label>
                            <textarea
                                value={selectedElement.content}
                                onChange={(e) => updateElement(activeSlideId, selectedElement.id, { content: e.target.value })}
                                className="w-full bg-muted/50 border border-border rounded-md p-2 text-sm focus:outline-none min-h-[80px] resize-none"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estilo do Objeto</label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 space-y-1">
                                    <span className="text-[10px] text-muted-foreground text-xs">Tamanho</span>
                                    <input
                                        type="number"
                                        value={selectedElement.fontSize || 24}
                                        onChange={(e) => updateElement(activeSlideId, selectedElement.id, { fontSize: parseInt(e.target.value) })}
                                        className="w-full bg-muted/50 border border-border rounded-md px-2 py-1 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : selectedElement?.type === 'image' ? (
                    /* SLIDE IMAGE TOOLS */
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Preview da Imagem</label>
                        <div className="aspect-video w-full bg-muted rounded overflow-hidden border border-border flex items-center justify-center">
                            <img src={selectedElement.content} alt="Preview" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="pt-2 space-y-2">
                            <label className="text-[10px] text-muted-foreground">Dimensões do Slide</label>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-muted/50 p-2 rounded">
                                <div>W: {Math.round(selectedElement.width ?? 0)}%</div>
                                <div>H: {Math.round(selectedElement.height ?? 0)}%</div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Global Actions */}
                {selectedElement && (
                    <div className="mt-auto pt-4 border-t border-border">
                        <button
                            onClick={() => {
                                removeElement(activeSlideId, selectedElement.id);
                                setSelectedElementId(null);
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Excluir do Slide
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}
