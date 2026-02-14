import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const testimonials = [
  {
    name: "Douglas",
    role: "CEO Grupo BahTech",
    content:
      "Mudou 100% a nossa organização/qualidade na questão de atendimento da empresa. Não só utilizamos, mas também recomendamos para nossos clientes!",
    image: "/depoimento1.jpg",
  },
  {
    name: "Guilherme Nied",
    role: "Diretor DottoVip",
    content:
      "Como recebemos e enviamos centenas de mensagens diárias, essa organização, o acesso via web e o histórico detalhado revolucionaram nosso atendimento.",
    image: "/depoimento2.png",
  },
  {
    name: "Gabriel Alves",
    role: "Diretor Analítica 3M",
    content:
      "A organização por filas e etiquetas melhoraram significativamente a nossa gestão. Gerenciar consultores e centralizar as interações do dia-a-dia ficaram mais eficazes com o ForTalk.",
    image: "depoimento3.png",
  },
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          O que nossos clientes dizem
        </h2>

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <img
                      src={testimonial.image}
                      className="w-14 mb-4 rounded-xl"
                      alt=""
                    />
                    <p className="text-muted-foreground mb-6 flex-grow italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </section>
  );
}
