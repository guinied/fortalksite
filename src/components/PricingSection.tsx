"use client";

import { Check } from "lucide-react";
import { toast } from "sonner";
import { useStripe } from "@/app/hooks/useStripe";
import { useAuth } from "@/contexts/authContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

const baseFeatures = [
  "Central de atendimento",
  "Controle total dos atendimentos",
  "Etiquetas personalizadas",
  "Setores personalizados",
  "Relatórios detalhados",
  "Conexão com WhatsApp",
];

const plans = [
  {
    name: "Basic",
    connections: "1 conexão, 2 atendentes",
    price: "209,70",
    features: baseFeatures,
  },
  {
    name: "Professional",
    connections: "2 conexões, 4 atendentes",
    price: "419,40",
    features: [...baseFeatures],
    highlighted: true,
  },
  {
    name: "Enterprise",
    connections: "4 conexões, 8 atendentes",
    price: "838,80",
    features: [...baseFeatures],
  },
];

export function PricingSection() {
  const { createSubscriptionStripeCheckout } = useStripe();
  const { user } = useAuth();

  function handleVerifyLoggedAndCreateSubscription(product: any) {
    if (!user) {
      return toast.error("Você precisa estar logado para isso");
    }

    return createSubscriptionStripeCheckout({
      product,
      user,
      token: localStorage.getItem("token") || "",
    });
  }

  return (
    <section className="py-20" id="pricingSection">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Planos
          </div>
        </div>
        <h2 className="text-4xl font-bold text-center mb-6">
          Sob medida para a sua empresa
        </h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Escolha o plano ideal para o tamanho da sua operação
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, planIndex) => (
            <Card
              key={planIndex}
              className={`transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.highlighted
                  ? "border-primary border-2 shadow-xl relative"
                  : "border-muted"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
              )}
              <CardHeader>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.connections}
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-primary">
                      R$ {plan.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2">por mês</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild
                  className="w-full hover:bg-secondary-foreground !transition-all !duration-300 hover:cursor-pointer"
                  size="lg"
                  variant={plan.highlighted ? "default" : "outline"} 
                >
                  <a href="https://wa.link/3ncash">Comprar</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
