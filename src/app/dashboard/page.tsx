import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
    <main className="min-h-dvh bg-[#0b0b0b] text-zinc-50 px-6 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-zinc-400">
          Bem-vinda ao FOCO. Aqui vai ficar a gestão de tarefas da aplicação.
        </p>

        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-sm text-zinc-400">
            (Placeholder) Em breve: lista de tarefas, filtros, resumo do dia, etc.
          </p>
        </div>
      </div>
    </main>
    </ProtectedRoute>
  );
}
