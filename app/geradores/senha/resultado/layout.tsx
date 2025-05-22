import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resultado | Gerador de Senhas Seguras - TW Tools",
  description: "Suas senhas seguras foram geradas. Copie e utilize-as para proteger suas contas online.",
};

export default function ResultadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 