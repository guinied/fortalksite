import type { Metadata } from "next";
import { CompactTrialRequestPage } from "@/components/CompactTrialRequestPage";

export const metadata: Metadata = {
  title: "Solicitar teste grátis | ForTalk",
  description:
    "Solicite seu teste grátis do ForTalk de forma rápida e objetiva.",
};

export default function RequestTrialPage() {
  return <CompactTrialRequestPage />;
}
