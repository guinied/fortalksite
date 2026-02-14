import Image from "next/image";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section
      id="home"
      className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto mb-12 mt-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            Chegou a hora de organizar e aprimorar{" "}
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              o atendimento da sua empresa
            </span>
          </h1>
          <p
            className="text-xl text-muted-foreground mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            A ForTalk centraliza o atendimento da sua empresa de forma
            organizada, fácil e o melhor de tudo, juntando WhatsApp e Instagram
            em uma única plataforma.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#pricingSection"
              className="text-md font-semibold px-8 bg-primary text-white rounded-lg py-3 shadow-lg shadow-primary/20 transition-all hover:scale-105"
            >
              Ver planos
            </a>
          </div>
        </div>

        <div
          className="relative max-w-6xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="relative aspect-video overflow-hidden backdrop-blur-sm hover:scale-[1.02] transition-transform duration-500">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <img
                src="/fortalkInterfaceImage.webp"
                alt="Interface ForTalk"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
