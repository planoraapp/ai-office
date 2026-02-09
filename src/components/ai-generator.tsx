'use client';

import React, { useState } from 'react';
import {
    Monitor,
    FileText,
    Share2,
    Layout,
    Sparkles,
    X,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    Languages,
    Type,
    FileSearch,
    Lock,
    Palette,
    Shuffle,
    Search
} from 'lucide-react';
import { useDocument } from '@/contexts/document-context';

type GeneratorStep = 'focus' | 'content' | 'intent' | 'config' | 'theme' | 'generating';
type DocumentFocus = 'presentation' | 'webpage' | 'document' | 'social';
type DocumentIntent = 'generate' | 'condense' | 'preserve';

interface Theme {
    id: string;
    name: string;
    primary: string;
    secondary: string;
    background: string;
    text: string;
}

const THEMES: Theme[] = [
    { id: 'pearl', name: 'Pearl', primary: '#171717', secondary: '#F5F5F5', background: '#FFFFFF', text: '#0A0A0A' },
    { id: 'vortex', name: 'Vortex', primary: '#F5F5F5', secondary: '#171717', background: '#0A0A0A', text: '#FAFAFA' },
    { id: 'clementa', name: 'Clementa', primary: '#EE6C4D', secondary: '#E0FBFC', background: '#FFFFFF', text: '#293241' },
    { id: 'stratos', name: 'Stratos', primary: '#3D5A80', secondary: '#98C1D9', background: '#293241', text: '#E0FBFC' },
    { id: 'nova', name: 'Nova', primary: '#6D597A', secondary: '#B56576', background: '#FFFFFF', text: '#355070' },
    { id: 'twilight', name: 'Twilight', primary: '#E56B6F', secondary: '#EAAC8B', background: '#355070', text: '#FAFAFA' },
];

export function AIDocumentGenerator({ onClose }: { onClose: () => void }) {
    const { setSlides, setContent } = useDocument();
    const [step, setStep] = useState<GeneratorStep>('focus');
    const [focus, setFocus] = useState<DocumentFocus>('presentation');
    const [prompt, setPrompt] = useState('');
    const [intent, setIntent] = useState<DocumentIntent>('generate');
    const [textAmount, setTextAmount] = useState<'concise' | 'detailed' | 'extensive'>('detailed');
    const [language, setLanguage] = useState('Português');
    const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);

    const handleNext = () => {
        if (step === 'focus') setStep('content');
        else if (step === 'content') setStep('intent');
        else if (step === 'intent') setStep('config');
        else if (step === 'config') setStep('theme');
        else if (step === 'theme') generateDocument();
    };

    const handleBack = () => {
        if (step === 'content') setStep('focus');
        else if (step === 'intent') setStep('content');
        else if (step === 'config') setStep('intent');
        else if (step === 'theme') setStep('config');
    };

    const generateDocument = () => {
        setStep('generating');
        // Simulate AI process
        setTimeout(() => {
            if (focus === 'presentation') {
                setSlides([
                    {
                        id: 1,
                        layout: 'title',
                        elements: [
                            { id: 't1', type: 'text', content: 'Visão Geral do Projeto', x: 50, y: 100, fontSize: 48, isHeading: true },
                            { id: 's1', type: 'text', content: 'Gerado a partir das suas notas', x: 50, y: 200, fontSize: 24 }
                        ]
                    },
                    {
                        id: 2,
                        layout: 'content',
                        elements: [
                            { id: 't2', type: 'text', content: 'Principais Tópicos', x: 50, y: 50, fontSize: 36, isHeading: true },
                            { id: 'c1', type: 'text', content: '• Inovação e Tecnologia\n• Mercado Emergente\n• Estratégia de Crescimento', x: 50, y: 150, fontSize: 24 }
                        ]
                    }
                ]);
            } else {
                setContent(`<h1>${prompt || 'Novo Documento'}</h1><p>Conteúdo gerado por IA com foco em ${focus}...</p>`);
            }
            onClose();
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Gerador de Documentos IA</h2>
                            <p className="text-xs text-muted-foreground">Crie conteúdo profissional em segundos</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-muted flex">
                    {['focus', 'content', 'intent', 'config', 'theme'].map((s, idx) => {
                        const steps: GeneratorStep[] = ['focus', 'content', 'intent', 'config', 'theme'];
                        const currentIdx = steps.indexOf(step);
                        const isCompleted = idx < currentIdx;
                        const isActive = idx === currentIdx;

                        return (
                            <div
                                key={s}
                                className={`flex-1 transition-all duration-500 ${isCompleted ? 'bg-primary' : isActive ? 'bg-primary/50' : 'bg-transparent'}`}
                            />
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {step === 'focus' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">O que você gostaria de criar?</h3>
                                <p className="text-muted-foreground text-sm">Selecione o formato ideal para o seu conteúdo</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { id: 'presentation', label: 'Apresentação', icon: Layout, desc: 'Slides visuais' },
                                    { id: 'document', label: 'Documento', icon: FileText, desc: 'Relatórios e notas' },
                                    { id: 'webpage', label: 'Página Web', icon: Monitor, desc: 'Landing pages' },
                                    { id: 'social', label: 'Social', icon: Share2, desc: 'Posts criativos' },
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setFocus(opt.id as DocumentFocus)}
                                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-4 group
                                            ${focus === opt.id ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted'}`}
                                    >
                                        <div className={`p-4 rounded-xl transition-colors ${focus === opt.id ? 'bg-primary text-primary-foreground' : 'bg-muted group-hover:bg-primary/10'}`}>
                                            <opt.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm mb-1">{opt.label}</p>
                                            <p className="text-[10px] text-muted-foreground leading-tight">{opt.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'content' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Cole suas anotações ou esboço</h3>
                                <p className="text-muted-foreground text-sm">Digite o conteúdo bruto ou tópicos que deseja transformar</p>
                            </div>
                            <div className="relative">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Digite ou cole seu conteúdo aqui..."
                                    className="w-full h-64 p-6 bg-muted/30 border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none resize-none transition-all"
                                />
                                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] text-muted-foreground bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border shadow-sm">
                                    <Sparkles className="w-3 h-3 text-primary" />
                                    <span>A IA cuidará da formatação e estrutura</span>
                                </div>
                            </div>
                            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-4 items-start">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-blue-900 mb-1">Dica Pro</p>
                                    <p className="text-[11px] text-blue-800 leading-relaxed">
                                        Use três traços <code className="bg-blue-200 px-1 rounded font-bold">---</code> para separar seções que você deseja em diferentes slides ou seções.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'intent' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">O que deseja fazer com este conteúdo?</h3>
                                <p className="text-muted-foreground text-sm">Defina como a IA deve processar suas notas</p>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { id: 'generate', label: 'Gerar a partir de notas', icon: Sparkles, desc: 'Expanda tópicos e crie uma narrativa completa.' },
                                    { id: 'condense', label: 'Resumir documento longo', icon: FileSearch, desc: 'Extraia os pontos chave de um texto extenso.' },
                                    { id: 'preserve', label: 'Preservar texto exato', icon: Lock, desc: 'Mantenha suas palavras exatamente como escritas.' },
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setIntent(opt.id as DocumentIntent)}
                                        className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left
                                            ${intent === opt.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                                    >
                                        <div className={`p-3 rounded-xl ${intent === opt.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                            <opt.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{opt.label}</p>
                                            <p className="text-xs text-muted-foreground">{opt.desc}</p>
                                        </div>
                                        {intent === opt.id && <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'config' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Refine sua criação</h3>
                                <p className="text-muted-foreground text-sm">Personalize os detalhes de saída da IA</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-sm font-bold ml-1">
                                        <Type className="w-4 h-4" />
                                        Quantidade de Texto
                                    </label>
                                    <div className="grid grid-cols-3 gap-2 bg-muted p-1 rounded-xl border border-border">
                                        {(['concise', 'detailed', 'extensive'] as const).map((v) => (
                                            <button
                                                key={v}
                                                onClick={() => setTextAmount(v)}
                                                className={`py-2 text-[10px] font-bold rounded-lg transition-all
                                                    ${textAmount === v ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                            >
                                                {v.charAt(0).toUpperCase() + v.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-sm font-bold ml-1">
                                        <Languages className="w-4 h-4" />
                                        Idioma de Saída
                                    </label>
                                    <button className="w-full flex items-center justify-between p-3 bg-muted border border-border rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
                                        <span>{language}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'theme' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Escolha uma estética</h3>
                                <p className="text-muted-foreground text-sm">Selecione o tema visual que melhor combina com seu conteúdo</p>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex bg-muted p-1 rounded-lg text-xs font-bold border border-border">
                                    <button className="px-3 py-1 bg-white shadow-sm rounded-md">Todos</button>
                                    <button className="px-3 py-1 text-muted-foreground">Escuros</button>
                                    <button className="px-3 py-1 text-muted-foreground">Leve</button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors">
                                        <Search className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors">
                                        <Shuffle className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {THEMES.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => setSelectedTheme(theme)}
                                        className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-all p-1
                                            ${selectedTheme.id === theme.id ? 'border-primary ring-4 ring-primary/10' : 'border-border hover:border-primary/50'}`}
                                    >
                                        <div
                                            className="w-full h-full rounded-lg overflow-hidden flex flex-col shadow-inner"
                                            style={{ backgroundColor: theme.background }}
                                        >
                                            <div className="h-1/3 p-2 flex gap-1">
                                                <div className="w-1/4 h-full rounded-sm" style={{ backgroundColor: theme.primary }} />
                                                <div className="flex-1 space-y-1">
                                                    <div className="w-3/4 h-1 rounded-full opactiy-20" style={{ backgroundColor: theme.text, opacity: 0.2 }} />
                                                    <div className="w-full h-1 rounded-full" style={{ backgroundColor: theme.text, opacity: 0.1 }} />
                                                </div>
                                            </div>
                                            <div className="flex-1 p-2 space-y-2">
                                                <div className="w-1/2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                                                <div className="space-y-1">
                                                    <div className="w-full h-0.5 rounded-full" style={{ backgroundColor: theme.text, opacity: 0.1 }} />
                                                    <div className="w-full h-0.5 rounded-full" style={{ backgroundColor: theme.text, opacity: 0.1 }} />
                                                    <div className="w-2/3 h-0.5 rounded-full" style={{ backgroundColor: theme.text, opacity: 0.1 }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm transition-all
                                            ${selectedTheme.id === theme.id ? 'bg-primary text-primary-foreground' : 'bg-white/80 backdrop-blur-sm text-foreground'}`}>
                                            {theme.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'generating' && (
                        <div className="h-full flex flex-col items-center justify-center space-y-8 py-20 animate-in fade-in zoom-in duration-500">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-bold">Gerando sua {focus === 'presentation' ? 'Apresentação' : 'Criação'}</h3>
                                <div className="flex flex-col gap-1 items-center">
                                    <p className="text-sm text-muted-foreground">Analisando contexto e aplicando tema {selectedTheme.name}...</p>
                                    <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mt-2">
                                        <div className="h-full bg-primary animate-[shimmer_2s_infinite]" style={{ width: '40%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {step !== 'generating' && (
                    <div className="p-6 border-t border-border flex items-center justify-between bg-muted/30">
                        {step !== 'focus' ? (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar
                            </button>
                        ) : <div />}

                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-8 py-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all font-bold group"
                        >
                            {step === 'theme' ? 'Gerar Conteúdo' : 'Continuar'}
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
