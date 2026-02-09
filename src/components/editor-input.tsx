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
        <div className="w-full max-w-3xl mx-auto p-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="bg-foreground/5 backdrop-blur-xl rounded-xl border border-foreground/10 shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:bg-foreground/10 flex flex-col group focus-within:ring-1 focus-within:ring-primary/20">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="min-h-[60px] max-h-[200px] w-full bg-transparent px-4 py-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none border-0"
                    rows={1}
                />

                <div className="flex justify-between items-center px-3 pb-3 gap-2">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-background/50 border border-foreground/10 text-muted-foreground text-[10px] sm:text-xs hover:bg-background/80 transition-colors cursor-pointer select-none">
                            <FileText className="w-3 h-3" />
                            <span>texto</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-background/50 border border-foreground/10 text-muted-foreground text-[10px] sm:text-xs hover:bg-background/80 transition-colors cursor-pointer select-none">
                            <Palette className="w-3 h-3" />
                            <span>estilo</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-background/50 border border-foreground/10 text-muted-foreground text-[10px] sm:text-xs hover:bg-background/80 transition-colors cursor-pointer select-none">
                            <ImageIcon className="w-3 h-3" />
                            <span>imagens</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-foreground/5 transition-colors">
                            <Paperclip className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onSubmit}
                            disabled={!value.trim() || isProcessing}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : (
                                <ArrowUp className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
