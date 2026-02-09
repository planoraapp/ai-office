'use client';

import React, { useState } from 'react';
import {
    Sparkles,
    AlignLeft,
    Type,
    Palette,
    Layout,
    Share2,
    Monitor,
    FileText,
    ArrowDownToLine,
    Lock,
    Check,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

import { EditorInput } from './editor-input';
import { StyleService } from '@/services/style-service';

export interface AIPatternsPanelProps {
    prompt: string;
    setPrompt: (val: string) => void;
    onSubmit: () => void;
    isGenerating: boolean;
    selectedThemeId: string;
    onThemeChange: (id: string) => void;
    onLayoutSelect?: (layout: any) => void;
}

import { LayoutPicker } from './gamma/layout-picker';

export function AIPatternsPanel({
    prompt,
    setPrompt,
    onSubmit,
    isGenerating,
    selectedThemeId,
    onThemeChange,
    onLayoutSelect
}: AIPatternsPanelProps) {
    const [intent, setIntent] = useState<'generate' | 'condense' | 'preserve'>('generate');
    const [textAmount, setTextAmount] = useState<'min' | 'concise' | 'detailed' | 'extensive'>('detailed');
    const [format, setFormat] = useState<'presentation' | 'webpage' | 'document' | 'social'>('presentation');
    const [openSections, setOpenSections] = useState<string[]>(['content', 'visuals']);

    const themes = StyleService.getAllThemes();

    const toggleSection = (id: string) => {
        setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    };

    const Section = ({ id, title, icon: Icon, children }: any) => {
        const isOpen = openSections.includes(id);
        return (
            <div className="border-b border-border last:border-0">
                <button
                    onClick={() => toggleSection(id)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="flex-1 text-sm font-bold uppercase tracking-wider">{title}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
                {isOpen && <div className="p-4 pt-0 space-y-4 animate-in slide-in-from-top-1 duration-200">{children}</div>}
            </div>
        );
    };

    return (
        <div className="w-72 shrink-0 h-full border-r border-border bg-card flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30 shrink-0">
                <h3 className="text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Personalização Visual
                </h3>
                <p className="text-[10px] text-muted-foreground mt-1">Configure o estilo e tom do documento</p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <Section id="content" title="Conteúdo" icon={AlignLeft}>
                    <div className="space-y-4">
                        <div className="flex bg-muted p-1 rounded-xl gap-1">
                            {(['generate', 'condense', 'preserve'] as const).map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => setIntent(opt)}
                                    className={`flex-1 py-1.5 text-[9px] font-bold rounded-lg transition-all
                                        ${intent === opt ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'}`}
                                >
                                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase">Extensão</label>
                            <div className="grid grid-cols-4 gap-1">
                                {(['min', 'concise', 'detailed', 'extensive'] as const).map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => setTextAmount(v)}
                                        className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center
                                            ${textAmount === v ? 'border-primary bg-primary/5' : 'border-transparent bg-muted'}`}
                                    >
                                        <div className="flex gap-0.5 mb-1">
                                            {[1, 2, 3, 4].map(dot => (
                                                <div key={dot} className={`w-0.5 h-2 rounded-full ${dot <= (v === 'min' ? 1 : v === 'concise' ? 2 : v === 'detailed' ? 3 : 4) ? 'bg-primary' : 'bg-muted-foreground/20'}`} />
                                            ))}
                                        </div>
                                        <span className="text-[8px] font-bold uppercase">{v.substring(0, 3)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase">Público e Tom</label>
                            <textarea
                                className="w-full p-2 bg-muted border border-border rounded-lg text-[11px] min-h-[50px] resize-none outline-none focus:ring-1 focus:ring-primary/30"
                                placeholder="Descreva o público e tom..."
                            />
                        </div>
                    </div>
                </Section>

                <Section id="visuals" title="Temas Visuais" icon={Palette}>
                    <div className="space-y-3">
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => onThemeChange(theme.id)}
                                className={`w-full p-3 rounded-xl border-2 text-left transition-all group
                                    ${selectedThemeId === theme.id ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/30 hover:bg-muted/50'}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{theme.name}</span>
                                    <div className="flex gap-1">
                                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: theme.primaryColor }} />
                                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: theme.secondaryColor }} />
                                    </div>
                                </div>
                                <p className="text-[9px] text-muted-foreground leading-tight">{theme.description}</p>
                                {selectedThemeId === theme.id && (
                                    <div className="mt-2 flex items-center gap-1.5 text-[9px] font-bold text-primary animate-in fade-in slide-in-from-left-2">
                                        <Check className="w-3 h-3" />
                                        Ativo
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </Section>

                <Section id="format" title="Formato" icon={Layout}>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { id: 'presentation', icon: Layout, label: 'Slides' },
                            { id: 'webpage', icon: Monitor, label: 'Web' },
                            { id: 'document', icon: FileText, label: 'Doc' },
                            { id: 'social', icon: Share2, label: 'Social' },
                        ].map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setFormat(opt.id as any)}
                                className={`flex items-center gap-2 p-2 rounded-lg border transition-all
                                    ${format === opt.id ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-muted text-muted-foreground'}`}
                            >
                                <opt.icon className="w-3 h-3" />
                                <span className="text-[10px] font-bold">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </Section>

                <Section id="layouts" title="Smart Layouts" icon={Layout}>
                    {onLayoutSelect ? (
                        <LayoutPicker onSelect={onLayoutSelect} />
                    ) : (
                        <p className="text-xs text-muted-foreground">Selecione um card para adicionar layouts.</p>
                    )}
                </Section>
            </div>

            <div className="p-4 border-t border-border bg-white space-y-4 shrink-0 z-10">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Comandos e Ajustes</label>
                    <EditorInput
                        value={prompt}
                        onChange={setPrompt}
                        onSubmit={onSubmit}
                        isProcessing={isGenerating}
                        placeholder="Descreva as alterações..."
                    />
                </div>

                <button
                    onClick={onSubmit}
                    disabled={isGenerating}
                    className="w-full py-2 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-sm hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                    <Sparkles className="w-3 h-3" />
                    Aplicar Padrão
                </button>
            </div>
        </div >
    );
}
