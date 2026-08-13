import { ArrowLeftRight, BarChart3, MessageSquare, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Zap,
    title: "Organização e rapidez",
    description:
      "A ForTalk centraliza o atendimento da sua empresa de forma organizada, fácil e o melhor de tudo, WhatsApp em somente um lugar.",
  },
  {
    icon: BarChart3,
    title: "Informação na sua mão",
    description:
      "Relatórios de atendimentos completos para gestão do atendimento de sua empresa",
  },
  {
    icon: ArrowLeftRight,
    title: "Atendimento dinâmico",
    description: "Transferências de atendimentos entre funcionários ou setores",
  },
  {
    icon: MessageSquare,
    title: "Múltiplos atendimentos",
    description:
      "Múltiplos atendentes, mensagens rápidas e templates personalizados",
  },
];

export function FeaturesSection() {
  return (
    <section id="recursos" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Recursos
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Seja referência em atendimento com a{" "}
          <span className="text-primary">ForTalk</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-background/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="pt-6 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
