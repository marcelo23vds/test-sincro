"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/services/api";
import Link from "next/link";
import toast from "react-hot-toast";

// Interfaces para o TypeScript saber o formato dos dados
interface Categoria {
  id: number;
  nome: string;
}

interface Item {
  id: number;
  nome: string;
  sku: string;
  quantidade: number;
  preco: number;
  status: string;
  categoria: Categoria;
}

export default function ItensPage() {
  const [itens, setItens] = useState<Item[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");

  // Função para buscar as categorias (para o filtro funcionar)
  const fetchCategorias = async () => {
    try {
      const response = await api.get("/categories");
      setCategorias(response.data);
    } catch (error) {
      toast.error("Erro ao carregar as categorias para o filtro.");
    }
  };

  // Função para buscar os itens (com ou sem filtro)
  const fetchItens = useCallback(async () => {
    setLoading(true);
    try {
      // Se houver um filtro selecionado, adiciona o parâmetro na URL
      const url = filtroCategoria ? `/items?categoriaId=${filtroCategoria}` : "/items";
      const response = await api.get(url);
      setItens(response.data);
    } catch (error) {
      toast.error("Erro ao carregar os itens.");
    } finally {
      setLoading(false);
    }
  }, [filtroCategoria]);

  // Carrega as categorias apenas uma vez quando a página abre
  useEffect(() => {
    fetchCategorias();
  }, []);

  // Carrega os itens sempre que a página abre ou o filtro muda
  useEffect(() => {
    fetchItens();
  }, [fetchItens]);

  // Função para apagar um item
  const handleDelete = async (id: number) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este item?");
    if (!confirmacao) return;

    try {
      await api.delete(`/items/${id}`);
      toast.success("Item eliminado com sucesso!");
      setItens(itens.filter((item) => item.id !== id));
    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || "Erro ao excluir o item.";
      toast.error(mensagemErro);
    }
  };

  // Função auxiliar para formatar o preço para a moeda Real
  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(preco);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#1e1e1e] hover:border-gray-500 hover:text-white transition-all mb-6"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold text-white">Itens do Inventário</h1>
        </div>

        <Link
          href="/itens/novo"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          + Novo Item
        </Link>
      </div>

      {/* Barra de Filtro */}
      <div className="bg-[#1e1e1e] border border-gray-800 p-4 rounded-xl mb-6 flex items-center gap-4">
        <label className="text-gray-300 font-medium">Filtrar por Categoria:</label>
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 flex-1 sm:flex-none sm:w-64"
        >
          <option value="">Todas as Categorias</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Itens */}
      {loading ? (
        <div className="text-center text-gray-400 py-10">A carregar itens...</div>
      ) : itens.length === 0 ? (
        <div className="text-center text-gray-400 bg-[#1e1e1e] border border-gray-800 p-10 rounded-xl">
          Nenhum item encontrado.
        </div>
      ) : (
        <div className="grid gap-4">
          {itens.map((item) => (
            <div
              key={item.id}
              className="bg-[#1e1e1e] border border-gray-800 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-semibold text-white">{item.nome}</h2>
                  {/* Badge de Status */}
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'ATIVO'
                      ? 'bg-green-900/50 text-green-400 border border-green-800'
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 mt-2">
                  <p><span className="text-gray-500">SKU:</span> {item.sku}</p>
                  <p><span className="text-gray-500">Qtd:</span> {item.quantidade}</p>
                  <p><span className="text-gray-500">Preço:</span> <strong className="text-gray-300">{formatarPreco(item.preco)}</strong></p>
                  <p><span className="text-gray-500">Categoria:</span> {item.categoria?.nome}</p>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                <Link
                  href={`/itens/editar/${item.id}`}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm text-white transition-colors flex-1 text-center"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-900/50 hover:bg-red-600 text-red-200 hover:text-white px-4 py-2 rounded text-sm transition-colors border border-red-800 flex-1"
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