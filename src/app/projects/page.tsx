'use client';

import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

type Projeto = {
  id: number;
  titulo: string;
  descricao: string;
  tag?: string;
  selectedTasks: string[];
};

export default function ProjectsPage() {
  // Estados
  const [showAddModal, setShowAddModal] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [tasks, setTasks] = useState<any[]>([]); // array de objetos tarefa
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // Carregar só uma vez do localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("projetos");
      if (storedProjects) setProjetos(JSON.parse(storedProjects));
      const storedTasks = localStorage.getItem("tarefas");
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Salvar no localStorage ao mudar projetos
  useEffect(() => {
    if (typeof window !== "undefined" && projetos.length > 0) {
      localStorage.setItem("projetos", JSON.stringify(projetos));
    }
  }, [projetos]);

  // Salvar no localStorage ao mudar tarefas
  useEffect(() => {
    if (typeof window !== "undefined" && tasks.length > 0) {
      localStorage.setItem("tarefas", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Criar novo projeto
  function handleSaveProject(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const novoProjeto: Projeto = {
      id: Date.now(),
      titulo,
      descricao,
      tag,
      selectedTasks: [],
    };

    setProjetos(prev => [...prev, novoProjeto]);
    setTitulo("");
    setDescricao("");
    setTag("");
    setShowAddModal(false);
    setLoading(false);
  }

  // Deletar projeto
  function handleDelete(id: number) {
    setProjetos(prev => prev.filter(p => p.id !== id));
    if (selectedProjectId === id) setSelectedProjectId(null);
  }

  // Atualizar tarefas selecionadas do projeto
  function handleUpdateProjectTasks(projectId: number, newSelectedTasks: string[]) {
    setProjetos(prev =>
      prev.map(p =>
        p.id === projectId ? { ...p, selectedTasks: newSelectedTasks } : p
      )
    );
  }

  // Alternar expandir/recolher tarefas no card
  function toggleExpand(id: number) {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(eId => eId !== id) : [...prev, id]
    );
  }

  const selectedProject = projetos.find(p => p.id === selectedProjectId);

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black font-sans">
        <div className="flex-1 flex flex-col items-center gap-16 pt-6 px-4 md:px-24 sm:px-6 w-full">
          <Header />
          <main className="flex-1 flex flex-col items-start gap-4 w-full max-w-[1042px]">
            {projetos.length > 0 && (
              <section className="flex w-full items-start gap-4 flex-wrap md:flex-nowrap">
                <div className="flex w-full md:w-[803px] h-[51px] px-5 py-2.5 justify-between items-center gap-7 rounded-lg border border-[#212528] bg-white">
                  <input
                    type="text"
                    placeholder="Pesquise aqui"
                    className="grow border-none outline-none text-black text-lg font-medium placeholder:text-black/50"
                  />
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full md:w-[221px] h-[51px] bg-[#C3EC1D] text-black font-medium text-lg rounded-lg hover:opacity-90 transition"
                >
                  Adicionar projeto
                </button>
              </section>
            )}

            <section className="flex flex-col items-start gap-9 w-full">
              <h1 className="text-white font-medium text-[36px]">Projetos</h1>
              <div className="flex flex-col items-start gap-4 w-full">
                {projetos.length === 0 ? (
                  <div className="relative w-full flex flex-col items-center justify-center py-12 px-6 rounded-xl border-2 border-dashed border-[#303030] bg-[#0a0a0a]">
                    <div className="mb-4 text-5xl animate-bounce">📋</div>
                    <h2 className="text-white font-semibold text-xl mb-2 text-center">
                      Nenhum projeto criado ainda
                    </h2>
                    <p className="text-gray-400 text-base text-center max-w-md mb-6">
                      Que tal criar seu primeiro projeto?{' '}
                      <span className="text-[#C3EC1D] font-medium animate-pulse">
                        É rápido e fácil! ✨
                      </span>
                    </p>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="group relative px-6 py-3 bg-[#C3EC1D] text-black font-semibold text-base rounded-lg hover:scale-105 transition-all duration-300"
                    >
                      ➕ Criar Primeiro Projeto →
                    </button>
                  </div>
                ) : (
                  projetos.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-5 flex flex-col gap-2 w-full rounded-xl border border-gray-700 bg-[#303030] hover:border-[#C3EC1D] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedProjectId(proj.id)}
                    >
                      <div className="flex items-center w-full">
                        <h2 className="text-white font-semibold truncate">{proj.titulo}</h2>
                        <button
                          className="ml-auto text-red-400 hover:text-red-600 text-xl transition"
                          onClick={(e) => { e.stopPropagation(); handleDelete(proj.id); }}
                          title="Excluir projeto"
                        >
                          🗑️
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-3">{proj.descricao}</p>
                      {proj.tag && (
                        <span className="mt-1 inline-block text-[#C3EC1D] font-medium text-sm">#{proj.tag}</span>
                      )}

                      {proj.selectedTasks && proj.selectedTasks.length > 0 && (
                        <div className="mt-2 flex flex-col gap-1">
                          {(expandedIds.includes(proj.id)
                            ? proj.selectedTasks
                            : proj.selectedTasks.slice(0, 3)
                          ).map((taskId: string) => {
                            // Pega objeto da tarefa pra exibir nome e descrição
                            const taskObj = tasks.find(t => String(t.id) === String(taskId));
                            if (!taskObj) return null;
                            return (
                              <div key={taskObj.id} className="flex flex-col bg-[#171717] rounded p-2 mb-1">
                                <span className="font-medium text-[#C3EC1D] text-xs">{taskObj.titulo}</span>
                                {taskObj.descricao && (
                                  <span className="text-xs text-gray-400">{taskObj.descricao}</span>
                                )}
                              </div>
                            );
                          })}
                          {/* Mostrar reticências / expandir */}
                          {proj.selectedTasks.length > 3 && !expandedIds.includes(proj.id) && (
                            <button
                              className="mt-1 text-xs text-[#C3EC1D] hover:underline"
                              onClick={e => {
                                e.stopPropagation();
                                toggleExpand(proj.id);
                              }}
                            >
                              ...ver todas
                            </button>
                          )}
                          {/* Contrair */}
                          {proj.selectedTasks.length > 3 && expandedIds.includes(proj.id) && (
                            <button
                              className="mt-1 text-xs text-[#C3EC1D] hover:underline"
                              onClick={e => {
                                e.stopPropagation();
                                toggleExpand(proj.id);
                              }}
                            >
                              mostrar menos
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          </main>
        </div>

        {/* Modal adicionar projeto */}
        {showAddModal && (
          <>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-998" />
            <div className="fixed inset-0 flex items-center justify-center z-999">
              <div className="bg-[#191919] rounded-2xl shadow-xl px-8 py-10 w-[90vw] max-w-lg">
                <h2 className="mb-6 text-white text-center font-bold text-xl">
                  ADICIONAR PROJETO
                </h2>
                <form className="flex flex-col gap-4" onSubmit={handleSaveProject}>
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
                    placeholder="Tag (ex: Front, Back)"
                    value={tag}
                    onChange={e => setTag(e.target.value)}
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
                    onClick={() => setShowAddModal(false)}
                  >
                    CANCELAR
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {/* Modal selecionar tarefas do projeto */}
        {selectedProject && (
          <>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-998" />
            <div className="fixed inset-0 flex items-center justify-center z-999">
              <div className="bg-[#191919] rounded-2xl shadow-xl px-8 py-10 w-[90vw] max-w-lg">
                <h2 className="mb-6 text-white text-center font-bold text-xl">
                  Tarefas do Projeto: {selectedProject.titulo}
                </h2>
                <div className="mb-4">
                  <label className="text-white mb-2 block">
                    Selecione tarefas com <span className="text-[#C3EC1D]">#{selectedProject.tag}</span>
                  </label>
                  <div className="w-full min-h-[150px] max-h-64 bg-[#161616] rounded border border-[#212528] px-4 py-3 overflow-auto flex flex-col gap-2">
                    {tasks
                      .filter(taskObj =>
                        Array.isArray(taskObj.tags) &&
                        taskObj.tags.some(
                          tag => tag.toLowerCase() === `#${selectedProject.tag}`.toLowerCase()
                        )
                      )
                      .map((taskObj, idx) => (
                        <label key={idx} className="flex items-center gap-3 text-white cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedProject.selectedTasks?.includes(String(taskObj.id))}
                            onChange={() => {
                              const isSelected = selectedProject.selectedTasks?.includes(String(taskObj.id));
                              const newTasks = isSelected
                                ? selectedProject.selectedTasks.filter((t: string) => t !== String(taskObj.id))
                                : [...(selectedProject.selectedTasks || []), String(taskObj.id)];
                              // Aqui salva só o id das tarefas, mais seguro e estável.
                              handleUpdateProjectTasks(selectedProject.id, newTasks);
                            }}
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">{taskObj.titulo}</span>
                            <span className="text-gray-400 text-sm">{taskObj.descricao}</span>
                          </div>
                        </label>
                      ))}
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <button
                    type="button"
                    className="w-full h-11 rounded bg-[#C3EC1D] text-black font-semibold hover:opacity-90 transition"
                    onClick={() => setSelectedProjectId(null)}
                  >
                    Salvar seleção
                  </button>
                  <button
                    type="button"
                    className="w-full h-11 rounded bg-[#303030] text-white"
                    onClick={() => setSelectedProjectId(null)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
