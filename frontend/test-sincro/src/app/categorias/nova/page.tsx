"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function NovaCategoriaPage() {
  const router = useRouter(); // Usado para redirecionar o usuário após salvar

  // Estados para guardar o que o usuário digita nos campos
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  // Função que roda quando o usuário clica em "Salvar"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    // Requisito de UX: Validação de campos obrigatórios
    if (!nome.trim() || !descricao.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      // Faz o POST para o Spring Boot
      await api.post("/categories", { nome, descricao });
      toast.success("Categoria criada com sucesso!");
      router.push("/categorias"); // Volta para a lista de categorias
    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || "Erro ao criar categoria.";
      toast.error(mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link
        href="/"
        className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#1e1e1e] hover:border-gray-500 hover:text-white transition-all mb-6"
      >
        Cancelar
      </Link>

      <h1 className="text-3xl font-bold text-white mb-8">Nova Categoria</h1>

      <form onSubmit={handleSubmit} className="bg-[#1e1e1e] border border-gray-800 p-6 rounded-xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Nome *</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Ex: Eletrônicos"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Descrição *</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
            placeholder="Descreva esta categoria..."
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
          >
            {loading ? "Salvando..." : "Salvar Categoria"}
          </button>
        </div>
      </form>
    </div>
  );
}