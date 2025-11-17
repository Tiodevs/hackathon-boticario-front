"use client";

import { useEffect, useState } from "react";
import {
  Task,
  fetchTasks,
  createTask,
  updateTaskCompleted,
  type CreateTaskInput,
} from "@/util/tasks";

type UseTasksState = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
};

export function useTasks() {
  const [state, setState] = useState<UseTasksState>({
    tasks: [],
    isLoading: true,
    error: null,
  });

  /**
   * Carregar tarefas via REST
   */
  async function loadTasks() {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const data = await fetchTasks();
      setState({
        tasks: data,
        isLoading: false,
        error: null,
      });
    } catch (err: unknown) {
      console.error("[FOCO] useTasks.loadTasks: erro ao carregar", err);
      const msg =
        err instanceof Error ? err.message : "Erro ao carregar tarefas.";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: msg,
      }));
    }
  }

  /**
   * Criar tarefa via REST
   */
  async function handleCreateTask(input: CreateTaskInput) {
    console.log("[FOCO] useTasks.handleCreateTask: criando tarefa...", input);
    try {
      const newTask = await createTask(input);
      setState((prev) => ({
        ...prev,
        tasks: [newTask, ...prev.tasks],
      }));
      return newTask;
    } catch (err: unknown) {
      console.error("[FOCO] useTasks.handleCreateTask: erro", err);
      const msg =
        err instanceof Error ? err.message : "Erro ao criar tarefa.";
      setState((prev) => ({
        ...prev,
        error: msg,
      }));
      throw err;
    }
  }

  /**
   * Atualizar status (completed)
   */
  async function toggleTaskCompleted(id: string, completed: boolean) {
    console.log(
      "[FOCO] useTasks.toggleTaskCompleted:",
      id,
      "-> completed:",
      completed
    );
    try {
      const updated = await updateTaskCompleted(id, completed);
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) =>
          task.id === id ? updated : task
        ),
      }));
      return updated;
    } catch (err: unknown) {
      console.error("[FOCO] useTasks.toggleTaskCompleted: erro", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Erro ao atualizar status da tarefa.";
      setState((prev) => ({
        ...prev,
        error: msg,
      }));
      throw err;
    }
  }

  /**
   * Ao montar, carregar lista inicial
   */
  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks: state.tasks,
    isLoading: state.isLoading,
    error: state.error,
    reload: loadTasks,
    createTask: handleCreateTask,
    toggleTaskCompleted,
  };
}
