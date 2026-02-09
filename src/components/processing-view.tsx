'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Sparkles, Brain, PenTool, LayoutTemplate, FileText, Table, FileSearch, Calculator } from 'lucide-react';

export type FileType = 'pptx' | 'xlsx' | 'docx' | 'pdf' | 'other';

interface ProcessingViewProps {
    onComplete?: () => void;
    fileType: FileType;
}

const STEPS_BY_TYPE = {
    pptx: [
        { id: 'upload', label: 'Lendo apresentação...', icon: FileText, duration: 1500 },
        { id: 'analyze', label: 'Analisando slides e layout...', icon: LayoutTemplate, duration: 2000 },
        { id: 'spelling', label: 'Verificando ortografia (PT-BR)...', icon: PenTool, duration: 1500 },
        { id: 'design', label: 'Aplicando regras de design...', icon: Brain, duration: 2000 },
        { id: 'finalize', label: 'Finalizando slides...', icon: Sparkles, duration: 1000 },
    ],
    xlsx: [
        { id: 'upload', label: 'Lendo planilha...', icon: Table, duration: 1500 },
        { id: 'clean', label: 'Limpando dados duplicados...', icon: Sparkles, duration: 2000 },
        { id: 'formulas', label: 'Verificando integridade das fórmulas...', icon: Calculator, duration: 1500 },
        { id: 'analyze', label: 'Gerando insights de dados...', icon: Brain, duration: 2000 },
        { id: 'finalize', label: 'Finalizando planilha...', icon: CheckCircle2, duration: 1000 },
    ],
    docx: [ // Also used for PDF
        { id: 'upload', label: 'Lendo documento...', icon: FileText, duration: 1500 },
        { id: 'ocr', label: 'Processando texto (OCR)...', icon: FileSearch, duration: 2000 },
        { id: 'risk', label: 'Analisando riscos contratuais...', icon: Brain, duration: 2000 },
        { id: 'compliance', label: 'Verificando conformidade legal...', icon: FileCheck, duration: 1500 },
        { id: 'finalize', label: 'Finalizando revisão...', icon: Sparkles, duration: 1000 },
    ],
    pdf: [
        { id: 'upload', label: 'Lendo documento PDF...', icon: FileText, duration: 1500 },
        { id: 'ocr', label: 'Extraindo dados (OCR)...', icon: FileSearch, duration: 2000 },
        { id: 'analyze', label: 'Classificando tipo de documento...', icon: Brain, duration: 1500 },
        { id: 'extract', label: 'Extraindo informações chave...', icon: Table, duration: 2000 },
        { id: 'finalize', label: 'Finalizando extração...', icon: Sparkles, duration: 1000 },
    ],
    other: [
        { id: 'upload', label: 'Lendo arquivo...', icon: FileText, duration: 1500 },
        { id: 'analyze', label: 'Analisando conteúdo...', icon: Brain, duration: 2000 },
        { id: 'process', label: 'Processando solicitações...', icon: Sparkles, duration: 2000 },
        { id: 'finalize', label: 'Finalizando...', icon: CheckCircle2, duration: 1000 },
    ]
};

// Helper for 'docx' fallback inside the component logic or passed mapped
import { FileCheck } from 'lucide-react';

export function ProcessingView({ onComplete, fileType }: ProcessingViewProps) {
    const [currentStep, setCurrentStep] = useState(0);

    // Fallback map
    const steps = STEPS_BY_TYPE[fileType as keyof typeof STEPS_BY_TYPE] || STEPS_BY_TYPE.other;

    useEffect(() => {
        if (currentStep >= steps.length) {
            setTimeout(() => onComplete?.(), 500);
            return;
        }

        const timer = setTimeout(() => {
            setCurrentStep(prev => prev + 1);
        }, steps[currentStep].duration);

        return () => clearTimeout(timer);
    }, [currentStep, onComplete, steps]);

    return (
        <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-card border border-border/50 shadow-xl">
            <div className="text-center mb-8">
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/5">
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_3s_linear_infinite]" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">OFFICE AI trabalhando</h2>
                <p className="text-muted-foreground mt-2">Aguarde enquanto processamos seu arquivo</p>
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div
                            key={step.id}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-primary/5 scale-102 border border-primary/10' : 'opacity-50'
                                } ${isCompleted ? 'opacity-100' : ''}`}
                        >
                            <div className={`shrink-0 transition-colors duration-300 ${isActive ? 'text-primary' : isCompleted ? 'text-green-500' : 'text-muted-foreground'
                                }`}>
                                {isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                ) : isActive ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                    }`}>
                                    {step.label}
                                </p>
                            </div>

                            {isActive && (
                                <Icon className="w-4 h-4 text-primary/50 animate-pulse" />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 pt-4 border-t border-border/50 flex justify-between text-xs text-muted-foreground">
                <span>Tempo estimado: ~{Math.ceil(steps.reduce((acc, s) => acc + s.duration, 0) / 1000)}s</span>
                <span>{Math.min(Math.round((currentStep / steps.length) * 100), 100)}% Concluído</span>
            </div>
        </div>
    );
}
