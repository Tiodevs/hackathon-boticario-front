const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://campeonato-boticario-back-production-3891.up.railway.app";

const AUTH_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

console.log("[FOCO] API_BASE_URL:", API_BASE_URL);
console.log(
  "[FOCO] AUTH_TOKEN está definido?",
  AUTH_TOKEN ? "SIM" : "NÃO (undefined)"
);

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: TaskPriority;
  dueDate?: string | null;
  projectId: string;
};

export async function fetchTasks(): Promise<Task[]> {
  const url = `${API_BASE_URL}/api/tasks?page=1&limit=10`;

  console.log("[FOCO] Chamando endpoint de tarefas:", url);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const bodyText = await res.text().catch(() => "<sem body>");
    console.error(
      "[FOCO] Erro ao carregar /api/tasks",
      "status:",
      res.status,
      "body:",
      bodyText
    );
    throw new Error("Falha ao carregar tarefas");
  }

  const data = await res.json();
  console.log("[FOCO] Resposta OK de /api/tasks:", data);

  return data.tasks;
}
