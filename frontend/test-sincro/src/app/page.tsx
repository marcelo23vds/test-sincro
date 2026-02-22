"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-gray-200 flex flex-col items-center justify-center p-8">
      
      {/* Título Principal */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Painel de gerenciamento
        </h1>
      </div>

      {/* Cartões de Navegação (Menu) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        
        {/* Cartão de Categorias */}
        <Link 
          href="/categorias" 
          className="bg-[#1e1e1e] border border-gray-800 p-8 rounded-xl hover:border-blue-500 transition-all group flex flex-col items-center cursor-pointer"
        >
          <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-400">
            Categorias
          </h2>
        </Link>

        {/* Cartão de Itens */}
        <Link 
          href="/itens" 
          className="bg-[#1e1e1e] border border-gray-800 p-8 rounded-xl hover:border-blue-500 transition-all group flex flex-col items-center cursor-pointer"
        >
          <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-400">
            Itens
          </h2>
        </Link>

      </div>
    </main>
  );
}