import React from 'react';

export interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  dueDate?: string;
  completed?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  tags = [],
  dueDate,
  completed = false,
  onClick,
  onEdit,
  onDelete,
}) => {
  const formatDueDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`
        group relative 
        rounded-2xl border border-zinc-800 
        bg-zinc-900/40 p-6 
        transition-all duration-300
        hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-lg
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3
          className={`
            flex-1 text-lg font-semibold leading-tight
            ${completed ? 'text-zinc-500 line-through' : 'text-zinc-100'}
          `}
        >
          {title}
        </h3>

        <div className="flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Impede onClick do card
                onEdit();
              }}
              className="
                rounded-lg p-2 
                text-zinc-400 transition-colors
                hover:bg-zinc-800 hover:text-zinc-100
              "
              aria-label={`Editar tarefa: ${title}`}
              title="Editar"
              type="button"
            >
              ✏️
            </button>
          )}

          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="
                rounded-lg p-2 
                text-zinc-400 transition-colors
                hover:bg-red-500/10 hover:text-red-400
              "
              aria-label={`Deletar tarefa: ${title}`}
              title="Deletar"
              type="button"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {description && (
        <p className="mb-4 text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {/* Tags */}
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <span
              key={`${id}-tag-${index}`}
              className="
              rounded-full bg-zinc-800 px-3 py-1 
              text-xs font-medium text-zinc-300
              transition-colors hover:bg-zinc-700
            "
            >
              {tag}
            </span>
          ))}

        {dueDate && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-zinc-500">
            <span role="img" aria-label="calendário">
              📅
            </span>
            <time dateTime={dueDate}>{formatDueDate(dueDate)}</time>
          </span>
        )}
      </div>

      {completed && (
        <div
          className="absolute right-6 top-6"
          role="img"
          aria-label="Tarefa concluída"
        >
          <span className="text-2xl">✅</span>
        </div>
      )}
    </div>
  );
};
