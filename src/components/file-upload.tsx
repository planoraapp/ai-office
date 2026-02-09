import React, { useState, useCallback, useRef } from 'react';
import { Upload, File } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FileUploadProps {
    onFileSelect?: (file: File) => void;
    className?: string;
}

export function FileUpload({ onFileSelect, className }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            setSelectedFile(file);
            onFileSelect?.(file);
        }
    }, [onFileSelect]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedFile(file);
            onFileSelect?.(file);
        }
    }, [onFileSelect]);

    return (
        <div
            className={cn(
                "group relative rounded-xl border-2 border-dashed p-10 cursor-pointer duration-200 transition-colors",
                isDragging
                    ? "border-foreground bg-muted/20"
                    : "border-border hover:border-foreground/50 hover:bg-muted/10",
                className
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                type="file"
                accept=".pptx,.docx,.xlsx,.txt,.pdf"
                className="hidden"
                onChange={handleFileInput}
            />

            <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className={cn(
                    "flex items-center justify-center rounded-xl p-3 mb-6 transition-colors",
                    selectedFile ? "bg-foreground/10 text-foreground" : "bg-muted/30 text-foreground/80"
                )}>
                    {selectedFile ? <File className="h-8 w-8" /> : <Upload className="h-8 w-8" />}
                </div>

                {selectedFile ? (
                    <div className="space-y-1">
                        <p className="text-xl font-semibold text-foreground">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                ) : (
                    <>
                        <p className="text-xl font-semibold text-foreground inline-flex items-center gap-2">
                            Arraste sua apresentação aqui
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Máx 20 slides, 25MB. Mantemos seu conteúdo intacto.
                        </p>
                    </>
                )}
            </div>

            {!selectedFile && (
                <div className="flex flex-col items-center gap-3">
                    <button
                        className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-4 py-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            inputRef.current?.click();
                        }}
                    >
                        Carregar Arquivo
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer text-sm text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle "Don't have a deck" logic if needed
                        }}
                    >
                        Ainda não tenho um arquivo
                    </button>
                </div>
            )}
        </div>
    );
}
