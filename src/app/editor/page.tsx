'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Palette,
    Type,
    SpellCheck,
    FileCheck,
    DollarSign,
    Download,
    Settings,
    ChevronLeft,
    Table,
    Calculator,
    LayoutTemplate,
    FileText,
    Search,
    BookOpen,
    PieChart,
    Eraser,
    Upload,
    Plus,
    Loader2,
    Sparkles,
    Settings2,
    Wand2,
    Sparkles as SparklesIcon
} from 'lucide-react';

import { FileUpload } from '@/components/file-upload';
import { ProcessingView, FileType } from '@/components/processing-view';
import { EditorInput } from '@/components/editor-input';
import { DocumentCanvas } from '@/components/document-canvas';
import { WordEditor } from '@/components/word-editor';
import { DocxFaithfulViewer } from '@/components/docx-faithful-viewer';
import { AIDocumentGenerator } from '@/components/ai-generator';
import { AISettings } from '@/components/ai-settings';
import { useDocument } from '@/contexts/document-context';
import { useAuth } from '@/contexts/auth-context';
import { PptxParser } from '@/services/pptx-parser';
import { DocxService } from '@/services/docx-service';
import { AIPatternsPanel } from '@/components/ai-patterns-panel';
import { ExtractedContentPanel } from '@/components/extracted-content-panel';
import { ProjectsService } from '@/services/projects';
import { StorageService } from '@/services/storage';

type EditorState = 'upload' | 'processing' | 'editor';

// Define toolsets for each file type
const TOOL_SETS = {
    pptx: [
        { id: 'design', label: 'Design e Visual', icon: Palette },
        { id: 'branding', label: 'Identidade Visual', icon: LayoutTemplate },
        { id: 'text', label: 'Texto e Narrativa', icon: Type },
        { id: 'dataviz', label: 'Dados Visuais', icon: PieChart },
    ],
    xlsx: [
        { id: 'clean', label: 'Limpeza de Dados', icon: Eraser },
        { id: 'formulas', label: 'Correção de Fórmulas', icon: Calculator },
        { id: 'consolidation', label: 'Consolidação', icon: Table },
        { id: 'forecast', label: 'Previsão e Tendências', icon: PieChart },
    ],
    docx: [ // Also used for PDF
        { id: 'review', label: 'Revisão Contratual', icon: Search },
        { id: 'summary', label: 'Resumo Automático', icon: BookOpen },
        { id: 'compliance', label: 'Conformidade e LGPD', icon: FileCheck },
        { id: 'formatting', label: 'Padronização', icon: FileText },
    ],
    pdf: [
        { id: 'extract', label: 'Extração de Dados', icon: Table },
        { id: 'review', label: 'Auditoria Fiscal', icon: Search },
        { id: 'ocr', label: 'Reconhecimento de Texto', icon: Type },
    ]
};

export default function EditorPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [state, setState] = useState<EditorState>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'edit' | 'faithful'>('faithful');
    const [fileType, setFileType] = useState<FileType>('other');
    const [activeTool, setActiveTool] = useState('');
    const {
        slides,
        setSlides,
        activeSlideId,
        setActiveSlideId,
        setContent,
        content,
        viewStyle,
        setViewStyle
    } = useDocument();

    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showGenerator, setShowGenerator] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const searchParams = useSearchParams();
    const projectId = searchParams.get('project');

    // Initial Auth Check
    useEffect(() => {
        if (!user) {
            console.log("No user found in Editor, redirecting to login...");
            // router.push('/'); // Commented out to prevent flicker if auth is just loading
        }
    }, [user, router]);

    // Load Project from URL
    useEffect(() => {
        async function loadProject() {
            if (projectId && user) {
                try {
                    const project = await ProjectsService.getProject(projectId);
                    if (project) {
                        console.log("Project loaded:", project);
                        setFile({ name: project.title } as File); // Mock file object for title display
                        setFileType(project.type);
                        setUploadedUrl(project.fileUrl || null);

                        // Set active tool based on type
                        if (project.type === 'pptx') setActiveTool('design');
                        else if (project.type === 'xlsx') setActiveTool('clean');
                        else if (project.type === 'docx') setActiveTool('review');
                        else if (project.type === 'pdf') setActiveTool('extract');

                        // Initial Parse for Native Editor
                        if (project.type === 'pptx' && project.fileUrl) {
                            const parsedSlides = await PptxParser.parse(project.fileUrl);
                            setSlides(parsedSlides);
                        } else if (project.type === 'docx' && project.fileUrl) {
                            const htmlContent = await DocxService.convertToHtml(project.fileUrl);
                            setContent(htmlContent);
                        }

                        setState('editor');
                    }
                } catch (error) {
                    console.error("Failed to load project:", error);
                }
            }
        }
        loadProject();
    }, [projectId, user, setSlides, setContent]);

    if (!user) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Verificando autenticação...</p>
                </div>
            </div>
        );
    }

    // ... (inside the PPTX render block)



    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);

        // Determine file type
        const name = selectedFile.name.toLowerCase();
        let type: FileType = 'other';

        if (name.endsWith('.pptx')) type = 'pptx';
        else if (name.endsWith('.xlsx') || name.endsWith('.xls')) type = 'xlsx';
        else if (name.endsWith('.docx') || name.endsWith('.doc')) type = 'docx';
        else if (name.endsWith('.pdf')) type = 'pdf';

        setFileType(type);

        // Set default active tool
        if (type === 'pptx') setActiveTool('design');
        if (type === 'xlsx') setActiveTool('clean');
        if (type === 'docx') setActiveTool('review');
        if (type === 'pdf') setActiveTool('extract');

        setTimeout(() => setState('processing'), 500);
    };

    const goToProcessing = () => setState('processing');
    const handleProcessingComplete = async () => {
        console.log("Processing complete. User:", user?.uid, "File:", file?.name);
        if (user && file) {
            try {
                // 1. Upload file to Storage
                console.log("Starting upload...");
                const fileUrl = await StorageService.uploadFile(user.uid, file);
                console.log("Upload finished. URL:", fileUrl);
                setUploadedUrl(fileUrl);

                // 2. Create Project in Firestore with file URL
                await ProjectsService.createProject(user.uid, {
                    title: file.name,
                    type: (fileType === 'other' ? 'pdf' : fileType), // Default to pdf for unknown types for now
                    status: 'completed',
                    fileUrl: fileUrl
                });
                console.log("Project created in Firestore.");

                // 3. Initiate Native Parse
                if (fileType === 'pptx') {
                    const parsedSlides = await PptxParser.parse(file);
                    setSlides(parsedSlides);
                } else if (fileType === 'docx') {
                    const htmlContent = await DocxService.convertToHtml(file);
                    setContent(htmlContent);
                }
            } catch (error) {
                console.error("Error saving project:", error);
                // TODO: Show error toast
            }
        } else {
            console.warn("User or File missing in handleProcessingComplete");
        }
        setState('editor');
    };

    const goToEditor = () => setState('editor');

    const handlePromptSubmit = async () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);
        // Simulator AI processing delay
        setTimeout(() => {
            setIsGenerating(false);
            setPrompt('');
            alert("Comando enviado para a IA! (Simulação)");
        }, 1500);
    };

    // Get tools for current file type or fallback to a default set if 'other'
    const currentTools = TOOL_SETS[fileType as keyof typeof TOOL_SETS] || TOOL_SETS.pptx;

    return (
        <div className="h-screen bg-background flex overflow-hidden relative">
            {/* Sidebar */}
            <aside className="w-16 md:w-64 border-r border-border bg-card flex flex-col">
                <div className="h-16 flex items-center px-4 border-b border-border">
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                            AI
                        </div>
                        <span className="hidden md:inline">OFFICE AI</span>
                    </div>
                </div>

                <div className="px-4 py-3 space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {fileType === 'pptx' ? 'Apresentação' :
                            fileType === 'xlsx' ? 'Planilha' :
                                fileType === 'docx' ? 'Documento' :
                                    fileType === 'pdf' ? 'PDF' : 'Arquivo'}
                    </span>
                    <button
                        onClick={() => setShowGenerator(true)}
                        className="w-full flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-bold hover:bg-primary/20 transition-all"
                    >
                        <Sparkles className="w-4 h-4" />
                        Gerar novo com IA
                    </button>
                </div>

                <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                    {currentTools.map((tool) => {
                        const Icon = tool.icon;
                        const isActive = activeTool === tool.id;

                        return (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span className="hidden md:inline">{tool.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-2 border-t border-border mt-auto space-y-1">

                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                        <Settings className="w-5 h-5 shrink-0" />
                        <span className="hidden md:inline">Configurações</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-muted/20">
                {/* Toolbar */}
                <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setState('upload')}
                            className="p-2 hover:bg-muted rounded-full transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                        </button>
                        <div>
                            <h2 className="text-sm font-semibold">{file?.name || 'Documento'}</h2>
                            <p className="text-xs text-muted-foreground">Editado agora mesmo</p>
                        </div>
                    </div>

                    {/* VIEW TOGGLES & AI EDIT */}
                    <div className="flex items-center gap-2">
                        {state === 'editor' && (
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                    ${showSettings ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'}`}
                            >
                                <Settings2 className="w-4 h-4" />
                                {showSettings ? 'Fechar Ajustes' : 'Ajustes IA'}
                            </button>
                        )}

                        {fileType === 'docx' && state === 'editor' && (
                            <div className="flex bg-muted p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('faithful')}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${viewMode === 'faithful' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    Vista Original
                                </button>
                                <button
                                    onClick={() => setViewMode('edit')}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${viewMode === 'edit' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    Editar
                                </button>
                            </div>
                        )}

                        {state === 'editor' && fileType === 'pptx' && (
                            <div className="flex bg-muted p-1 rounded-lg border border-border mr-4">
                                <button
                                    onClick={() => setViewStyle('flow')}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${viewStyle === 'flow' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    Fluxo de Cards
                                </button>
                                <button
                                    onClick={() => setViewStyle('canvas')}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${viewStyle === 'canvas' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    Tela Inteira
                                </button>
                            </div>
                        )}
                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Visualizar
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                            <Download className="w-4 h-4" />
                            <span>Exportar</span>
                        </button>
                    </div>
                </header>

                {/* Editor Canvas */}
                {state === 'upload' && (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 gap-8">
                        <div className="text-center space-y-2 mb-4">
                            <h1 className="text-3xl font-bold tracking-tight">O que vamos criar hoje?</h1>
                            <p className="text-muted-foreground">Escolha uma opção para começar seu projeto</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                            <div className="bg-card border border-border rounded-3xl p-8 flex flex-col items-center text-center gap-6 shadow-sm hover:shadow-xl transition-all border-dashed border-2 hover:border-primary/50 group">
                                <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">Importar Arquivo</h3>
                                    <p className="text-sm text-muted-foreground">Carregue um PPTX, DOCX, XLSX ou PDF para análise e edição inteligente.</p>
                                </div>
                                <FileUpload onFileSelect={handleFileSelect} />
                            </div>

                            <button
                                onClick={() => setShowGenerator(true)}
                                className="bg-primary text-primary-foreground rounded-3xl p-8 flex flex-col items-center text-center gap-6 shadow-xl hover:bg-primary/95 transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform">
                                    <Sparkles className="w-32 h-32" />
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-white/20 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                                <div className="space-y-2 relative z-10">
                                    <h3 className="text-xl font-bold">Criar com Inteligência Artificial</h3>
                                    <p className="text-sm text-primary-foreground/80">Gere apresentações e documentos completos a partir de um prompt ou esboço.</p>
                                </div>
                                <div className="mt-auto px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold border border-white/20 transition-colors">
                                    Começar agora
                                </div>
                            </button>
                        </div>
                    </div>
                )}


                <div className={`flex-1 overflow-hidden flex items-stretch relative ${state === 'upload' ? 'hidden' : ''}`}>
                    {/* COLUMN 1: AI PATTERNS */}
                    {state === 'editor' && (
                        <AIPatternsPanel
                            prompt={prompt}
                            setPrompt={setPrompt}
                            onSubmit={handlePromptSubmit}
                            isGenerating={isGenerating}
                        />
                    )}

                    {/* COLUMN 2: EXTRACTED CONTENT */}
                    {state === 'editor' && (
                        <ExtractedContentPanel
                            content={content || ''}
                            fileName={file?.name}
                            images={slides.flatMap(s => s.elements.filter(el => el.type === 'image').map(el => el.content))}
                        />
                    )}

                    {/* COLUMN 3: CENTRAL WORKSPACE (PREVIEW/EDITOR) */}
                    <div className="flex-[2.5] h-full overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-muted/30 flex flex-col items-center">
                        {/* FLOATING AI SETTINGS (ABOVE PAGE) */}
                        {showSettings && (
                            <div className="absolute top-4 right-4 z-50 animate-in fade-in slide-in-from-right-4 duration-300">
                                <AISettings onClose={() => setShowSettings(false)} />
                            </div>
                        )}

                        {/* NATIVE INTERACTIVE CANVAS (For PPTX) */}
                        {state === 'editor' && fileType === 'pptx' && slides.length > 0 && (
                            <div className="w-full flex flex-col items-center space-y-8 pb-32">
                                {slides.map((slide, idx) => (
                                    <div key={slide.id} className="w-full max-w-4xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Página {idx + 1}</span>
                                            <div className="h-[1px] flex-1 mx-4 bg-border/50"></div>
                                        </div>
                                        <div className="aspect-[16/9] shadow-2xl rounded-xl overflow-hidden bg-white ring-1 ring-border/50">
                                            <DocumentCanvas slide={slide} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* NATIVE WORD EDITOR (For DOCX) */}
                        {state === 'editor' && fileType === 'docx' && content && (
                            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden ring-1 ring-border/50 mb-32">
                                {viewMode === 'edit' ? (
                                    <WordEditor />
                                ) : (
                                    <DocxFaithfulViewer fileUrl={uploadedUrl!} />
                                )}
                            </div>
                        )}

                        {/* NATIVE EXCEL EDITOR (For XLSX) */}
                        {state === 'editor' && fileType === 'xlsx' && (
                            <div className="w-full max-w-5xl h-[80vh] shadow-2xl rounded-xl overflow-hidden bg-white ring-1 ring-border/50 flex items-center justify-center">
                                <div className="text-center">
                                    <Table className="w-12 h-12 text-green-600 mx-auto mb-4 opacity-40" />
                                    <h3 className="text-lg font-semibold">Motor Excel Nativo Ativo</h3>
                                    <p className="text-sm text-muted-foreground">Grid de dados interativo em fase Pilot.</p>
                                </div>
                            </div>
                        )}

                        {/* UNIVERSAL DOCUMENT VIEWER (Google Docs Viewer) */}
                        {state === 'editor' && fileType === 'pdf' && (
                            <div className="w-full max-w-5xl h-[80vh] shadow-2xl rounded-xl overflow-hidden bg-white ring-1 ring-border/50 flex flex-col">
                                {uploadedUrl ? (
                                    <iframe
                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(uploadedUrl)}&embedded=true`}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        title="Document Viewer"
                                        className="flex-1"
                                    >
                                        Este navegador não suporta a visualização de arquivos.
                                    </iframe>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                                        <p>Preparando visualização...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>


            {/* Floating Action Button for New File - Only show in Upload mode */}
            {state !== 'editor' && (
                <button
                    onClick={() => setState('upload')}
                    className="absolute bottom-8 right-8 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 z-40"
                    title="Novo Arquivo"
                >
                    <Plus className="w-6 h-6" />
                </button>
            )}
            {/* AI GENERATOR WIZARD */}
            {showGenerator && (
                <AIDocumentGenerator onClose={() => setShowGenerator(false)} />
            )}

            {/* PROCESSING OVERLAY */}
            {state === 'processing' && (
                <div className="absolute inset-0 z-50 bg-background/95 flex items-center justify-center p-4">
                    <ProcessingView fileType={fileType} onComplete={handleProcessingComplete} />
                </div>
            )}
        </div>
    );
}
