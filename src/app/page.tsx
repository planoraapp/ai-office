'use client';

import React from 'react';
import { Upload, Zap, SquarePen, Download, Sparkles, ChevronDown, FileText, Palette, Image as ImageIcon, Paperclip, ArrowUp } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 h-screen overflow-hidden bg-background -z-10 pointer-events-none ">
        <canvas className="absolute inset-0 filter blur-[15px] w-[1362px] h-[856px]" width="1498" height="941"></canvas>
        <div className="absolute inset-0 bg-background/5 backdrop-blur-[50px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#00000021_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      <section className="relative z-10 flex items-start justify-center px-4 sm:px-8 pt-32 pb-20">
        <div className="relative w-full max-w-3xl text-center">

          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 mb-6">
            <span className="font-sans text-xs md:text-sm font-medium tracking-wide">#1 Criador de Slides com IA</span>
          </div>

          <h1 className="text-4xl md:text-6xl mb-6 tracking-tight font-black text-foreground">Apresentações Completas em Segundos</h1>

          <p className="font-sans text-sm md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-10">
            De documentos existentes, imagens ou slides para apresentações incríveis com estrutura clara e narrativa envolvente usando IA. Exporte para <img alt="PowerPoint" className="inline-block w-4 h-4 align-middle mx-0.5" src="https://cdn.getcube.one/logos/powerpoint.svg" /> PowerPoint, Google Slides e Keynote.
            <a className="inline-block rounded-full bg-foreground text-background px-2.5 py-1 text-xs font-medium tracking-tight transition-all hover:opacity-90 whitespace-nowrap ml-1" href="#demo">Ver Demo</a>
          </p>

          <a className="block max-w-xl mx-auto relative font-sans group cursor-pointer" href="/editor">
            <div className="bg-foreground/5 backdrop-blur-xl rounded-xl border border-foreground/10 shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.02] hover:bg-foreground/10">
              <div className="flex flex-col">
                <div className="min-h-[100px] px-4 py-4 text-sm sm:text-base text-muted-foreground/80 flex items-start text-left">
                  Crie uma apresentação sobre arquitetura sustentável para clientes corporativos...
                </div>
                <div className="flex justify-between items-center px-3 pb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-background/50 border border-foreground/10 text-muted-foreground text-[10px] sm:text-xs">
                      <FileText className="w-3 h-3" />
                      <span>texto</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-background/50 border border-foreground/10 text-muted-foreground text-[10px] sm:text-xs">
                      <Palette className="w-3 h-3" />
                      <span>instruções</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-background/50 border border-foreground/10 text-muted-foreground text-[10px] sm:text-xs">
                      <ImageIcon className="w-3 h-3" />
                      <span>imagens</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-foreground/5 transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-foreground text-background shadow-sm hover:opacity-90 transition-opacity">
                      <ArrowUp className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>
      <section className="relative z-10 flex items-start justify-center px-4 sm:px-8 pb-8">
        <div className="relative w-full max-w-6xl">
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] items-start">
            <div className="lg:sticky lg:top-24 self-start">
              <div className="relative overflow-hidden mx-auto lg:mx-0 rounded-2xl border border-border/30 bg-background/50 shadow-[0_30px_80px_-60px_rgba(15,15,15,0.6)] aspect-square max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-none">
                <video src="https://cdn.getcube.one/landing/use-case/enhance/enhance-pptx-demo-v1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover"></video>
              </div>
            </div>
            <div className="space-y-3 rounded-xl p-6 bg-background/80">
              <div className="group relative rounded-xl border-2 border-dashed p-10 cursor-pointer duration-200 transition-colors border-border hover:border-foreground/50 hover:bg-muted/10">
                <input type="file" accept=".pptx" className="hidden" />
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                  <div className="space-y-3 mx-auto flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center bg-muted/30 rounded-xl p-3 mb-6">
                      <Upload className="h-8 w-8 text-foreground/80" />
                    </div>
                    <p className="text-xl font-semibold text-foreground inline-flex items-center gap-2">Arraste sua apresentação aqui</p>
                    <p className="text-xs text-muted-foreground">Máx 20 slides, 25MB. Mantemos seu conteúdo intacto.</p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <a href="/editor" className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-4 py-2 has-[&gt;svg]:px-3">Carregar PPTX</a>
                    <button type="button" className="cursor-pointer text-sm text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline">Ainda não tenho uma apresentação</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-4 sm:px-8 pt-2 sm:pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="sm:pb-2">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-8 md:gap-y-2">
              <span className="text-[10px] md:text-sm text-foreground/50 whitespace-nowrap w-full text-center md:w-auto">Usado por pessoas da</span>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:gap-x-8 md:gap-y-2">
                <span className="text-[10px] md:text-sm text-foreground/60 whitespace-nowrap">OpenAI</span>
                <span className="text-[10px] md:text-sm text-foreground/60 whitespace-nowrap">Notion</span>
                <span className="text-[10px] md:text-sm text-foreground/60 whitespace-nowrap">Vercel</span>
                <span className="text-[10px] md:text-sm text-foreground/60 whitespace-nowrap">ByteDance</span>
                <span className="text-[10px] md:text-sm text-foreground/60 whitespace-nowrap">Google</span>
                <span className="text-[10px] md:text-sm text-foreground/60 whitespace-nowrap">Stanford</span>
                <span className="text-[10px] md:text-sm text-foreground/60 whitespace-nowrap">Harvard</span>
                <span className="text-[10px] md:text-sm text-foreground/60 whitespace-nowrap">Yale</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative w-full h-16 sm:h-32 bg-gradient-to-b from-transparent via-30% via-background/70 to-background pointer-events-none"></div>
      <section className="relative w-full sm:pt-4 pb-8 sm:pb-16 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4 sm:mb-8 text-center">
          <h2 className="text-2xl md:text-5xl text-foreground tracking-tight font-black leading-[1.1] mb-2 sm:mb-4">Mais barato, rápido e tão bom quanto designers</h2>
          <p className="text-xs md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">Redesign de PowerPoint e apresentações com IA. Veja exemplos reais de antes e depois</p>
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-20 sm:h-40 bg-gradient-to-b from-background via-background/50 to-transparent z-10 pointer-events-none"></div>
          <div className="grid grid-cols-3 sm:grid-cols-3 2xl:grid-cols-6 gap-1 sm:gap-2 xl:gap-3 px-2 sm:px-4">

            {[
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/8lykdb/after/2.webp", alt: "Teaching IELTS" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/LFAze5/after/3.webp", alt: "What is Engineering" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/vm45bj/after/1-v2.webp", alt: "The Drill Press" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/Z1eM0t/after/2.webp", alt: "Sagrada Família" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/hCiz5Z/after/1-v2.webp", alt: "Professional Consulting" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/mars/after/3.webp", alt: "Go to Mars" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/NtIvJC/after/1-v2.webp", alt: "A Performance Review That’s Not Boring" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/h7ecV7/after/1-v2.webp", alt: "More Artistic Startup Pitch" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/wh44iJ/after/1-v2.webp", alt: "Eat Beetroot" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/zG9cpb/after/1.webp", alt: "Data Driven Solution" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/BtWRFb/after/1.webp", alt: "Professional Company Pitch" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/8MTSne/after/1-v2.webp", alt: "Sales Analytics with Charts" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/fOYG5V/after/1-v2.webp", alt: "Devon Rex" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/En1oU8/after/1-v2.webp", alt: "Tech Startup Pitch" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/9t3fFP/after/1.webp", alt: "Photographer Portfolio Showcase" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/6QEEbr/after/1.webp", alt: "A Playful Science Class" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/6uTIKa/after/1.webp", alt: "Growth Strategy Review" },
              { src: "https://cdn.getcube.one/landing/use-case/enhance/past-work/elon/after/2.webp", alt: "Elon Musk" },
            ].map((item, index) => (
              <div key={index} className="group relative aspect-video rounded-lg overflow-hidden bg-muted/30 transition-all duration-200 hover:brightness-110 hover:shadow-lg cursor-zoom-in">
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
                <button className="absolute top-1 right-1 lg:top-2 lg:right-2 px-2 py-1 bg-black/70 hover:bg-black/90 text-white text-[10px] lg:text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Comparar</button>
              </div>
            ))}

          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        </div>
      </section>
      <div className="relative w-full h-16 sm:h-32 bg-gradient-to-b from-background via-70% via-background/70 to-transparent pointer-events-none"></div>
      <section className="w-full px-4 sm:px-8 pt-4 sm:pt-8 pb-8 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-2xl md:text-5xl text-foreground tracking-tight font-black leading-[1.1] mb-2 sm:mb-4">Como melhorar qualquer PowerPoint em minutos.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-foreground/5 border border-foreground/10 transition-all duration-200 hover:bg-foreground/10 hover:scale-105">
              <div className="text-foreground">
                <Upload className="w-10 h-10" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">1. Carregar</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Carregue seu PowerPoint, documentos, imagens ou referências de design. Nossa IA analisa seu conteúdo e layout.</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-foreground/5 border border-foreground/10 transition-all duration-200 hover:bg-foreground/10 hover:scale-105">
              <div className="text-foreground">
                <Sparkles className="w-10 h-10" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">2. Redesign</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Adicione instruções se quiser algo específico. Nossa IA irá redesenhar seus slides.</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-foreground/5 border border-foreground/10 transition-all duration-200 hover:bg-foreground/10 hover:scale-105">
              <div className="text-foreground">
                <SquarePen className="w-10 h-10" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">3. Continuar Editando</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <a href="#editable-slides" className="inline-block rounded-full bg-white px-2 py-0.5 md:px-2.5 md:py-1 text-black text-xs font-medium tracking-tight transition-all duration-200 hover:bg-white/90 whitespace-nowrap">Baixar</a>{' '}
                  arquivos PPTX totalmente editáveis ou continuar editando no OFFICE AI. Exporte para PowerPoint, Google Slides e Keynote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full py-20 px-4">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">O que as pessoas dizem</h2>
          </div>
          <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Ethan Goh", role: "Tech Lead no Google", feedback: "Aplicativo subestimado. Melhor ferramenta que vi entre as similares.", img: "https://cdn.getcube.one/landing/testimonials/ethan_goh.webp" },
              { name: "Chris Parker", role: "Engenharia em Stanford", feedback: "Essa IA realmente entende de design.", img: "https://cdn.getcube.one/landing/testimonials/chris_parker.webp" },
              { name: "Sarah Kim", role: "Biologia em Yale", feedback: "Fiz 3 apresentações semana passada. Ainda surpresa que funciona tão bem.", img: "https://cdn.getcube.one/landing/testimonials/sarah_kim.webp" },
              { name: "Emma Claire", role: "Criadora de Conteúdo no TikTok", feedback: "Não acredito que isso existe. Me economizou umas 20 horas essa semana.", img: "https://cdn.getcube.one/landing/testimonials/emma_claire.webp" },
              { name: "Shane Chen", role: "Produto na ByteDance", feedback: "Como alguém que odeia fazer apresentações no PowerPoint, isso é um salva-vidas!", img: "https://cdn.getcube.one/landing/testimonials/shane_chen.webp" },
              { name: "Irena Han", role: "Fundadora na Sleath Startup", feedback: "Pitch deck em 10 minutos. Ficou melhor que o que pagamos 5k. Melhor gosto que a maioria dos designers que conheço.", img: "https://cdn.getcube.one/landing/testimonials/irena_han.webp" }
            ].map((testimonial, i) => (
              <div key={i} className="relative grid grid-cols-[auto_1fr] gap-x-3 overflow-hidden border border-dashed border-foreground/25 p-4 bg-background/20">
                <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/2 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                    <svg aria-hidden="true" className="pointer-events-none fill-foreground/30 absolute inset-0 h-full w-full stroke-white/20 mix-blend-overlay">
                      <defs>
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse" x="-1" y="-1">
                          <path d="M.5 40V.5H40" fill="none" strokeDasharray="3"></path>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)"></rect>
                    </svg>
                  </div>
                </div>
                <img alt={testimonial.name} src={testimonial.img} loading="lazy" className="size-9 rounded-full" />
                <div>
                  <div className="-mt-0.5 -space-y-0.5">
                    <p className="text-sm md:text-base">{testimonial.name}</p>
                    <span className="text-muted-foreground block text-[11px] font-light tracking-tight">{testimonial.role}</span>
                  </div>
                  <blockquote className="mt-3">
                    <p className="text-sm font-light tracking-wide text-foreground/80">{testimonial.feedback}</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="editable-slides" className="w-full px-4 sm:px-8 pt-4 sm:pt-8 pb-8 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-2xl md:text-5xl text-foreground tracking-tight font-black leading-[1.1] mb-2 sm:mb-4">Por que equipes escolhem OFFICE AI</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col gap-3 p-6 rounded-lg border border-border/30 bg-background shadow-sm transition-all duration-200 hover:shadow-lg">
              <SquarePen className="w-6 h-6 text-foreground/60" />
              <h3 className="font-bold text-lg leading-tight">Slides Totalmente Editáveis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Edite cada slide no PowerPoint, Google Slides, Keynote ou OFFICE AI. Sem templates travados.</p>
            </div>
            <div className="flex flex-col gap-3 p-6 rounded-lg border border-border/30 bg-background shadow-sm transition-all duration-200 hover:shadow-lg">
              <Sparkles className="w-6 h-6 text-foreground/60" />
              <h3 className="font-bold text-lg leading-tight">Edição Contínua com IA</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Refine layouts, reescreva conteúdo e redesenhe slides instantaneamente com IA.</p>
            </div>
            <div className="flex flex-col gap-3 p-6 rounded-lg border border-border/30 bg-background shadow-sm transition-all duration-200 hover:shadow-lg">
              <Zap className="w-6 h-6 text-foreground/60" />
              <h3 className="font-bold text-lg leading-tight">Animações Vivas</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Visualize e apresente com animações suaves dentro do OFFICE AI.</p>
            </div>
            <div className="flex flex-col gap-3 p-6 rounded-lg border border-border/30 bg-background shadow-sm transition-all duration-200 hover:shadow-lg">
              <Download className="w-6 h-6 text-foreground/60" />
              <h3 className="font-bold text-lg leading-tight">Exporte e Tenha Seus Arquivos</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Baixe PPTX editável, PDF e imagens.</p>
            </div>
          </div>
          <p className="text-center text-muted-foreground text-sm max-w-2xl mx-auto">OFFICE AI é uma ferramenta de apresentação com IA para criar, editar e exportar arquivos PowerPoint, Google Slides e Keynote com editabilidade total e animações integradas.</p>
        </div>
      </section>
      <section className="relative px-4 py-8 sm:py-16">
        <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23888888' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", maskImage: "radial-gradient(circle, white 20%, transparent 80%)", WebkitMaskImage: "radial-gradient(circle, white 20%, transparent 80%)" }}></div>
        <div className="relative flex flex-col items-center">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-2xl md:text-5xl text-foreground tracking-tight font-black leading-[1.1] mb-2 sm:mb-4">Não acredite apenas em nós. Assista a demo.</h2>
          </div>
          <div className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden border border-border bg-black">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/uvtCcp-Lnq4" title="Demo Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>
      </section>
      <section className="w-full px-4 sm:px-8 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-12 text-center font-serif font-normal">Dúvidas?</h2>
          <div className="w-full space-y-4">
            {[
              { q: "Quantos créditos uma apresentação consome?", a: "Em média, a maioria dos usuários precisa de cerca de 400 créditos para uma apresentação, incluindo edições até que você esteja satisfeito." },
              { q: "Quantas apresentações eu recebo por mês?", a: "Você pode criar quantas apresentações quiser. Os recursos de IA usam créditos, então o número exato depende de quantos créditos você tem restantes e como os utiliza." },
              { q: "E se meus créditos acabarem?", a: "Você sempre pode comprar créditos extras a partir de R$ 15,00 ou atualizar para um plano superior." }
            ].map((faq, i) => (
              <div key={i} className="border-b last:border-b-0 pb-4">
                <details className="group">
                  <summary className="list-none flex justify-between items-center cursor-pointer text-base sm:text-lg font-normal py-4 hover:underline">
                    {faq.q}
                    <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="text-sm text-muted-foreground mt-2 pl-4">
                    {faq.a}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
