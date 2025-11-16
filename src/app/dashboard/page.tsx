"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useTasks } from "@/hooks/useTasks";

export default function DashboardPage() {
  const { tasks, status, error } = useTasks();

  return (
    <ProtectedRoute>
      <main className="min-h-dvh bg-[#0b0b0b] text-zinc-50 px-6 py-10">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-2 text-zinc-400">
            Bem-vinda ao FOCO. Aqui vai ficar a gestão de tarefas da aplicação.
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
            {status === "loading" && (
              <p className="text-sm text-zinc-400">Carregando tarefas...</p>
            )}

            {status === "err" && (
              <p className="text-sm text-red-400">
                    {error === "Falha ao carregar tarefas"
                      ? "Não foi possível carregar suas tarefas. Verifique se você está autenticada no sistema."
                      : `Erro ao carregar tarefas: ${error}`}
              </p>
            )}

            {status === "ok" && tasks.length === 0 && (
              <p className="text-sm text-zinc-400">
                Você ainda não tem tarefas cadastradas.
              </p>
            )}

            {status === "ok" && tasks.length > 0 && (
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-sm"
                  >
                    <div className="font-medium">{task.title}</div>

                    {task.description && (
                      <p className="text-xs text-zinc-400">
                        {task.description}
                      </p>
                    )}

                    <p className="mt-1 text-[11px] uppercase text-zinc-500">
                      {task.completed ? "Concluída" : "Pendente"} · Prioridade:{" "}
                      {task.priority}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
