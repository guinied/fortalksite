"use client";

import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Clock3,
  History,
  LayoutDashboard,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Toaster } from "sonner";

type FormState = {
  name: string;
  phone: string;
  company: string;
  users: string;
  numbers: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  company: "",
  users: "",
  numbers: "",
};

const plans = [
  { name: "Basic", users: 2, numbers: 1, price: 209.7 },
  { name: "Professional", users: 4, numbers: 2, price: 419.4 },
  { name: "Enterprise", users: 8, numbers: 4, price: 838.8 },
];

const logos = [
  { src: "/advocacia.jpg", alt: "Cliente do segmento jurídico" },
  { src: "/analitica.png", alt: "Analítica 3M" },
  { src: "/bahtech.png", alt: "Grupo BahTech" },
  { src: "/claves.png", alt: "Claves" },
  { src: "/dottovip.png", alt: "DottoVip" },
  { src: "/etecc.jpg", alt: "Etecc" },
  { src: "/haeser.png", alt: "Haeser" },
  { src: "/inetvip.png", alt: "InetVip" },
];

const benefits = [
  {
    icon: LayoutDashboard,
    label: "Central de atendimento",
    title: "Todos os atendimentos em uma única visão.",
    text: "Sua equipe trabalha no mesmo painel, com contexto e organização em cada conversa.",
  },
  {
    icon: Users,
    label: "Colaboração",
    title: "Vários usuários no mesmo fluxo.",
    text: "Distribua o atendimento sem depender de um único celular ou de conversas espalhadas.",
  },
  {
    icon: History,
    label: "Continuidade",
    title: "Histórico que fica com a empresa.",
    text: "Consulte conversas anteriores e mantenha o relacionamento mesmo quando a equipe muda.",
  },
  {
    icon: BarChart3,
    label: "Gestão",
    title: "Decisões baseadas em informação.",
    text: "Acompanhe volume, produtividade e desempenho para evoluir o atendimento.",
  },
  {
    icon: Zap,
    label: "Agilidade",
    title: "Respostas rápidas e padronizadas.",
    text: "Use mensagens rápidas e templates para ganhar velocidade sem perder qualidade.",
  },
];

const faqs = [
  {
    question: "Tem valor de implementação do sistema?",
    answer:
      "Não. O ForTalk não possui custos de implementação. A integração é fácil e sem custos adicionais para sua empresa.",
  },
  {
    question: "Posso enviar áudio, vídeo e PDF?",
    answer:
      "Sim. O ForTalk permite enviar áudio, texto, vídeo, PDF e outros conteúdos usados no atendimento pelo WhatsApp.",
  },
  {
    question: "Posso conectar mais de um número?",
    answer:
      "Sim. Você pode conectar e gerenciar vários números de WhatsApp na mesma plataforma, de acordo com a sua operação.",
  },
  {
    question: "Eu tenho suporte durante o uso?",
    answer:
      "Sim. A equipe ForTalk oferece suporte para ajudar sua empresa durante a configuração e o uso da plataforma.",
  },
];

const fieldClassName =
  "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getEstimate(users: number, numbers: number) {
  if (!users || !numbers) return null;

  return (
    plans.find((plan) => users <= plan.users && numbers <= plan.numbers) ?? {
      name: "Sob medida",
      users,
      numbers,
      price: null,
    }
  );
}

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function TrialRequestPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const estimate = useMemo(
    () => getEstimate(Number(form.users), Number(form.numbers)),
    [form.users, form.numbers],
  );

  useEffect(() => {
    if (!isFormOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFormOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isFormOpen]);

  function openTrialForm() {
    setSubmitted(false);
    setShowError(false);
    setSubmitError(null);
    setIsFormOpen(true);
  }

  function updateField(field: keyof FormState, value: string) {
    setSubmitted(false);
    setShowError(false);
    setSubmitError(null);
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      setShowError(true);
      event.currentTarget.reportValidity();
      return;
    }

    setIsSending(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/teste-gratis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          result?.message ?? "Não foi possível enviar agora. Tente novamente.",
        );
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar agora. Tente novamente.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div
      id="trial-page"
      className="min-h-screen overflow-x-hidden bg-[#f6fbfb] text-slate-950"
    >
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-primary/95 text-white shadow-lg shadow-primary/10 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Voltar para a página inicial">
            <Image
              src="/fortalkLogoWhite.png"
              alt="Logo ForTalk"
              width={112}
              height={38}
              className="w-28"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a href="#recursos" className="transition-opacity hover:opacity-75">
              Recursos
            </a>
            <a
              href="#como-funciona"
              className="transition-opacity hover:opacity-75"
            >
              Como funciona
            </a>
            <a href="#planos" className="transition-opacity hover:opacity-75">
              Planos
            </a>
            <a href="#faq" className="transition-opacity hover:opacity-75">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openTrialForm}
              className="hidden rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-primary shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-white/90 sm:inline-flex"
            >
              Teste grátis
            </button>
            <a
              href="https://login.fortalk.app.br/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/80 px-4 py-2.5 text-sm font-bold transition hover:bg-white hover:text-primary"
            >
              Entrar
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="relative overflow-hidden border-b border-primary/10 bg-[#effcfb] pb-20 pt-32 sm:pb-28 sm:pt-40"
        >
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="max-w-2xl">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_5px_rgba(20,184,166,0.12)]" />
                  Atendimento profissional no WhatsApp
                </div>

                <h1 className="max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-[4.65rem]">
                  Organize sua equipe.
                  <span className="mt-2 block bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
                    Encante seus clientes.
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                  O ForTalk reúne os atendimentos da sua empresa em uma única
                  plataforma para sua equipe responder melhor, mais rápido e com
                  total contexto.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={openTrialForm}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-primary/25 transition hover:-translate-y-1 hover:bg-primary/90"
                  >
                    Solicitar teste grátis
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href="#recursos"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-white/70 px-6 py-3.5 text-sm font-bold text-primary transition hover:border-primary hover:bg-white"
                  >
                    Conhecer a plataforma
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Sem compromisso
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Configuração sob medida
                  </span>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[760px] lg:ml-auto">
                <div className="rounded-[2rem] border border-white bg-white p-2 shadow-[0_24px_70px_-24px_rgba(11,81,79,0.35)] sm:p-3">
                  <Image
                    src="/fortalkInterfaceImage.webp"
                    alt="Painel de atendimento do ForTalk"
                    width={1600}
                    height={900}
                    className="h-auto w-full rounded-[1.5rem]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-white py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Empresas que já organizam o atendimento com o ForTalk
            </p>
            <div className="mt-7 grid grid-cols-4 items-center gap-4 opacity-70 sm:grid-cols-8 sm:gap-6">
              {logos.map((logo) => (
                <div
                  key={logo.src}
                  className="flex h-12 items-center justify-center rounded-xl bg-slate-50 px-2 grayscale transition hover:grayscale-0"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={88}
                    height={48}
                    className="max-h-9 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="recursos" className="relative py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Recursos que resolvem a rotina
              </div>
              <h2 className="text-4xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Menos improviso no atendimento.
                <span className="block text-primary">
                  Mais confiança em cada conversa.
                </span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Tudo o que sua equipe precisa para atender com velocidade,
                organização e uma visão que ajuda a empresa a crescer.
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-12">
              <article className="relative overflow-hidden rounded-[2rem] bg-[#0f3040] p-8 text-white shadow-2xl shadow-slate-900/10 lg:col-span-7 lg:min-h-[390px] sm:p-10">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
                <div className="relative z-10 flex h-full flex-col justify-between gap-12">
                  <div className="max-w-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                      <LayoutDashboard className="h-6 w-6" />
                    </div>
                    <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-primary/90">
                      Central de atendimento
                    </p>
                    <h3 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">
                      O contexto certo para a pessoa certa.
                    </h3>
                    <p className="mt-4 max-w-sm leading-7 text-white/65">
                      Organize conversas por usuários, filas, setores e
                      etiquetas sem perder a visão do todo.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/80">
                    {["Filas", "Setores", "Etiquetas"].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-2"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>

              {benefits.slice(1, 3).map((benefit) => (
                <article
                  key={benefit.title}
                  className="group rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_18px_50px_-30px_rgba(15,48,64,0.4)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl lg:col-span-5 sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {benefit.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.025em] text-slate-950">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-600">
                    {benefit.text}
                  </p>
                </article>
              ))}

              {benefits.slice(3).map((benefit) => (
                <article
                  key={benefit.title}
                  className="group rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_18px_50px_-30px_rgba(15,48,64,0.4)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl lg:col-span-4 sm:p-8"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {benefit.label}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-tight text-slate-950">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {benefit.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          className="overflow-hidden bg-white py-24 sm:py-28"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-primary/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 p-2 shadow-2xl shadow-primary/10">
                <Image
                  src="/4.webp"
                  alt="Gestor acompanhando os indicadores de atendimento do ForTalk"
                  width={1500}
                  height={750}
                  className="h-auto w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:right-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                    Visão do gestor
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Informação para decidir melhor
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Como funciona
              </div>
              <h2 className="text-4xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Atendimento simples para quem atende. Visão clara para quem
                gerencia.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                O ForTalk acompanha a rotina real da sua empresa: receber,
                organizar, resolver e medir cada atendimento.
              </p>

              <div className="mt-9 space-y-5">
                {[
                  [
                    "01",
                    "Centralize",
                    "Reúna os atendimentos e números da empresa em um painel único.",
                  ],
                  [
                    "02",
                    "Organize",
                    "Distribua conversas por usuários, filas, setores e etiquetas.",
                  ],
                  [
                    "03",
                    "Acompanhe",
                    "Tenha histórico e relatórios para melhorar todos os dias.",
                  ],
                ].map(([number, title, text]) => (
                  <div key={number} className="flex gap-4">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                      {number}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-950">{title}</h3>
                      <p className="mt-1 leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={openTrialForm}
                className="mt-9 inline-flex items-center gap-2 font-bold text-primary transition hover:gap-3"
              >
                Quero conhecer na prática
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0f3040] py-24 text-white sm:py-28">
          <div className="absolute -right-32 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
            <div>
              <div className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary/90">
                Otimização da operação
              </div>
              <h2 className="text-4xl font-bold leading-tight tracking-[-0.035em] sm:text-5xl">
                Pare de perder tempo administrando vários WhatsApps.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/65">
                Centralize a rotina, preserve o histórico e acompanhe a equipe
                de onde estiver, com a tranquilidade de ter tudo no mesmo lugar.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Mais agilidade para a equipe",
                  "Mais segurança para a empresa",
                  "Mais clareza para o gestor",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold text-white/85"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-2 shadow-2xl">
                <Image
                  src="/5.webp"
                  alt="Atendimento profissional pelo WhatsApp com ForTalk"
                  width={1500}
                  height={750}
                  className="h-auto w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              ["100+", "empresas ativas"],
              ["5k+", "mensagens por dia"],
              ["98%", "de satisfação"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
                  {value}
                </div>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/75">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Experiência de quem usa
              </div>
              <h2 className="text-4xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Uma mudança percebida na rotina.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Organização para a equipe, segurança para a empresa e uma
                experiência melhor para o cliente.
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {[
                [
                  "/depoimento1.jpg",
                  "Douglas",
                  "CEO Grupo BahTech",
                  "Mudou 100% a nossa organização e qualidade na questão de atendimento da empresa.",
                ],
                [
                  "/depoimento2.png",
                  "Guilherme Nied",
                  "Diretor DottoVip",
                  "A organização, o acesso via web e o histórico detalhado revolucionaram nosso atendimento.",
                ],
                [
                  "/depoimento3.png",
                  "Gabriel Alves",
                  "Diretor Analítica 3M",
                  "A organização por filas e etiquetas melhorou significativamente a nossa gestão.",
                ],
              ].map(([image, name, role, quote]) => (
                <article
                  key={name}
                  className="flex h-full flex-col rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_18px_50px_-30px_rgba(15,48,64,0.4)] sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={image}
                      alt={`Foto de ${name}`}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-bold text-slate-950">{name}</p>
                      <p className="text-sm text-slate-500">{role}</p>
                    </div>
                  </div>
                  <p className="mt-7 flex-1 text-lg font-medium leading-8 text-slate-700">
                    “{quote}”
                  </p>
                  <div className="mt-7 flex gap-1 text-primary">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} aria-hidden="true">
                        ★
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="planos"
          className="border-y border-slate-100 bg-white py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Planos
              </div>
              <h2 className="text-4xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Sob medida para a sua empresa.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Preencha o formulário para receber uma indicação baseada no
                tamanho da sua operação.
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative rounded-[2rem] p-7 shadow-[0_18px_50px_-30px_rgba(15,48,64,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8 ${plan.name === "Professional" ? "border-2 border-primary bg-[#f4fffd]" : "border border-slate-200 bg-white"}`}
                >
                  {plan.name === "Professional" && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-primary/20">
                      Mais popular
                    </div>
                  )}
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {plan.name}
                  </p>
                  <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-950">
                    {formatPrice(plan.price)}
                    <span className="text-sm font-medium text-slate-500">
                      /mês
                    </span>
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    {plan.numbers} {plan.numbers === 1 ? "número" : "números"} ·{" "}
                    {plan.users} {plan.users === 1 ? "atendente" : "atendentes"}
                  </p>
                  <div className="my-7 h-px bg-slate-200" />
                  <ul className="space-y-3 text-sm text-slate-700">
                    {[
                      "Central de atendimento",
                      "Histórico completo",
                      "Filas e setores",
                      "Relatórios de gestão",
                      "Mensagens rápidas",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={openTrialForm}
                    className={`mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition hover:-translate-y-0.5 ${plan.name === "Professional" ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90" : "border border-primary text-primary hover:bg-primary/10"}`}
                  >
                    Solicitar teste grátis
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-8">
            <div>
              <div className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                FAQ
              </div>
              <h2 className="text-4xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Dúvidas frequentes.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Tudo para você entender como o ForTalk pode se adaptar à sua
                operação.
              </p>
              <button
                type="button"
                onClick={openTrialForm}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Falar com a equipe
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-slate-200 bg-white px-6 shadow-sm open:border-primary/30 open:shadow-lg open:shadow-primary/5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-bold text-slate-950 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-primary transition group-open:rotate-180" />
                  </summary>
                  <p className="max-w-2xl pb-5 leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-20 text-white sm:py-24">
          <div className="absolute -left-20 top-[-12rem] h-[30rem] w-[30rem] rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Clock3 className="mx-auto h-10 w-10 text-white/90" />
            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.035em] sm:text-5xl">
              Sua equipe está pronta para atender melhor.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
              Veja como o ForTalk se adapta ao tamanho da sua operação e
              transforme a rotina do seu atendimento.
            </p>
            <button
              type="button"
              onClick={openTrialForm}
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-primary shadow-xl transition hover:-translate-y-1 hover:bg-white/90"
            >
              Solicitar teste grátis
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b2430] py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <Image
            src="/fortalkLogoWhite.png"
            alt="Logo ForTalk"
            width={112}
            height={38}
            className="w-28"
          />
          <p className="text-sm text-white/60">
            Atendimento organizado para empresas que querem crescer.
          </p>
        </div>
      </footer>

      <Toaster position="top-right" richColors closeButton />

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/55 px-4 py-6 backdrop-blur-md sm:py-10">
          <div className="flex min-h-full items-center justify-center">
            <div
              className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white text-slate-950 shadow-2xl shadow-slate-950/30"
              role="dialog"
              aria-modal="true"
              aria-labelledby={!submitted ? "trial-dialog-title" : undefined}
              aria-label={submitted ? "Solicitação recebida" : undefined}
            >
              <div
                className={
                  submitted
                    ? "bg-white p-4 sm:p-5"
                    : "bg-gradient-to-br from-primary/10 via-white to-accent/10 p-6 sm:p-8"
                }
              >
                <div
                  className={`flex items-start gap-5 ${submitted ? "justify-end" : "justify-between"}`}
                >
                  {!submitted && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          Comece agora
                        </p>
                        <h2
                          id="trial-dialog-title"
                          className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
                        >
                          Faça seu teste grátis
                        </h2>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                          Informe, se souber, o tamanho aproximado da sua
                          operação. Esses dados não precisam estar exatos.
                        </p>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    aria-label="Fechar"
                    onClick={() => setIsFormOpen(false)}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {submitted ? (
                <div
                  className="flex min-h-[360px] flex-col items-center justify-center px-6 py-12 text-center sm:px-12"
                  aria-live="polite"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5">
                    <Check className="h-8 w-8" strokeWidth={2.5} />
                  </div>
                  <p className="mt-7 max-w-md text-center text-base leading-6 text-slate-600">
                    Nossa equipe ForTalk entrará em contato e enviará seus
                    acessos em alguns minutos.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
                <form className="space-y-5 p-6 sm:p-8" onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="trial-name"
                        className="text-sm font-semibold text-slate-950"
                      >
                        Seu nome
                      </label>
                      <input
                        id="trial-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        placeholder="Como podemos chamar você?"
                        className={fieldClassName}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="trial-phone"
                        className="text-sm font-semibold text-slate-950"
                      >
                        Telefone de contato
                      </label>
                      <input
                        id="trial-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        pattern={"\\(\\d{2}\\) \\d{4,5}-\\d{4}"}
                        value={form.phone}
                        onChange={(event) =>
                          updateField("phone", formatPhone(event.target.value))
                        }
                        placeholder="(51) 99999-9999"
                        title="Informe um telefone com DDD"
                        className={fieldClassName}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="trial-company"
                        className="text-sm font-semibold text-slate-950"
                      >
                        Nome da empresa
                      </label>
                      <input
                        id="trial-company"
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        value={form.company}
                        onChange={(event) =>
                          updateField("company", event.target.value)
                        }
                        placeholder="Nome da sua empresa"
                        className={fieldClassName}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="trial-users"
                        className="text-sm font-semibold text-slate-950"
                      >
                        Usuários (aprox.)
                      </label>
                      <input
                        id="trial-users"
                        name="users"
                        type="number"
                        min="1"
                        max="999"
                        inputMode="numeric"
                        value={form.users}
                        onChange={(event) =>
                          updateField("users", event.target.value)
                        }
                        placeholder="Ex.: 4"
                        className={fieldClassName}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="trial-numbers"
                        className="text-sm font-semibold text-slate-950"
                      >
                        Números (aprox.)
                      </label>
                      <input
                        id="trial-numbers"
                        name="numbers"
                        type="number"
                        min="1"
                        max="999"
                        inputMode="numeric"
                        value={form.numbers}
                        onChange={(event) =>
                          updateField("numbers", event.target.value)
                        }
                        placeholder="Ex.: 2"
                        className={fieldClassName}
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-primary/20 bg-[#f1fffc] p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-primary/15 p-2 text-primary">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          Estimativa da operação
                        </p>
                        {estimate ? (
                          <>
                            <p className="mt-1 text-lg font-bold text-slate-950">
                              Estimativa recebida
                            </p>
                            <p className="text-sm text-slate-600">
                              A equipe usa esses dados para indicar a
                              configuração mais adequada para sua operação.
                            </p>
                          </>
                        ) : (
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            Opcional: informe uma estimativa para orientar a
                            configuração. Você também pode deixar em branco.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {showError && (
                    <p
                      className="text-sm font-medium text-red-600"
                      role="alert"
                    >
                      Confira nome, telefone e empresa para continuar. Usuários
                      e números são opcionais.
                    </p>
                  )}

                  {submitError && (
                    <p
                      className="text-sm font-medium text-red-600"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSending || submitted}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20"
                  >
                    {isSending
                      ? "Enviando solicitação..."
                      : submitted
                        ? "Solicitação enviada"
                        : "Solicitar teste grátis"}
                    {!isSending && !submitted && (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
                    <ShieldCheck className="h-4 w-4 flex-shrink-0 text-primary" />
                    Sem compromisso. A equipe ForTalk entra em contato com você.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
