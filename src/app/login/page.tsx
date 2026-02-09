'use client';

import { useAuth } from '@/contexts/auth-context';
import { Chrome } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const { signInWithGoogle } = useAuth();

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary rounded-lg mx-auto flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
                        AI
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Bem-vindo ao OFFICE AI</h1>
                    <p className="text-sm text-muted-foreground">Entre para acessar seus documentos</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={signInWithGoogle}
                        className="w-full flex items-center justify-center gap-3 bg-white text-black border border-gray-200 hover:bg-gray-50 font-medium h-11 rounded-lg transition-colors"
                    >
                        <Chrome className="w-5 h-5" />
                        <span>Entrar com Google</span>
                    </button>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                    Ao continuar, você concorda com nossos{' '}
                    <Link href="/terms" className="underline hover:text-foreground">Termos de Serviço</Link> e{' '}
                    <Link href="/privacy" className="underline hover:text-foreground">Política de Privacidade</Link>.
                </div>
            </div>
        </div>
    );
}
