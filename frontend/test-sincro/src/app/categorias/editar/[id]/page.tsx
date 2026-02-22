"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function EditarCategoriaPage() {
  const router = useRouter();
  const params = useParams(); // Pega o ID que está na URL
  const id = params.id;

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingDados, setLoadingDados] = useState(true);

  // Busca os dados da categoria antiga assim que a tela abre
  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await api.get(`/categories/${id}`);
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
      } catch (error) {
        toast.error("Erro ao carregar dados da categoria.");
        router.push("/categorias"); // Se não achar a categoria, expulsa de volta pra lista
      } finally {
        setLoadingDados(false);
      }
    };

    if (id) {
      fetchCategoria();
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !descricao.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoadingForm(true);
    try {
      // Faz o PUT para atualizar os dados
      await api.put(`/categories/${id}`, { nome, descricao });
      toast.success("Categoria atualizada com sucesso!");
      router.push("/categorias");
    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || "Erro ao atualizar categoria.";
      toast.error(mensagemErro);
    } finally {
      setLoadingForm(false);
    }
  };

  if (loadingDados) {
    return <div className="text-center text-gray-400 py-20">Carregando dados...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link
        href="/"
        className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#1e1e1e] hover:border-gray-500 hover:text-white transition-all mb-6"
      >
        Cancelar
      </Link>

      <h1 className="text-3xl font-bold text-white mb-8">Editar Categoria</h1>

      <form onSubmit={handleSubmit} className="bg-[#1e1e1e] border border-gray-800 p-6 rounded-xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Nome *</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Descrição *</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loadingForm}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
          >
            {loadingForm ? "Atualizando..." : "Atualizar Categoria"}
          </button>
        </div>
      </form>
    </div>
  );
}