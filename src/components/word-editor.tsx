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

    return (
        <div className="w-full h-full bg-[#f8f9fa] overflow-y-auto custom-scrollbar p-12">
            <div className="flex flex-col items-center min-h-screen">
                <EditorContent editor={editor} />
            </div>
            {/* Toolbar is in the Property Panel or top toolbar */}
        </div>
    );
}
