"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface Categoria {
    id: number;
    nome: string;
}

export default function EditarItemPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [nome, setNome] = useState("");
    const [sku, setSku] = useState("");
    const [quantidade, setQuantidade] = useState<number | "">("");
    const [preco, setPreco] = useState<number | "">("");
    const [categoriaId, setCategoriaId] = useState("");
    const [status, setStatus] = useState("ATIVO");

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loadingForm, setLoadingForm] = useState(false);
    const [loadingDados, setLoadingDados] = useState(true);

    // Busca as categorias e os dados do item simultaneamente
    useEffect(() => {
        const carregarDados = async () => {
            try {
                // Promise.all executa as duas requisições ao mesmo tempo
                const [resCategorias, resItem] = await Promise.all([
                    api.get("/categories"),
                    api.get(`/items/${id}`)
                ]);

                setCategorias(resCategorias.data);

                // Preenche o formulário com os dados que vieram do banco
                const item = resItem.data;
                setNome(item.nome);
                setSku(item.sku);
                setQuantidade(item.quantidade);
                setPreco(item.preco);
                setStatus(item.status);

                // Garante que o ID da categoria seja setado corretamente no select
                if (item.categoria && item.categoria.id) {
                    setCategoriaId(String(item.categoria.id));
                }

            } catch (error) {
                toast.error("Erro ao carregar os dados do item.");
                router.push("/itens"); // Volta pra lista se der erro (ex: ID não existe)
            } finally {
                setLoadingDados(false);
            }
        };

        if (id) {
            carregarDados();
        }
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome.trim() || !sku.trim() || quantidade === "" || preco === "" || !categoriaId) {
            toast.error("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setLoadingForm(true);
        try {
            const payload = {
                nome,
                sku,
                quantidade: Number(quantidade),
                preco: Number(preco),
                status,
                categoria: {
                    id: Number(categoriaId)
                }
            };

            // Faz o PUT para atualizar
            await api.put(`/items/${id}`, payload);
            toast.success("Item atualizado com sucesso!");
            router.push("/itens");
        } catch (error: any) {
            const mensagemErro = error.response?.data?.message || "Erro ao atualizar o item.";
            toast.error(mensagemErro);
        } finally {
            setLoadingForm(false);
        }
    };

    // Mostra um aviso enquanto as requisições iniciais estão acontecendo
    if (loadingDados) {
        return <div className="text-center text-gray-400 py-20">Carregando dados do item...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#1e1e1e] hover:border-gray-500 hover:text-white transition-all mb-6"
            >
                Cancelar
            </Link>

            <h1 className="text-3xl font-bold text-white mb-8">Editar Item</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Coluna da Esquerda (Maior) */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-[#1e1e1e] border border-gray-800 p-6 rounded-xl">
                        <h2 className="text-lg font-semibold text-white mb-4">Informações Básicas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Nome *</label>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">SKU / Código *</label>
                                <input
                                    type="text"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1e1e1e] border border-gray-800 p-6 rounded-xl">
                        <h2 className="text-lg font-semibold text-white mb-4">Classificação</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Categoria *</label>
                            <select
                                value={categoriaId}
                                onChange={(e) => setCategoriaId(e.target.value)}
                                className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            >
                                <option value="" disabled>Selecione uma categoria...</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="bg-[#1e1e1e] border border-gray-800 p-6 rounded-xl">
                        <h2 className="text-lg font-semibold text-white mb-4">Estoque e Preço</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Quantidade *</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value ? Number(e.target.value) : "")}
                                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Preço Unitário (R$) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value ? Number(e.target.value) : "")}
                                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Coluna da Direita (Menor) */}
                <div className="space-y-6">

                    <div className="bg-[#1e1e1e] border border-gray-800 p-6 rounded-xl">
                        <h2 className="text-lg font-semibold text-white mb-4">Status</h2>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        >
                            <option value="ATIVO">Ativo</option>
                            <option value="INATIVO">Inativo</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loadingForm}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-bold transition-colors text-lg"
                    >
                        {loadingForm ? "Atualizando..." : "Atualizar Item"}
                    </button>

                </div>
            </form>
        </div>
    );
}