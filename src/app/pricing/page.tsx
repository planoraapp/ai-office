'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">Planos simples para produtividade máxima</h1>
                    <p className="text-lg text-muted-foreground">Escolha o melhor plano para você ou sua equipe. Cancele a qualquer momento.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Free Plan */}
                    <div className="rounded-2xl border border-border bg-card p-8 flex flex-col shadow-sm">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Gratuito</h3>
                            <div className="mt-4 flex items-baseline text-foreground">
                                <span className="text-4xl font-bold tracking-tight">R$ 0</span>
                                <span className="ml-1 text-xl font-semibold text-muted-foreground">/mês</span>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground">Para testes rápidos e uso pessoal esporádico.</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500" /> 3 Documentos por mês
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500" /> Edição básica de IA
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500" /> Exportação com marca d'água
                            </li>
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <X className="w-4 h-4" /> Análise financeira avançada
                            </li>
                        </ul>
                        <Link href="/signin" className="block w-full rounded-md border border-input bg-background px-4 py-2 text-center text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                            Começar Grátis
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative rounded-2xl border-2 border-primary bg-card p-8 flex flex-col shadow-lg scale-105 z-10">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 sm:translate-x-1/4">
                            <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                                Mais Popular
                            </span>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Profissional</h3>
                            <div className="mt-4 flex items-baseline text-foreground">
                                <span className="text-4xl font-bold tracking-tight">R$ 49</span>
                                <span className="ml-1 text-xl font-semibold text-muted-foreground">/mês</span>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground">Para profissionais que precisam de agilidade diária.</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary" /> Documentos Ilimitados
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary" /> Acesso a todas as ferramentas (Excel, PPT, Docs)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary" /> Sem marca d'água
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary" /> Suporte prioritário por email
                            </li>
                        </ul>
                        <Link href="/checkout" className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
                            Assinar Pro
                        </Link>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="rounded-2xl border border-border bg-card p-8 flex flex-col shadow-sm">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Empresarial</h3>
                            <div className="mt-4 flex items-baseline text-foreground">
                                <span className="text-4xl font-bold tracking-tight">Sob Consulta</span>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground">Para times que precisam de controle e segurança.</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500" /> Tudo do plano Pro
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500" /> Gestão de Times e Permissões
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500" /> SSO e Segurança Avançada
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500" /> API dedicada
                            </li>
                        </ul>
                        <Link href="/contact" className="block w-full rounded-md border border-input bg-background px-4 py-2 text-center text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                            Falar com Vendas
                        </Link>
                    </div>

                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold mb-4">Como funcionam os créditos?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        No plano Gratuito, você usa um sistema de créditos recarregáveis mensalmente. Cada ação de IA (gerar um slide, limpar uma planilha) consome créditos. No plano Pro, o uso é ilimitado dentro de uma política de uso justo.
                    </p>
                </div>
            </div>
        </div>
    );
}
