'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TextAlign } from '@tiptap/extension-text-align';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    AlignCenter,
    AlignLeft,
    AlignRight,
    Type,
    Heading1,
    Heading2,
    Heading3,
    Highlighter
} from 'lucide-react';
import { useDocument } from '@/contexts/document-context';

export function WordEditor() {
    const { content, setContent, setEditor } = useDocument();

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg shadow-sm my-4 mx-auto block',
                },
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse table-fixed w-full my-4 border border-gray-300',
                },
            }),
            TableRow,
            TableCell.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 p-2 min-w-[50px]',
                },
            }),
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 p-2 bg-gray-50 font-bold',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[1123px] bg-white p-[80px] shadow-2xl border border-border transition-all ring-1 ring-black/5 font-serif',
                style: 'width: 794px; background-image: linear-gradient(white, white); margin-bottom: 40px; font-family: "Inter", "Calibri", "Arial", serif;',
            },
        },
    });

    // Register editor globally
    useEffect(() => {
        if (editor) {
            setEditor(editor);
            return () => setEditor(null);
        }
    }, [editor, setEditor]);

    // Update editor content if it changes from outside (e.g. initial load)
    useEffect(() => {
        if (editor && content !== editor.getHTML() && content !== "") {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    const ToolbarButton = ({ onClick, isActive, icon: Icon, title }: any) => (
        <button
            onClick={onClick}
            title={title}
            className={`p-2 rounded-lg transition-all ${isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
        >
            <Icon className="w-4 h-4" />
        </button>
    );

    return (
        <div className="w-full h-full bg-[#f8f9fa] overflow-y-auto custom-scrollbar flex flex-col items-center">
            {/* STICKY TOOLBAR */}
            <div className="sticky top-0 z-50 w-full max-w-[816px] bg-white/80 backdrop-blur-md border border-border rounded-b-xl shadow-lg p-2 flex items-center gap-1 mb-8 mt-4 ring-1 ring-black/5">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    icon={Bold}
                    title="Negrito"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    icon={Italic}
                    title="Itálico"
                />
                <div className="w-[1px] h-4 bg-border mx-1" />
                <ToolbarButton
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    isActive={editor.isActive('paragraph')}
                    icon={Type}
                    title="Parágrafo"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                    icon={Heading1}
                    title="Título 1"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    icon={Heading2}
                    title="Título 2"
                />
                <div className="w-[1px] h-4 bg-border mx-1" />
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    icon={AlignLeft}
                    title="Alinhar Esquerda"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    icon={AlignCenter}
                    title="Centralizar"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    icon={AlignRight}
                    title="Alinhar Direita"
                />
                <div className="w-[1px] h-4 bg-border mx-1" />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    icon={List}
                    title="Lista"
                />
                <div className="ml-auto flex gap-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        icon={Undo}
                        title="Desfazer"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        icon={Redo}
                        title="Refazer"
                    />
                </div>
            </div>

            <div className="w-full max-w-[816px] bg-white shadow-2xl ring-1 ring-black/5 mb-32 min-h-[1056px] relative p-0">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
