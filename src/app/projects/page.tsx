'use client'

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function ProjectsPage() {
  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  // Lista de projetos
  const [projetos, setProjetos] = useState([]);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    // Simulando POST API
    try {
      // Adiciona o projeto direto no estado
      const novoProjeto = {
        id: Date.now(),
        titulo,
        descricao,
      };

      setProjetos(prev => [...prev, novoProjeto]);

      setTitulo("");
      setDescricao("");
      setShowModal(false);

      
      const res = await fetch("/api/projetos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao }),
      });

      if (!res.ok) {
        console.error("Erro ao salvar projeto");
      }
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);

    } finally {
      setLoading(false);
    }
  }

  // Deletar projeto
  function handleDelete(id) {
    setProjetos(prev => prev.filter(p => p.id !== id));
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black flex flex-col justify-between font-sans">

        <div className="flex flex-col items-center gap-16 pt-6 px-4 md:px-24 sm:px-6 flex-1 w-full">
          <Header />

          <main className="flex flex-col items-start gap-4 w-full max-w-[1042px]">

            <section className="flex w-full items-start gap-4 flex-wrap md:flex-nowrap">
              <div className="flex w-full md:w-[803px] h-[51px] px-5 py-2.5 justify-between items-center gap-7 rounded-lg border border-[#212528] bg-white">
                <input
                  type="text"
                  placeholder="Pesquise aqui"
                  className="grow border-none outline-none text-black text-lg font-medium placeholder:text-black/50"
                />
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full md:w-[221px] h-[51px] bg-[#C3EC1D] text-black font-medium text-lg rounded-lg hover:opacity-90 transition"
              >
                Adicionar projeto
              </button>
            </section>

            <section className="flex flex-col items-start gap-9 w-full">
              <h1 className="text-white font-medium text-[36px]">Projetos</h1>

              <div className="flex flex-col items-start gap-4 w-full">

                {projetos.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-7 flex flex-col gap-2.5 w-full rounded-lg border border-[#303030] bg-[#121212] hover:border-[#C3EC1D] transition"
                  >
                    <div className="flex items-center w-full">
                      <h2 className="text-white font-semibold text-[27px]">{proj.titulo}</h2>
                      <button
                        className="ml-auto text-red-400 hover:text-red-600 text-xl transition"
                        onClick={() => handleDelete(proj.id)}
                        title="Excluir projeto"
                      >
                        🗑️
                      </button>
                    </div>
                    <p className="text-gray-400 text-base">{proj.descricao}</p>
                  </div>
                ))}

              </div>
            </section>
          </main>
        </div>

        <Footer />

        {/* Overlay */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998" />
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-999">
            <div className="bg-[#191919] rounded-2xl shadow-xl px-8 py-10 w-[90vw] max-w-lg">

              <h2 className="mb-6 text-white text-center font-bold text-xl">
                ADICIONAR PROJETO
              </h2>

              <form className="flex flex-col gap-4" onSubmit={handleSave}>
                <input
                  type="text"
                  placeholder="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-white text-black"
                  required
                />

                <textarea
                  placeholder="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full px-4 py-2 rounded h-24 resize-none bg-white text-black"
                  required
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
        )}
      </div>
    </ProtectedRoute>
  );
}
