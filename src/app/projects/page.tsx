import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Image from "next/image";

export default function ProjectsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black flex flex-col justify-between font-sans">
        <div className="flex flex-col items-center gap-16 pt-6 px-20 md:px-24 sm:px-6 flex-1 w-full">
          <Header />

          <main className="flex flex-col items-start gap-4 w-full max-w-[1042px]">
            <section className="flex w-full items-start gap-4 flex-wrap md:flex-nowrap">
              <div className="flex w-[803px] max-w-full h-[51px] px-5 py-2.5 justify-between items-center gap-7 rounded-lg border border-[#212528] bg-white grow">
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    placeholder="Pesquise aqui"
                    className="grow border-none outline-none text-black text-lg font-medium placeholder:text-black/50 font-barlow"
                  />

                </div>
              </div>
              <button className="w-[221px] max-w-full h-[51px] bg-[#C3EC1D] text-black font-barlow font-medium text-lg rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition">
                Adicionar projeto
              </button>
            </section>

            <section className="flex flex-col items-start gap-9 w-full">
              <h1 className="w-full text-white font-barlow font-medium text-[36px] m-0">
                Projetos
              </h1>
              <div className="flex flex-col items-start gap-9 w-full">
                <div className="flex min-w-[222px] p-7 flex-col items-start gap-2.5 w-full rounded-lg border border-[#303030] bg-[#121212] cursor-pointer transition-colors duration-200 hover:border-[#C3EC1D]">
                  <h2 className="text-white font-sans font-semibold text-[27px] leading-9 m-0">
                    Estudo de ingês
                  </h2>
                  <p className="text-gray-400 font-sans font-normal text-base leading-5 m-0">
                    Minhas tarefas para estudo de inglês
                  </p>
                </div>
                <div className="flex min-w-[222px] p-7 flex-col items-start gap-2.5 w-full rounded-lg border border-[#303030] bg-[#121212] cursor-pointer transition-colors duration-200 hover:border-[#C3EC1D]">
                  <h2 className="text-white font-sans font-semibold text-[27px] leading-9 m-0">
                    Trabalho
                  </h2>
                  <p className="text-gray-400 font-sans font-normal text-base leading-5 m-0">
                    Tarefas do trabalho PJ
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
