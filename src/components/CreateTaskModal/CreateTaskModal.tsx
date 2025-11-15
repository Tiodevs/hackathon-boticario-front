import React, { useState, useEffect, useRef } from 'react';


export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
}

/**
 * Props do CreateTaskModal
 */

export interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
  initialData?: TaskFormData;
  loading?: boolean;
}


export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  loading = false,
}) => {
  // Estado do formulário
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    tags: initialData?.tags || [],
    dueDate: initialData?.dueDate || '',
  });

  // Estado para input de tags
  const [tagInput, setTagInput] = useState('');
  
  // Erros de validação
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});
  
  // Ref para o modal (para detectar clique fora)
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Reseta o formulário quando o modal abre/fecha
   */
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: initialData?.title || '',
        description: initialData?.description || '',
        tags: initialData?.tags || [],
        dueDate: initialData?.dueDate || '',
      });
      setErrors({});
      setTagInput('');
    }
  }, [isOpen, initialData]);

  /**
   * Fecha modal ao pressionar ESC
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  /**
   * Valida o formulário
   */
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (formData.title.length > 100) {
      newErrors.title = 'Título muito longo (máx. 100 caracteres)';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Descrição muito longa (máx. 500 caracteres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Adiciona uma tag
   */
  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setTagInput('');
    }
  };

  /**
   * Remove uma tag
   */
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  /**
   * Submete o formulário
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSave(formData);
    }
  };

  /**
   * Fecha ao clicar no overlay (fora do modal)
   */
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Não renderiza nada se modal estiver fechado
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#1f1f1f] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 id="modal-title" className="text-2xl font-bold text-zinc-100">
            {initialData ? 'Editar Tarefa' : 'Adicionar Tarefa'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            aria-label="Fechar modal"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-zinc-300">
              Título <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 ${
                errors.title 
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-zinc-300 focus:border-[#b6ff00] focus:ring-2 focus:ring-[#b6ff00]/20'
              }`}
              placeholder="Ex: Implementar autenticação"
              disabled={loading}
              maxLength={100}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-zinc-300">
              Descrição
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 ${
                errors.description 
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-zinc-300 focus:border-[#b6ff00] focus:ring-2 focus:ring-[#b6ff00]/20'
              }`}
              placeholder="Descreva os detalhes da tarefa..."
              rows={4}
              disabled={loading}
              maxLength={500}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-400">{errors.description}</p>
            )}
            <p className="mt-1 text-xs text-zinc-500">
              {formData.description.length}/500 caracteres
            </p>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="mb-2 block text-sm font-medium text-zinc-300">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#b6ff00] focus:ring-2 focus:ring-[#b6ff00]/20"
                placeholder="Ex: Backend, Urgente"
                disabled={loading}
              />
              <button
                type="button"
                onClick={addTag}
                className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700 disabled:opacity-50"
                disabled={loading || !tagInput.trim()}
              >
                Adicionar
              </button>
            </div>
            
            {/* Lista de tags */}
            {formData.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-zinc-400 transition-colors hover:text-red-400"
                      aria-label={`Remover tag ${tag}`}
                      disabled={loading}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Data de conclusão */}
          <div>
            <label htmlFor="dueDate" className="mb-2 block text-sm font-medium text-zinc-300">
              Data de conclusão
            </label>
            <input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-[#b6ff00] focus:ring-2 focus:ring-[#b6ff00]/20"
              disabled={loading}
            />
          </div>

          {/* BOTÕES */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-[#b6ff00] px-6 py-3 font-semibold text-black transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-full border border-zinc-800 bg-zinc-900 px-6 py-3 font-semibold text-zinc-100 transition-all hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};