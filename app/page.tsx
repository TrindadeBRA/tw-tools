import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Link from "next/link";
import {
  UsersIcon,
  CheckBadgeIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "TW Tools - Ferramentas Online Gratuitas",
  description: 'Somos uma plataforma de ferramentas online para você criar, validar e gerar dados de forma rápida e fácil.',
};

const tools = [
  {
    name: 'Geradores',
    description: 'Ferramentas para gerar CPF, CNPJ, RG, CNH, cartão de crédito e outros dados aleatórios',
    href: '/geradores',
    icon: UsersIcon,
    color: 'bg-blue-50 text-blue-700',
    items: [
      { name: 'Gerador de CPF', href: '/geradores/cpf' },
      { name: 'Gerador de CNPJ', href: '/geradores/cnpj' },
      { name: 'Gerador de RG', href: '/geradores/rg' },
      { name: 'Gerador de CNH', href: '/geradores/cnh' },
      { name: 'Gerador de Cartão de Crédito', href: '/geradores/cartao-de-credito' },
    ]
  },
  {
    name: 'Validadores',
    description: 'Ferramentas para validar CPF, CNPJ, RG e outros documentos',
    href: '/validadores',
    icon: CheckBadgeIcon,
    color: 'bg-green-50 text-green-700',
    items: [
      { name: 'Validador de CPF', href: '/validadores/cpf' },
      { name: 'Validador de CNPJ', href: '/validadores/cnpj' },
      { name: 'Validador de RG', href: '/validadores/rg' },
    ]
  },
];

export default function Home() {
  return (
    <>
      <Header
        miniTitle="TW Tools"
        title="Ferramentas Online Gratuitas"
        description="Coleção de ferramentas online gratuitas para desenvolvedores e testadores. Geradores de dados, validadores, formatadores e muito mais."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((category) => (
          <div key={category.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">{category.name}</h3>
              </div>
              <p className="mt-4 text-gray-600">{category.description}</p>
              
              <div className="mt-6 space-y-2">
                {category.items.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="mt-6">
                <Link 
                  href={category.href} 
                  className="text-main-900 font-medium hover:text-main-800 flex items-center"
                >
                  Ver todas as ferramentas
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
