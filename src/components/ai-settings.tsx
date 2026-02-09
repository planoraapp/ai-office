'use client';

import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Sparkles,
    AlignLeft,
    ArrowDownToLine,
    Lock,
    Image as ImageIcon,
    Table,
    Layout,
    Monitor,
    FileText,
    Share2,
    Languages,
    Palette,
    Search,
    Shuffle,
    Wand2,
    Check
} from 'lucide-react';

interface AISettingsProps {
    onClose?: () => void;
}

const THEMES = [
    { id: 'ash', name: 'Ash', preview: 'https://assets.api.gamma.app/themes/preview/v1/ash/null' },
    { id: 'gold-leaf', name: 'Gold Leaf', preview: 'https://assets.api.gamma.app/themes/preview/v1/gold-leaf/07897491194d75694b2f41c888098b6309edf58f' },
    { id: 'incandescent', name: 'Incandescent', preview: 'https://assets.api.gamma.app/themes/preview/v1/incandescent/null' },
    { id: 'flax', name: 'Flax', preview: 'https://assets.api.gamma.app/themes/preview/v1/flax/null' },
    { id: 'piano', name: 'Piano', preview: 'https://assets.api.gamma.app/themes/preview/v1/piano/null' },
    { id: 'mercury', name: 'Mercury', preview: 'https://assets.api.gamma.app/themes/preview/v1/mercury/484646fdb9e73a7feac301e318968a0305b68713' },
];

export function AISettings({ onClose }: AISettingsProps) {
    const [openSections, setOpenSections] = useState<string[]>(['content', 'visuals']);
    const [intent, setIntent] = useState<'generate' | 'condense' | 'preserve'>('generate');
    const [textAmount, setTextAmount] = useState<'min' | 'concise' | 'detailed' | 'extensive'>('detailed');
    const [format, setFormat] = useState<'presentation' | 'webpage' | 'document' | 'social'>('presentation');
    const [selectedTheme, setSelectedTheme] = useState('ash');

    const toggleSection = (id: string) => {
        setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    };

    const Section = ({ id, title, icon: Icon, children, subtitle }: any) => {
        const isOpen = openSections.includes(id);
        return (
            <div className="border-b border-border last:border-0">
                <button
                    onClick={() => toggleSection(id)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold">{title}</p>
                        {subtitle && !isOpen && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
                {isOpen && <div className="p-4 pt-0 space-y-4 animate-in slide-in-from-top-1 duration-200">{children}</div>}
            </div>
        );
    };

    return (
        <div className="w-full max-w-sm bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] pointer-events-auto ring-1 ring-white/10">
            <div className="p-5 border-b border-border/50 bg-muted/40 flex items-center justify-between">
                <h3 className="font-bold text-sm flex items-center gap-2">
                    Configurações
                    <div className="w-4 h-4 rounded-full border border-muted-foreground/30 flex items-center justify-center cursor-help">
                        <span className="text-[10px] text-muted-foreground">i</span>
                    </div>
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* CONTEÚDO DO TEXTO */}
                <Section
                    id="content"
                    title="Conteúdo do texto"
                    icon={AlignLeft}
                >
                    <div className="space-y-4">
                        <div className="flex bg-muted p-1 rounded-xl gap-1">
                            {(['generate', 'condense', 'preserve'] as const).map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => setIntent(opt)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold rounded-lg transition-all
                                        ${intent === opt ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    {opt === 'generate' && <Sparkles className="w-3 h-3" />}
                                    {opt === 'condense' && <ArrowDownToLine className="w-3 h-3" />}
                                    {opt === 'preserve' && <Lock className="w-3 h-3" />}
                                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground ml-1 uppercase tracking-wider">Quantidade de texto</label>
                            <div className="grid grid-cols-4 gap-1">
                                {(['min', 'concise', 'detailed', 'extensive'] as const).map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => setTextAmount(v)}
                                        className={`flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all
                                            ${textAmount === v ? 'border-primary bg-primary/5' : 'border-transparent bg-muted hover:bg-muted/80'}`}
                                    >
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4].map(dot => (
                                                <div
                                                    key={dot}
                                                    className={`w-1 h-3 rounded-full ${dot <= (v === 'min' ? 1 : v === 'concise' ? 2 : v === 'detailed' ? 3 : 4) ? 'bg-primary' : 'bg-muted-foreground/20'}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold">{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground ml-1 uppercase tracking-wider">Escrever para...</label>
                            <textarea
                                className="w-full p-3 bg-muted border border-border rounded-xl text-xs min-h-[60px] resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="Público alvo..."
                            />
                            <div className="flex flex-wrap gap-1">
                                {['Negócios', 'Estudantes', 'Criativos'].map(tag => (
                                    <span key={tag} className="px-2 py-0.5 bg-muted-foreground/10 rounded-full text-[9px] font-bold text-muted-foreground hover:bg-muted-foreground/20 cursor-pointer">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground ml-1 uppercase tracking-wider">Tom</label>
                            <textarea
                                className="w-full p-3 bg-muted border border-border rounded-xl text-xs min-h-[60px] resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="Tom de voz..."
                            />
                        </div>
                    </div>
                </Section>

                {/* VISUAIS */}
                <Section
                    id="visuals"
                    title="Visuais"
                    icon={ImageIcon}
                >
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tema</span>
                            <button className="text-[9px] font-bold text-primary flex items-center gap-1">
                                <Palette className="w-3 h-3" /> Ver mais
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {THEMES.map(theme => (
                                <button
                                    key={theme.id}
                                    onClick={() => setSelectedTheme(theme.id)}
                                    className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all
                                        ${selectedTheme === theme.id ? 'border-primary ring-4 ring-primary/10' : 'border-border hover:border-primary/50'}`}
                                >
                                    <img src={theme.preview} className="w-full h-full object-cover" alt={theme.name} />
                                    <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-1 flex items-center justify-between px-2">
                                        <span className="text-[9px] font-bold text-white">{theme.name}</span>
                                        {selectedTheme === theme.id && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* FORMATO */}
                <Section
                    id="format"
                    title="Formato"
                    icon={Layout}
                    subtitle="Documento · Padrão"
                >
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { id: 'presentation', icon: Layout, label: 'Slides' },
                            { id: 'webpage', icon: Monitor, label: 'Web' },
                            { id: 'document', icon: FileText, label: 'Doc' },
                            { id: 'social', icon: Share2, label: 'Social' },
                        ].map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setFormat(opt.id as any)}
                                className={`flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all
                                    ${format === opt.id ? 'border-primary bg-primary/5' : 'border-transparent bg-muted hover:bg-muted/80'}`}
                            >
                                <opt.icon className={`w-4 h-4 ${format === opt.id ? 'text-primary' : 'text-muted-foreground'}`} />
                                <span className="text-[9px] font-bold">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </Section>
            </div>

            <div className="p-4 border-t border-border bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                        <span className="text-[10px] font-bold text-muted-foreground">1076 / 50000</span>
                    </div>
                </div>
                <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-lg hover:shadow-primary/20 transition-all">
                    <Sparkles className="w-4 h-4" />
                    Aplicar Configurações
                </button>
            </div>
        </div>
    );
}
