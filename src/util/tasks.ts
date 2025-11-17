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

/**
 * Listagem de tarefas (SCRUM-28)
 */
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

  return data.tasks as Task[];
}

/**
 * Dados de entrada para criação de tarefa (SCRUM-29)
 */
export type CreateTaskInput = {
  title: string;
  description?: string | null;
  dueDate?: string | null;
  priority?: TaskPriority;
  projectId?: string;
};

/**
 * Criação de tarefa (POST /api/tasks)
 */
export async function createTask(input: CreateTaskInput): Promise<Task> {
  const url = `${API_BASE_URL}/api/tasks`;

  console.log("[FOCO] Criando tarefa em:", url, "payload:", input);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const bodyText = await res.text().catch(() => "<sem body>");
    console.error(
      "[FOCO] Erro ao criar tarefa",
      "status:",
      res.status,
      "body:",
      bodyText
    );
    throw new Error("Falha ao criar tarefa. Tente novamente.");
  }

  const data = await res.json();
  console.log("[FOCO] Tarefa criada com sucesso:", data);

  return (data.task ?? data) as Task;
}

/**
 * Atualização de status (PUT /api/tasks/:id)
 */
export async function updateTaskCompleted(
  id: string,
  completed: boolean
): Promise<Task> {
  const url = `${API_BASE_URL}/api/tasks/${id}`;

  console.log(
    "[FOCO] Atualizando status de tarefa:",
    id,
    "-> completed:",
    completed,
    "url:",
    url
  );

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ completed }),
  });

  if (!res.ok) {
    const bodyText = await res.text().catch(() => "<sem body>");
    console.error(
      "[FOCO] Erro ao atualizar tarefa",
      "status:",
      res.status,
      "body:",
      bodyText
    );
    throw new Error(
      "Falha ao atualizar o status da tarefa. Tente novamente."
    );
  }

  const data = await res.json();
  console.log("[FOCO] Tarefa atualizada com sucesso:", data);

  return (data.task ?? data) as Task;
}

/**
 * --- PROJETOS (para garantir projectId) ---
 */

export type Project = {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
};

export type CreateProjectInput = {
  name: string;
  description?: string;
  color?: string;
};

export async function fetchProjects(): Promise<Project[]> {
  const url = `${API_BASE_URL}/api/projects?page=1&limit=10`;

  console.log("[FOCO] Chamando endpoint de projetos:", url);

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
      "[FOCO] Erro ao carregar /api/projects",
      "status:",
      res.status,
      "body:",
      bodyText
    );
    throw new Error("Falha ao carregar projetos");
  }

  const data = await res.json();
  console.log("[FOCO] Resposta OK de /api/projects:", data);

  return (data.projects ?? []) as Project[];
}

export async function createProject(
  input: CreateProjectInput
): Promise<Project> {
  const url = `${API_BASE_URL}/api/projects`;

  console.log("[FOCO] Criando projeto em:", url, "payload:", input);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const bodyText = await res.text().catch(() => "<sem body>");
    console.error(
      "[FOCO] Erro ao criar projeto",
      "status:",
      res.status,
      "body:",
      bodyText
    );
    throw new Error("Falha ao criar projeto. Tente novamente.");
  }

  const data = await res.json();
  console.log("[FOCO] Projeto criado com sucesso:", data);

  return data.project as Project;
}
