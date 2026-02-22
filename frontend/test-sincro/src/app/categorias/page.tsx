"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import Link from "next/link";
import toast from "react-hot-toast";

// Definindo o "molde" (interface) da Categoria
interface Categoria {
  id: number;
  nome: string;
  descricao: string;
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar as categorias do Spring Boot
  const fetchCategorias = async () => {
    try {
      const response = await api.get("/categories");
      setCategorias(response.data);
    } catch (error) {
      toast.error("Erro ao carregar as categorias.");
    } finally {
      setLoading(false); // Desliga o loading independente de dar certo ou errado
    }
  };

  // O useEffect roda a função fetchCategorias assim que a tela abre
  useEffect(() => {
    fetchCategorias();
  }, []);

  // Função para deletar uma categoria
  const handleDelete = async (id: number) => {
    // Requisito de UX: Confirmação antes de deletar
    const confirmacao = window.confirm("Tem certeza que deseja deletar esta categoria?");
    if (!confirmacao) return;

    try {
      await api.delete(`/categories/${id}`);
      toast.success("Categoria deletada com sucesso!");
      // Atualiza a lista tirando a categoria deletada
      setCategorias(categorias.filter((cat) => cat.id !== id));
    } catch (error: any) {
      // Pega mensagem de erro 400 configurada no backend
      const mensagemErro = error.response?.data?.message || "Erro ao deletar categoria.";
      toast.error(mensagemErro);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">

      {/* Cabeçalho da página */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#1e1e1e] hover:border-gray-500 hover:text-white transition-all mb-6"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold text-white">Categorias</h1>
        </div>

        {/* Botão de Nova Categoria */}
        <Link
          href="/categorias/nova"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Nova Categoria
        </Link>
      </div>

      {/* Requisito de UX: Loading */}
      {loading ? (
        <div className="text-center text-gray-400 py-10">Carregando categorias...</div>
      ) : categorias.length === 0 ? (
        <div className="text-center text-gray-400 bg-[#1e1e1e] border border-gray-800 p-10 rounded-xl">
          Nenhuma categoria encontrada.
        </div>
      ) : (
        /* Lista de Categorias */
        <div className="grid gap-4">
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="bg-[#1e1e1e] border border-gray-800 p-6 rounded-xl flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-white">{categoria.nome}</h2>
                <p className="text-gray-400 text-sm mt-1">{categoria.descricao}</p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/categorias/editar/${categoria.id}`}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-sm text-white transition-colors"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(categoria.id)}
                  className="bg-red-900/50 hover:bg-red-600 text-red-200 hover:text-white px-3 py-1.5 rounded text-sm transition-colors border border-red-800"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}