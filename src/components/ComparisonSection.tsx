import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const userFeatures = [
  "Centralização do Atendimento",
  "WhatsApp e Instagram juntos",
  "Análise Detalhada de Desempenho",
  "Dados seguros",
  "Envio de Mensagens em Massa",
  "Transferência Facilitada Entre Números",
  "Acesso Universal de Qualquer Lugar",
  "Setores, Etiquetas e Filas de Atendimento",
];

const nonUserFeatures = [
  "Gestão Fragmentada",
  "Priorização Manual",
  "Respostas limitadas",
  "Falta de Visão Analítica e gerencial",
  "Se perder o número perde o histórico",
  "Sem Envio em Massa Centralizado",
  "Impossível transferir",
  "Acesso Limitado ou Dependente de Loc.",
];

export function ComparisonSection() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-primary border-2">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-primary">
                Usuário ForTalk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {userFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-destructive border-2 opacity-70">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-destructive">
                Não usuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {nonUserFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
