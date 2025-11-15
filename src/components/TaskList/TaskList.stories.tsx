import type { Meta, StoryObj } from '@storybook/react';
import { TaskList } from './TaskList';
import { TaskCardProps } from '../TaskCard/TaskCard';

/**
 * Dados mock para usar nas stories
 */

const mockTasks: TaskCardProps[] = [
   {
    id: '1',
    title: 'Implementar autenticação',
    description: 'Criar sistema de login e registro com JWT',
    tags: ['Backend', 'Urgente'],
    dueDate: '2024-11-20',
  },
  {
    id: '2',
    title: 'Desenvolver dashboard',
    description: 'Criar interface do dashboard com métricas',
    tags: ['Frontend', 'UI/UX'],
    dueDate: '2024-11-25',
  },
  {
    id: '3',
    title: 'Setup do projeto',
    description: 'Configurar Next.js, ESLint e Storybook',
    tags: ['Setup'],
    dueDate: '2024-11-13',
    completed: true,
  },
  {
    id: '4',
    title: 'Integração com API',
    description: 'Conectar frontend com backend',
    tags: ['Backend', 'Frontend'],
    dueDate: '2024-11-28',
  },
  {
    id: '5',
    title: 'Testes unitários',
    description: 'Adicionar testes para componentes principais',
    tags: ['Testing', 'QA'],
    dueDate: '2024-12-01',
  },
];

const meta: Meta<typeof TaskList> = {
  title: 'Components/TaskList',
  component: TaskList,
  parameters: {
    layout: 'padded',
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
    onTaskClick: { action: 'task clicked' },
    onTaskEdit: { action: 'task edit' },
    onTaskDelete: { action: 'task delete' },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;


/**
 * Lista padrão com múltiplas tarefas
 */
export const Default: Story = {
  args: {
    tasks: mockTasks,
    title: 'Minhas Tarefas',
  },
};

/**
 * Lista vazia
 * Mostra a mensagem quando não há tarefas
 */
export const Empty: Story = {
  args: {
    tasks: [],
    title: 'Minhas Tarefas',
  },
};

/**
 * Lista vazia com mensagem customizada
 */
export const EmptyCustomMessage: Story = {
  args: {
    tasks: [],
    title: 'Tarefas Concluídas',
    emptyMessage: 'Você ainda não completou nenhuma tarefa',
  },
};

/**
 * Estado de loading
 * Mostra skeletons enquanto carrega
 */
export const Loading: Story = {
  args: {
    tasks: [],
    title: 'Minhas Tarefas',
    loading: true,
  },
};

/** Lista com poucas tarefas
 */
export const FewTasks: Story = {
  args: {
    tasks: mockTasks.slice(0, 2),
    title: 'Tarefas Urgentes',
  },
};


/**
 * Lista sem título
 */
export const WithoutTitle: Story = {
  args: {
    tasks: mockTasks,
  },
};

/**
 * Lista com muitas tarefas
 */
export const ManyTasks: Story = {
  args: {
    tasks: [
      ...mockTasks,
      {
        id: '6',
        title: 'Revisar código',
        description: 'Code review dos PRs pendentes',
        tags: ['Review'],
        dueDate: '2024-11-22',
      },
      {
        id: '7',
        title: 'Atualizar documentação',
        description: 'Documentar novas features',
        tags: ['Docs'],
        dueDate: '2024-11-24',
      },
      {
        id: '8',
        title: 'Deploy em produção',
        description: 'Fazer deploy da versão 2.0',
        tags: ['Deploy', 'Urgente'],
        dueDate: '2024-11-30',
      },
    ],
    title: 'Todas as Tarefas',
  },
};

/**
 * Com interações
 * Testa os callbacks
 */
export const WithInteractions: Story = {
  args: {
    tasks: mockTasks.slice(0, 3),
    title: 'Tarefas Interativas',
    onTaskClick: (id) => alert(`Tarefa clicada: ${id}`),
    onTaskEdit: (id) => alert(`Editar tarefa: ${id}`),
    onTaskDelete: (id) => alert(`Deletar tarefa: ${id}`),
  },
};

/**
 * Apenas tarefas concluídas
 */
export const CompletedOnly: Story = {
  args: {
    tasks: mockTasks
      .filter((task) => task.completed)
      .concat([
        {
          id: '9',
          title: 'Configurar CI/CD',
          description: 'Setup de pipeline automatizado',
          tags: ['DevOps'],
          dueDate: '2024-11-10',
          completed: true,
        },
        {
          id: '10',
          title: 'Migração de banco',
          description: 'Migrar dados para novo schema',
          tags: ['Database'],
          dueDate: '2024-11-12',
          completed: true,
        },
      ]),
    title: 'Tarefas Concluídas',
  },
};