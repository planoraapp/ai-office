'use client';

import React, { useEffect, useState } from 'react';
import { Search, Filter, MoreVertical, FileText, PieChart, LayoutTemplate, Plus, Loader2, Clock, Download, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { ProjectsService, Project } from '@/services/projects';

export default function LibraryPage() {
    const { user, loading: authLoading } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pptx' | 'xlsx' | 'docs'>('all');
    const [activeMenu, setActiveMenu] = useState<string | null>(null); // Track open menu

    const handleDelete = async (projectId: string, e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation();
        if (confirm('Tem certeza que deseja excluir este projeto?')) {
            try {
                await ProjectsService.deleteProject(projectId);
                setProjects(projects.filter(p => p.id !== projectId));
            } catch (error) {
                console.error("Failed to delete project", error);
                alert("Erro ao excluir projeto.");
            }
        }
        setActiveMenu(null);
    };

    useEffect(() => {
        async function fetchProjects() {
            if (user) {
                try {
                    const data = await ProjectsService.getUserProjects(user.uid);
                    setProjects(data);
                } catch (error) {
                    console.error("Failed to load projects", error);
                } finally {
                    setLoading(false);
                }
            } else if (!authLoading) {
                setLoading(false);
            }
        }

        fetchProjects();
    }, [user, authLoading]);

    const filteredProjects = projects.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'docs') return p.type === 'docx' || p.type === 'pdf';
        return p.type === filter;
    });

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-background pt-24 flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-2xl font-bold mb-4">Faça login para ver sua biblioteca</h2>
                <Link href="/login" className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
                    Entrar
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Minha Biblioteca</h1>
                    <p className="text-muted-foreground mt-1">Gerencie seus documentos e apresentações</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar arquivos..."
                            className="h-10 pl-9 pr-4 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === 'all' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setFilter('pptx')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === 'pptx' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                    Apresentações
                </button>
                <button
                    onClick={() => setFilter('xlsx')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === 'xlsx' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                    Planilhas
                </button>
                <button
                    onClick={() => setFilter('docs')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === 'docs' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                    Documentos
                </button>
            </div>

            {/* Grid */}
            {filteredProjects.length === 0 ? (
                <div className="text-center py-24 border-2 border-dashed border-border/50 rounded-2xl bg-muted/5">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Sua biblioteca está vazia</h3>
                    <p className="text-muted-foreground mb-6">Comece criando seu primeiro projeto com IA</p>
                    <Link href="/editor" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                        Novo Projeto
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* New Project Card */}
                    <Link href="/editor" className="group border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-colors bg-muted/5 hover:bg-muted/10 cursor-pointer h-full min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                            <Plus className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">Novo Projeto</span>
                    </Link>

                    {filteredProjects.map((project) => (
                        <Link href={`/editor?project=${project.id}`} key={project.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all block relative">
                            <div className="aspect-video bg-muted relative flex items-center justify-center overflow-hidden">
                                {project.fileUrl ? (
                                    <div className="w-full h-full relative">
                                        <iframe
                                            src={`https://docs.google.com/gview?url=${encodeURIComponent(project.fileUrl)}&embedded=true`}
                                            className="w-[142%] h-[142%] border-0 pointer-events-none scale-[0.70] origin-top-left"
                                            title="Preview"
                                            loading="lazy"
                                        />
                                        {/* Overlay to catch clicks and prevent iframe interaction */}
                                        <div className="absolute inset-0 bg-transparent z-10" />
                                    </div>
                                ) : (
                                    <>
                                        {project.type === 'pptx' ? <LayoutTemplate className="w-10 h-10 text-orange-500/50" /> :
                                            project.type === 'xlsx' ? <PieChart className="w-10 h-10 text-green-500/50" /> :
                                                <FileText className="w-10 h-10 text-blue-500/50" />}
                                    </>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none z-20" />
                            </div>
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-semibold truncate pr-2 flex-1">{project.title}</h3>
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setActiveMenu(activeMenu === project.id ? null : project.id);
                                            }}
                                            className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted/50 rounded-md transition-colors"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                        {activeMenu === project.id && (
                                            <div className="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
                                                <button
                                                    onClick={(e) => handleDelete(project.id, e)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 text-left"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Excluir
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                                    </span>
                                    <button
                                        onClick={(e) => { e.preventDefault(); /* Allow download logic if needed later */ }}
                                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                        title="Baixar"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
