import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CreateTaskModal } from './CreateTaskModal';

const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-[#b6ff00] px-6 py-3 font-semibold text-black transition-all hover:opacity-90"
        >
          Abrir Modal
        </button>
      </div>
      
      <CreateTaskModal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
        onSave={(data) => {
          console.log('Dados salvos:', data);
          setIsOpen(false);
          args.onSave?.(data);
        }}
      />
    </>
  );
};

const meta: Meta<typeof CreateTaskModal> = {
  title: 'Components/CreateTaskModal',
  component: CreateTaskModal,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0b0b0b' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controla se o modal está visível',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de loading ao salvar',
    },
    onClose: { action: 'modal closed' },
    onSave: { action: 'task saved' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Modal padrão - Criar nova tarefa
 */
export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    loading: false,
  },
};

/**
 * Modal aberto por padrão
 * Útil para testar visualmente
 */
export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onSave: (data) => console.log('Save clicked:', data),
  },
};

/**
 * Estado de loading
 * Mostra como fica quando está salvando
 */
export const Loading: Story = {
  args: {
    isOpen: true,
    loading: true,
    onClose: () => console.log('Close clicked'),
    onSave: (data) => console.log('Save clicked:', data),
  },
};

/**
 * Com dados iniciais (modo edição)
 * Para editar uma tarefa existente
 */
export const WithInitialData: Story = {
  args: {
    isOpen: true,
    initialData: {
      title: 'Implementar autenticação',
      description: 'Criar sistema de login e registro de usuários com JWT e refresh tokens',
      tags: ['Backend', 'Urgente', 'Security'],
      dueDate: '2024-11-25',
    },
    onClose: () => console.log('Close clicked'),
    onSave: (data) => console.log('Save clicked:', data),
  },
};

/**
 * Apenas título preenchido
 */
export const OnlyTitle: Story = {
  args: {
    isOpen: true,
    initialData: {
      title: 'Revisar código',
      description: '',
      tags: [],
      dueDate: '',
    },
    onClose: () => console.log('Close clicked'),
    onSave: (data) => console.log('Save clicked:', data),
  },
};

/**
 * Com várias tags
 */
export const ManyTags: Story = {
  args: {
    isOpen: true,
    initialData: {
      title: 'Refatorar componentes',
      description: 'Melhorar performance e legibilidade',
      tags: ['Frontend', 'React', 'Performance', 'Refactor', 'UI/UX', 'TypeScript', 'Code Quality'],
      dueDate: '2024-12-01',
    },
    onClose: () => console.log('Close clicked'),
    onSave: (data) => console.log('Save clicked:', data),
  },
};

/**
 * Descrição longa
 * Testa comportamento com texto extenso
 */
export const LongDescription: Story = {
  args: {
    isOpen: true,
    initialData: {
      title: 'Integração com API de pagamentos',
      description: 'Integrar a aplicação com a API do Stripe. Isso inclui configurar webhooks para processar eventos de pagamento em tempo real, implementar lógica de retry automático para falhas de conexão, adicionar logs detalhados para facilitar o debugging, criar testes automatizados abrangentes para cada fluxo de pagamento possível, e documentar completamente todo o processo de integração para facilitar a manutenção futura.',
      tags: ['Backend', 'Payment', 'Integration'],
      dueDate: '2024-12-10',
    },
    onClose: () => console.log('Close clicked'),
    onSave: (data) => console.log('Save clicked:', data),
  },
};

/**
 * Modal vazio
 * Estado inicial ao criar nova tarefa
 */
export const Empty: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onSave: (data) => console.log('Save clicked:', data),
  },
};

/**
 * Interação completa
 * Demonstra o fluxo completo de uso
 */
export const InteractiveDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState<any[]>([]);

    return (
      <div className="min-h-screen bg-[#0b0b0b] p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-100">Minhas Tarefas</h1>
              <p className="mt-1 text-sm text-zinc-400">
                {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#b6ff00] px-6 py-3 font-semibold text-black transition-all hover:opacity-90"
            >
              ➕ Nova Tarefa
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-12 text-center">
              <div className="mb-4 text-6xl opacity-20">📋</div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-300">
                Nenhuma tarefa criada
              </h3>
              <p className="text-sm text-zinc-500">
                Clique em "Nova Tarefa" para começar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
                >
                  <h3 className="mb-2 text-lg font-semibold text-zinc-100">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="mb-3 text-sm text-zinc-400">{task.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {task.dueDate && (
                      <span className="ml-auto text-xs text-zinc-500">
                        📅 {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <CreateTaskModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSave={(data) => {
              setTasks([...tasks, data]);
              setIsOpen(false);
            }}
          />
        </div>
      </div>
    );
  },
};

/**
 * Teste de validação
 * Demonstra erros de validação
 */
export const ValidationTest: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <div className="p-4">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-full bg-[#b6ff00] px-6 py-3 font-semibold text-black"
          >
            Testar Validação
          </button>
          <p className="mt-2 text-sm text-zinc-400">
            Tente salvar sem preencher o título para ver a validação
          </p>
        </div>
        
        <CreateTaskModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(data) => {
            alert(`Tarefa salva: ${data.title}`);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};