import { Clock, Megaphone, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const additionalFeatures = [
  {
    icon: Shield,
    title: "Segurança e transparência",
    description:
      "Se o vendedor/funcionário sair, o cliente e suas conversas ficam salvas com você",
  },
  {
    icon: Clock,
    title: "Histórico de atendimento",
    description:
      "Histórico sempre salvo, facilitando novos atendimentos e consultas futuras dos atendimentos",
  },
  {
    icon: Zap,
    title: "Mensagens rápidas",
    description:
      "Atalhos que você pode cadastrar com as mensagens que mais utilizam, padronizando o atendimento e mantendo a qualidade",
  },
  {
    icon: Megaphone,
    title: "Campanhas",
    description: "Envie mensagens em massa para seus contatos",
  },
];

export function AdditionalFeatures() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {additionalFeatures.map((feature) => (
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
