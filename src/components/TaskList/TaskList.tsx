import React from 'react';
import { TaskCard, TaskCardProps } from '../TaskCard/TaskCard'; 

export interface TaskListProps {
  tasks: TaskCardProps[];
  emptyMessage?: string;
  title?: string;
  loading?: boolean;
  onTaskClick?: (taskId: string) => void;
  onTaskEdit?: (taskId: string) => void;
  onTaskDelete?: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  emptyMessage = 'Nenhuma tarefa encontrada',
  title,
  loading = false,
  onTaskClick,
  onTaskEdit,
  onTaskDelete,
}) => {
  
  /**
   * Renderiza skeleton loading
   * (cards "fantasmas" enquanto carrega)
   */
  const renderLoading = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={`skeleton-${i}`}
          className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
        >
          <div className="mb-3 h-6 w-3/4 rounded bg-zinc-800"></div>
          <div className="mb-4 h-4 w-full rounded bg-zinc-800"></div>
          <div className="flex gap-2">
            <div className="h-6 w-20 rounded-full bg-zinc-800"></div>
            <div className="h-6 w-20 rounded-full bg-zinc-800"></div>
          </div>
        </div>
      ))}
    </div>
  );
  
  /**
   * Renderiza mensagem de lista vazia
   */
  const renderEmpty = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-6xl opacity-20">📋</div>
      <h3 className="mb-2 text-lg font-semibold text-zinc-300">
        {emptyMessage}
      </h3>
      <p className="text-sm text-zinc-500">
        Crie uma nova tarefa para começar
      </p>
    </div>
  );

  return (
    <div className="w-full">
      {/* Título da lista (opcional) */}
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-zinc-100">{title}</h2>
          <p className="mt-1 text-sm text-zinc-400">
            {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
          </p>
        </div>
      )}
      
      {/* Conteúdo principal */}
      {loading ? (
        renderLoading()
      ) : tasks.length === 0 ? (
        renderEmpty()
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              onClick={onTaskClick ? () => onTaskClick(task.id) : undefined}
              onEdit={onTaskEdit ? () => onTaskEdit(task.id) : undefined}
              onDelete={onTaskDelete ? () => onTaskDelete(task.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};