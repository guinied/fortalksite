"use client";

import { CreditCardIcon, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStripe } from "@/app/hooks/useStripe";
import { useAuth } from "@/contexts/authContext";
import { Button } from "./ui/button";

type HeaderProps = {
  onTrialClick?: () => void;
};

export function Header({ onTrialClick }: HeaderProps) {
  const { user } = useAuth();

  const { handleCreateStripePortal } = useStripe();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/fortalkLogoWhite.png"
              alt="Logo Fortalk"
              width={112}
              height={38}
              className="w-28"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="hover:opacity-80 transition-opacity">
              Home
            </a>
            <a href="#recursos" className="hover:opacity-80 transition-opacity">
              Recursos
            </a>
            <a
              href="#depoimentos"
              className="hover:opacity-80 transition-opacity"
            >
              Depoimentos
            </a>
            <a href="#faq" className="hover:opacity-80 transition-opacity">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-4 flex-wrap">
            {onTrialClick ? (
              <button
                type="button"
                onClick={onTrialClick}
                className="hidden md:inline-flex items-center justify-center py-2 px-4 rounded-[8px] bg-white text-primary hover:bg-white/90 font-semibold transition-colors"
              >
                Teste grátis
              </button>
            ) : (
              <Link
                href="/teste-gratis"
                className="hidden md:inline-flex items-center justify-center py-2 px-4 rounded-[8px] bg-white text-primary hover:bg-white/90 font-semibold transition-colors"
              >
                Teste grátis
              </Link>
            )}
            {user ? (
              <Link
                href="https://login.fortalk.app.br/"
                className="appearance-none flex items-center justify-center py-2 px-4 border-[1px] rounded-[8px] border-white text-white bg-primary hover:bg-white/10"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Ir para a Dashboard
              </Link>
            ) : (
              <Link
                href="https://login.fortalk.app.br/"
                className="appearance-none flex items-center justify-center py-2 px-4 border-[1px] rounded-[8px] border-white text-white bg-primary hover:bg-white/10"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Link>
            )}

            {user && (
              <Button
                onClick={() =>
                  handleCreateStripePortal({
                    user,
                    token: localStorage.getItem("token"),
                  })
                }
                className="bg-white flex items-center justify-center !py-5 px-4 border-[1px] rounded-[8px] border-primary text-primary hover:bg-white/90 hover:cursor-pointer"
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Assinatura
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
