import React from 'react';
import {
    LayoutTemplate,
    Columns,
    List,
    Square,
    ArrowRight,
    CheckCircle2,
    Grid,
    AlignLeft
} from 'lucide-react';

export const LAYOUT_OPTIONS = [
    {
        id: '2-col',
        type: 'columns',
        label: '2 Colunas',
        icon: Columns,
        config: { columns: 2 },
        defaultItems: [{ content: 'Coluna 1' }, { content: 'Coluna 2' }]
    },
    {
        id: '3-col',
        type: 'columns',
        label: '3 Colunas',
        icon: Columns,
        config: { columns: 3 },
        defaultItems: [{ content: 'Col 1' }, { content: 'Col 2' }, { content: 'Col 3' }]
    },
    {
        id: 'boxes',
        type: 'boxes',
        label: 'Caixas de Destaque',
        icon: Grid,
        defaultItems: [
            { title: 'Ideia 1', content: 'Descrição da ideia...' },
            { title: 'Ideia 2', content: 'Descrição da ideia...' },
            { title: 'Ideia 3', content: 'Descrição da ideia...' }
        ]
    },
    {
        id: 'timeline',
        type: 'timeline',
        label: 'Linha do Tempo',
        icon: List,
        defaultItems: [
            { title: 'Fase 1', content: 'Início do projeto...' },
            { title: 'Fase 2', content: 'Desenvolvimento...' },
            { title: 'Fase 3', content: 'Lançamento...' }
        ]
    }
];

interface LayoutPickerProps {
    onSelect: (option: any) => void;
}

export function LayoutPicker({ onSelect }: LayoutPickerProps) {
    return (
        <div className="grid grid-cols-2 gap-2">
            {LAYOUT_OPTIONS.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => onSelect(opt)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-center group"
                >
                    <div className="p-2 bg-muted rounded-lg group-hover:bg-background transition-colors">
                        <opt.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs font-medium">{opt.label}</span>
                </button>
            ))}
        </div>
    );
}
