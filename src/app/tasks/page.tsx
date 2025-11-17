'use client';
import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function TasksPage() {
  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tags, setTags] = useState("");
  const [dataConclusao, setDataConclusao] = useState("");
  const [loading, setLoading] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  // Carrega tarefas do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("tarefas");
    if (saved) {
      setTarefas(JSON.parse(saved));
    }
  }, []);

  // Função para atualizar estado + localStorage
  const salvarTarefas = (novaLista) => {
    setTarefas(novaLista);
    localStorage.setItem("tarefas", JSON.stringify(novaLista));
  };

  async function handleSave(e) {
  e.preventDefault();
  setLoading(true);

  // Normaliza as tags para que sempre tenham o formato #tag, mesmo que o usuário digite só "Front"
  const tagsProcessadas = tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t !== "")
    .map((t) => t.startsWith("#") ? t : `#${t}`);

  const novaTarefa = {
    id: Date.now(),
    titulo,
    descricao,
    tags: tagsProcessadas,
    dataConclusao
  };

  // Salva localmente e no backend normalmente
  salvarTarefas([...tarefas, novaTarefa]);

  setTitulo("");
  setDescricao("");
  setTags("");
  setDataConclusao("");
  setShowModal(false);

  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTarefa),
    });
    if (!res.ok) console.error("Erro ao salvar tarefa no backend");
  } catch (error) {
    console.error("Erro ao salvar tarefa no backend:", error);
  } finally {
    setLoading(false);
  }
}


  function handleDelete(id) {
    const novaLista = tarefas.filter(t => t.id !== id);
    salvarTarefas(novaLista);

    // Deleta no backend sem bloquear UI
    fetch(`/api/tasks/${id}`, { method: "DELETE" }).catch(console.error);
  }

  const allTags = Array.from(
    new Set(tarefas.flatMap(t => t.tags || []).filter(t => t && t.trim() !== ""))
  );

  const tarefasFiltradas = selectedTag
    ? tarefas.filter(t => t.tags?.includes(selectedTag))
    : tarefas;

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black flex flex-col font-sans">
        <div className="flex flex-col items-center gap-16 pt-6 px-4 md:px-24 sm:px-6 flex-1 w-full">
          <Header />

          <main className="flex flex-col items-start gap-4 w-full max-w-[1042px]">

            {tarefas.length > 0 && (
              <section className="flex w-full items-center gap-4 mb-4">
                <select
                  value={selectedTag}
                  onChange={e => setSelectedTag(e.target.value)}
                  className="px-3 h-[40px] rounded-lg border border-[#212528] bg-white text-black text-sm"
                >
                  <option value="">Filtrar por tag</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
                <button
                  onClick={() => setShowModal(true)}
                  className="h-[40px] px-6 bg-[#C3EC1D] text-black font-medium text-base rounded-lg hover:opacity-90 transition w-auto"
                >
                  Adicionar tarefa
                </button>
              </section>
            )}

            <section className="flex flex-col items-start gap-9 w-full">
              <h1 className="text-white font-medium text-[36px]">Tarefas</h1>

              <div className="w-full">
                {tarefasFiltradas.length === 0 ? (
                  <div className="relative w-full flex flex-col items-center justify-center py-12 px-6 rounded-xl border-2 border-dashed border-[#303030] bg-[#0a0a0a]">
                    <div className="mb-4 text-5xl animate-bounce">📋</div>
                    <h2 className="text-white font-semibold text-xl mb-2 text-center">
                      Nenhuma tarefa criada ainda
                    </h2>
                    <p className="text-gray-400 text-base text-center max-w-md mb-6">
                      Que tal criar sua primeira tarefa?{' '}
                      <span className="text-[#C3EC1D] font-medium animate-pulse">
                        É rápido e fácil! ✨
                      </span>
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                      <span>💡</span>
                      <span>Use tarefas para organizar seu trabalho</span>
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="group relative px-6 py-3 bg-[#C3EC1D] text-black font-semibold text-base rounded-lg hover:scale-105 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        ➕ Criar Primeira Tarefa
                        <span className="inline-block group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </span>
                    </button>
                    <div className="absolute top-2 right-2 text-[#C3EC1D]/10 text-4xl">✨</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
                    {tarefasFiltradas.map(tarefa => (
                      <div
                        key={tarefa.id}
                        className="flex flex-col justify-between p-3 min-h-[80px] rounded-xl border border-[#303030] bg-[#121212] hover:border-[#C3EC1D] transition shadow max-w-xs w-full mx-auto"
                      >
                        <div className="flex items-center mb-1">
                          <h2 className="text-[#C3EC1D] font-medium text-base truncate">{tarefa.titulo}</h2>
                          <button
                            className="ml-auto text-[#C3EC1D] hover:text-[#A3D90E] text-lg"
                            onClick={() => handleDelete(tarefa.id)}
                            title="Excluir tarefa"
                          >
                            🗑️
                          </button>
                        </div>
                        <p className="text-gray-400 text-xs truncate">{tarefa.descricao}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tarefa.tags && tarefa.tags.map((tag, idx) => (
                            <span key={idx} className="bg-[#C3EC1D]/30 text-[#C3EC1D] text-xs px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                          {tarefa.dataConclusao && (
                            <span className="text-gray-400 text-xs ml-2">até {tarefa.dataConclusao}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </main>

          {showModal && (
            <>
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-998" />
              <div className="fixed inset-0 flex items-center justify-center z-999">
                <div className="bg-[#191919] rounded-2xl shadow-xl px-8 py-10 w-[90vw] max-w-lg">
                  <h2 className="mb-6 text-white text-center font-bold text-xl">ADICIONAR TAREFA</h2>
                  <form className="flex flex-col gap-4" onSubmit={handleSave}>
                    <input
                      type="text"
                      placeholder="Título"
                      value={titulo}
                      onChange={e => setTitulo(e.target.value)}
                      className="w-full px-4 py-2 rounded bg-white text-black"
                      required
                    />
                    <textarea
                      placeholder="Descrição"
                      value={descricao}
                      onChange={e => setDescricao(e.target.value)}
                      className="w-full px-4 py-2 rounded h-24 resize-none bg-white text-black"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Tags (separe por vírgula)"
                      value={tags}
                      onChange={e => setTags(e.target.value)}
                      className="w-full px-4 py-2 rounded bg-white text-black"
                    />
                    <input
                      type="date"
                      placeholder="Data de conclusão"
                      value={dataConclusao}
                      onChange={e => setDataConclusao(e.target.value)}
                      className="w-full px-4 py-2 rounded bg-white text-black"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-11 rounded bg-[#C3EC1D] text-black hover:opacity-90 transition"
                    >
                      {loading ? "Salvando..." : "SALVAR"}
                    </button>
                    <button
                      type="button"
                      className="w-full h-11 rounded bg-[#303030] text-white"
                      onClick={() => setShowModal(false)}
                    >
                      CANCELAR
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
