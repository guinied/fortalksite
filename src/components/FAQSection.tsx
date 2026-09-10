import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "Tem valor de implementação do sistema?",
    answer:
      "Não, o Fortalk não possui custos de implementação. Oferecemos uma integração fácil e sem custos adicionais para garantir uma transição suave para aprimorar o seu atendimento no WhatsApp.",
  },
  {
    question: "Posso enviar áudio?",
    answer:
      "Sim, no Fortalk você pode enviar diversos tipos de conteúdo, incluindo áudio, texto, vídeo e PDF. Oferecemos flexibilidade para atender às suas necessidades de comunicação de maneira abrangente.",
  },
  {
    question: "Posso conectar mais de um número na plataforma?",
    answer:
      "Sim, no Fortalk é possível conectar e gerenciar mais de um número de WhatsApp na plataforma. Oferecemos a flexibilidade necessária para atender às demandas de empresas com múltiplos canais de comunicação.",
  },
  {
    question: "Eu possuo suporte se necessário?",
    answer:
      "Sim, o Fortalk oferece suporte para ajudar você a resolver qualquer dúvida ou problema que possa surgir durante o uso da plataforma.",
  },
];

type FAQSectionProps = {
  onTrialClick?: () => void;
};

export function FAQSection({ onTrialClick }: FAQSectionProps) {
  return (
    <section id="faq" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Perguntas frequentes
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="bg-background rounded-lg px-6 border-none shadow-md"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white border-2 border-background">
                  👤
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white border-2 border-background">
                  👤
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white border-2 border-background">
                  👤
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Ainda tem dúvidas?</h3>
            <p className="text-muted-foreground mb-6">
              Não achou as respostas que estava procurando? Por favor, nos envie
              uma mensagem com sua dúvida que responderemos assim que possível.
            </p>
            {onTrialClick ? (
              <button
                type="button"
                onClick={onTrialClick}
                className="border-[1px] border-primary text-white bg-primary px-4 py-2 rounded-[12px] flex items-center justify-center text-sm font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Solicitar teste grátis
              </button>
            ) : (
              <a
                href="https://wa.link/sz2rwj"
                target="_blank"
                rel="noopener"
                className="border-[1px] border-primary text-white bg-primary px-4 py-2 rounded-[12px] flex items-center justify-center text-sm font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Entrar em contato
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
