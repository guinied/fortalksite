import { Button } from "./ui/button";

export function ManagmentSection() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Gestão Simplificada
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Acompanhe o atendimento de sua empresa de onde estiver e quando
            precisar
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            O ForTalk é economia de tempo para o gestor que contrata, para o
            funcionário que utiliza e para o cliente que é atendido
          </p>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="aspect-video  rounded-lg flex items-center justify-center">
            <div className="text-center">
              <img src="/4.webp" alt="Interface de Gestão" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
