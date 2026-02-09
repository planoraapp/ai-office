'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LayoutTemplate, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                                <LayoutTemplate className="w-5 h-5" />
                            </div>
                            <span>OFFICE AI</span>
                        </Link>

                        <nav className="hidden md:flex ml-10 space-x-8">
                            <Link href="/library" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Minha Biblioteca
                            </Link>
                            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Planos e Preços
                            </Link>
                        </nav>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-border" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                            <UserIcon className="w-4 h-4" />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium">{user.displayName?.split(' ')[0]}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                    title="Sair"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                                <Link href="/editor" className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    Novo Projeto
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    Entrar
                                </Link>
                                <Link href="/editor" className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    Começar Agora
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border/50 bg-background px-4 py-6 space-y-4">
                    <Link
                        href="/library"
                        className="block text-base font-medium text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Minha Biblioteca
                    </Link>
                    <Link
                        href="/pricing"
                        className="block text-base font-medium text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Planos e Preços
                    </Link>
                    <div className="pt-4 border-t border-border/50 space-y-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 px-2">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-border" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                            <UserIcon className="w-4 h-4" />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium">{user.displayName}</span>
                                </div>
                                <Link
                                    href="/editor"
                                    className="block w-full text-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Novo Projeto
                                </Link>
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="block w-full text-center text-sm font-medium text-destructive hover:text-destructive/80"
                                >
                                    Sair
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block w-full text-center text-sm font-medium text-muted-foreground hover:text-foreground"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Entrar
                                </Link>
                                <Link
                                    href="/editor"
                                    className="block w-full text-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Começar Agora
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
