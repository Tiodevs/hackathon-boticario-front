"use client";

import { useEffect, useState } from "react";
import { fetchTasks, type Task } from "@/util/tasks";

type Status = "idle" | "loading" | "ok" | "err";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setStatus("loading");
        setError(null);

        const data = await fetchTasks();
        setTasks(data);
        setStatus("ok");
      } catch (err: any) {
        console.error("Erro ao carregar tarefas:", err);
        setStatus("err");
        setError(err?.message || "Erro ao carregar tarefas");
      }
    }

    load();
  }, []);

  return { tasks, status, error };
}
