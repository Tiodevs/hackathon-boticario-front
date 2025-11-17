"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useTasks } from "@/hooks/useTasks";
import { fetchProjects, createProject } from "@/util/tasks";

export default function DashboardPage() {
  const { tasks, isLoading, error, createTask, toggleTaskCompleted } =
    useTasks();

  async function resolveDefaultProjectId(): Promise<string | null> {
    try {
      // 1) se já temos tarefas, reaproveita o projectId da primeira
      if (tasks && tasks.length > 0) {
        return tasks[0].projectId;
      }

      // 2) tenta buscar projetos existentes
      const projects = await fetchProjects();
      if (projects.length > 0) {
        return projects[0].id;
      }

      // 3) se ainda não tiver nada, cria um projeto padrão
      const created = await createProject({
        name: "Projeto Padrão",
        description: "Projeto criado automaticamente pelo Dashboard",
        color: "#4ade80",
      });

      return created.id;
    } catch (err) {
      console.error("[FOCO] Erro ao resolver projectId padrão:", err);
      return null;
    }
  }

  async function handleCreateDemoTask() {
    try {
      const projectId = await resolveDefaultProjectId();

      if (!projectId) {
        alert(
          "Não foi possível obter um projectId válido para criar a tarefa de teste. Verifique com o time de backend."
        );
        return;
      }

      await createTask({
        title: "Nova tarefa de teste",
        description: "Criada pelo botão provisório no Dashboard",
        projectId,
      });
    } catch (err) {
      console.error("[FOCO] Dashboard.handleCreateDemoTask: erro", err);
      alert("Erro ao criar tarefa de teste. Veja o console para detalhes.");
    }
  }

  async function handleToggleCompleted(id: string, currentCompleted: boolean) {
    try {
      await toggleTaskCompleted(id, !currentCompleted);
    } catch (err) {
      console.error("[FOCO] Dashboard.handleToggleCompleted: erro", err);
    }
  }

  return (
    <ProtectedRoute>
      <main className="min-h-dvh bg-[#0b0b0b] text-zinc-50 px-6 py-10">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-2 text-zinc-400">
            Bem-vinda ao FOCO. Aqui fica a gestão de tarefas integrada com o
            backend real.
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-zinc-400">
                Este painel está usando a API real de tarefas. Você pode criar
                uma tarefa de teste e marcar como concluída.
              </p>

              <button
                onClick={handleCreateDemoTask}
                className="px-4 py-2 rounded-lg bg-lime-400 text-black text-sm font-semibold hover:bg-lime-300 transition"
              >
                Criar tarefa de teste
              </button>
            </div>

            {isLoading && (
              <p className="text-sm text-zinc-400">Carregando tarefas...</p>
            )}

            {!isLoading && error && (
              <p className="text-sm text-red-400">
                Erro ao comunicar com a API: {error}
              </p>
            )}

            {!isLoading && !error && tasks.length === 0 && (
              <p className="text-sm text-zinc-400">
                Você ainda não tem tarefas cadastradas.
              </p>
            )}

            {!isLoading && !error && tasks.length > 0 && (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3"
                  >
                    <div>
                      <p
                        className={
                          task.completed
                            ? "text-zinc-500 line-through"
                            : "text-zinc-50"
                        }
                      >
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-xs text-zinc-400">
                          {task.description}
                        </p>
                      )}
                      <p className="mt-1 text-[11px] text-zinc-500">
                        Prioridade:{" "}
                        <span className="font-semibold">
                          {task.priority ?? "—"}
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleToggleCompleted(task.id, task.completed)
                      }
                      className="px-3 py-1 rounded-lg text-xs font-semibold border border-zinc-700 hover:bg-zinc-800 transition"
                    >
                      {task.completed ? "Reabrir" : "Concluir"}
                    </button>
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
