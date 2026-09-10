import type { Metadata } from "next";
import { TrialRequestPage } from "@/components/TrialRequestPage";

export const metadata: Metadata = {
  title: "Teste grátis | ForTalk",
  description:
    "Solicite um teste grátis do ForTalk e descubra a configuração ideal para organizar o atendimento da sua empresa.",
};

export default function FreeTrialPage() {
  return <TrialRequestPage />;
}
