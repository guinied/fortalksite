import { NextResponse } from "next/server";

const defaultServerUrl = "https://dvone.uazapi.com";
const defaultRecipientNumber = "555121930703";

const plans = [
  { name: "Basic", users: 2, numbers: 1, price: 209.7 },
  { name: "Professional", users: 4, numbers: 2, price: 419.4 },
  { name: "Enterprise", users: 8, numbers: 4, price: 838.8 },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ").slice(0, maxLength)
    : "";
}

function normalizeApprox(value: unknown) {
  const text = cleanText(value, 3);
  if (!text) return null;

  const amount = Number(text);
  return Number.isInteger(amount) && amount >= 1 && amount <= 999
    ? amount
    : null;
}

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getEstimate(users: number | null, numbers: number | null) {
  if (!users || !numbers) return "Estimativa em aberto";

  const plan = plans.find(
    (item) => users <= item.users && numbers <= item.numbers,
  );
  if (!plan) return "Configuração sob medida";

  return `${plan.name} — valor indicativo de ${formatPrice(plan.price)}/mês`;
}

async function readResponseBody(response: Response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function hasProviderError(body: unknown) {
  if (!isRecord(body)) return false;

  if (body.success === false || body.success === "false") return true;
  if (body.error) return true;

  const status =
    typeof body.status === "string" ? body.status.toLowerCase() : "";
  return ["error", "failed", "failure"].includes(status);
}

function getRequiredEnvironment() {
  const serverUrl = (process.env.UAZAPI_SERVER_URL ?? defaultServerUrl)
    .trim()
    .replace(/\/+$/, "");
  const token = process.env.UAZAPI_INSTANCE_TOKEN?.trim();
  const recipientNumber = (
    process.env.UAZAPI_RECIPIENT_NUMBER ?? defaultRecipientNumber
  ).replace(/\D/g, "");

  if (!serverUrl || !token || !recipientNumber) return null;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(serverUrl);
  } catch {
    return null;
  }

  if (parsedUrl.protocol !== "https:") return null;

  return { serverUrl, token, recipientNumber };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Não foi possível interpretar a solicitação." },
      { status: 400 },
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { message: "Solicitação inválida." },
      { status: 400 },
    );
  }

  const name = cleanText(body.name, 120);
  const phone = cleanText(body.phone, 30);
  const company = cleanText(body.company, 120);
  const phoneDigits = phone.replace(/\D/g, "");
  const users = normalizeApprox(body.users);
  const numbers = normalizeApprox(body.numbers);

  if (!name || !company || phoneDigits.length < 10 || phoneDigits.length > 11) {
    return NextResponse.json(
      { message: "Confira nome, telefone e empresa." },
      { status: 400 },
    );
  }

  const environment = getRequiredEnvironment();
  if (!environment) {
    return NextResponse.json(
      { message: "O envio ainda não está configurado." },
      { status: 503 },
    );
  }

  const message = [
    "Novo pedido de teste grátis no ForTalk.",
    "",
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    `Empresa: ${company}`,
    `Usuários (aprox.): ${users ?? "Não informado"}`,
    `Números de WhatsApp (aprox.): ${numbers ?? "Não informado"}`,
    `Estimativa: ${getEstimate(users, numbers)}`,
  ].join("\n");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${environment.serverUrl}/send/text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: environment.token,
      },
      body: JSON.stringify({
        number: environment.recipientNumber,
        text: message,
        linkPreview: false,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    const providerBody = await readResponseBody(response);

    if (!response.ok || hasProviderError(providerBody)) {
      console.error("UAZAPI rejeitou o pedido de teste grátis", {
        status: response.status,
      });
      return NextResponse.json(
        { message: "O serviço de WhatsApp não aceitou a solicitação." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Não foi possível conectar ao serviço de WhatsApp." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
