import { Metadata } from "next";
import CPFGeneratorClient from "../../../src/components/layout/generator/cpf";

export const metadata: Metadata = {
    title: "TW Tools - Gerador de CPF",
    description: "Gerador de CPF",
};

export default function CPFGenerator() {
    return <CPFGeneratorClient />
}