"use client";

import { ArrowRight, BarChart3, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";

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
  { name: "Basic", users: 2, numbers: 1 },
  { name: "Professional", users: 4, numbers: 2 },
  { name: "Enterprise", users: 8, numbers: 4 },
];

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10";

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
    }
  );
}

export function CompactTrialRequestPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const estimate = useMemo(
    () => getEstimate(Number(form.users), Number(form.numbers)),
    [form.users, form.numbers],
  );

  function updateField(field: keyof FormState, value: string) {
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
    <main className="flex min-h-screen items-center justify-center bg-[#f6fbfb] px-4 py-8 text-slate-950 sm:py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_24px_70px_-32px_rgba(15,48,64,0.45)] sm:p-7">
        {submitted ? (
          <div
            className="flex min-h-[300px] flex-col items-center justify-center text-center"
            aria-live="polite"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-6 text-slate-600">
              Nossa equipe ForTalk entrará em contato e enviará seus acessos em
              alguns minutos.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-7 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20"
            >
              Voltar ao site
            </Link>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="pr-8">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Solicitar teste grátis
              </h1>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Preencha seus dados. Usuários e números são aproximados.
              </p>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="compact-trial-name"
                  className="text-sm font-semibold text-slate-950"
                >
                  Seu nome
                </label>
                <input
                  id="compact-trial-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Como podemos chamar você?"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="compact-trial-phone"
                  className="text-sm font-semibold text-slate-950"
                >
                  Telefone de contato
                </label>
                <input
                  id="compact-trial-phone"
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
                  htmlFor="compact-trial-company"
                  className="text-sm font-semibold text-slate-950"
                >
                  Nome da empresa
                </label>
                <input
                  id="compact-trial-company"
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
                  htmlFor="compact-trial-users"
                  className="text-sm font-semibold text-slate-950"
                >
                  Usuários (aprox.)
                </label>
                <input
                  id="compact-trial-users"
                  name="users"
                  type="number"
                  min="1"
                  max="999"
                  inputMode="numeric"
                  value={form.users}
                  onChange={(event) => updateField("users", event.target.value)}
                  placeholder="Ex.: 4"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="compact-trial-numbers"
                  className="text-sm font-semibold text-slate-950"
                >
                  Números (aprox.)
                </label>
                <input
                  id="compact-trial-numbers"
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

            <div className="rounded-xl border border-primary/20 bg-[#f1fffc] p-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/15 p-1.5 text-primary">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    Estimativa da operação
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-600">
                    {estimate
                      ? "Estimativa recebida. A equipe confirma a configuração ideal."
                      : "Opcional: usuários e números podem ficar em branco."}
                  </p>
                </div>
              </div>
            </div>

            {showError && (
              <p className="text-sm font-medium text-red-600" role="alert">
                Confira nome, telefone e empresa para continuar. Usuários e
                números são opcionais.
              </p>
            )}

            {submitError && (
              <p className="text-sm font-medium text-red-600" role="alert">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-wait disabled:opacity-70"
            >
              {isSending ? "Enviando solicitação..." : "Solicitar teste grátis"}
              {!isSending && <ArrowRight className="h-4 w-4" />}
            </button>

            <div className="flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
              <ShieldCheck className="h-4 w-4 flex-shrink-0 text-primary" />
              Sem compromisso. Nossa equipe entra em contato.
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
