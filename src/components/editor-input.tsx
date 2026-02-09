import React from 'react';
import { FileText, Palette, Image as ImageIcon, Paperclip, ArrowUp } from 'lucide-react';

interface EditorInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    placeholder?: string;
    isProcessing?: boolean;
}

export function EditorInput({ value, onChange, onSubmit, placeholder = "Descreva as alterações...", isProcessing = false }: EditorInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="w-full">
            <div className="bg-background rounded-xl border border-foreground/10 shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:bg-muted/20 flex flex-col group focus-within:ring-1 focus-within:ring-primary/20">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="min-h-[60px] max-h-[200px] w-full bg-transparent px-4 py-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none border-0"
                    rows={1}
                />

                <div className="flex justify-between items-center px-2 pb-2 gap-1">
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
                        <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-background/50 border border-foreground/10 text-muted-foreground text-[9px] hover:bg-background/80 transition-colors cursor-pointer select-none whitespace-nowrap">
                            <FileText className="w-2.5 h-2.5" />
                            <span>texto</span>
                        </div>
                        <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-background/50 border border-foreground/10 text-muted-foreground text-[9px] hover:bg-background/80 transition-colors cursor-pointer select-none whitespace-nowrap">
                            <Palette className="w-2.5 h-2.5" />
                            <span>estilo</span>
                        </div>
                        <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-background/50 border border-foreground/10 text-muted-foreground text-[9px] hover:bg-background/80 transition-colors cursor-pointer select-none whitespace-nowrap">
                            <ImageIcon className="w-2.5 h-2.5" />
                            <span>imagens</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <button className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-foreground/5 transition-colors">
                            <Paperclip className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={onSubmit}
                            disabled={!value.trim() || isProcessing}
                            className="w-7 h-7 rounded-full flex items-center justify-center bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <div className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : (
                                <ArrowUp className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
