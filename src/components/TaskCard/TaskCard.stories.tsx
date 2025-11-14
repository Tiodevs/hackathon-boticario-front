import type { Meta, StoryObj } from '@storybook/react';
import { TaskCard } from './TaskCard';

const meta: Meta<typeof TaskCard> = {
  title: 'Components/TaskCard',
  component: TaskCard,
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
    onClick: { action: 'clicked' },
    onEdit: { action: 'edit clicked' },
    onDelete: { action: 'delete clicked' },
    completed: {
      control: 'boolean',
      description: 'Indica se a tarefa foi concluída.',
    },
    tags: {
      control: 'object',
      description: 'Array de tags da tarefa.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Story padrão - Tarefa básica com todos os elementos
 */
export const Default: Story = {
  args: {
    id: '1',
    title: 'Implementar autenticação',
    description: 'Criar sistema de login e registro de usuários com JWT',
    tags: ['Backend', 'Urgente'],
    dueDate: '2024-11-20',
  },
};

/**
 * Tarefa sem descrição
 * Útil para tarefas simples e diretas
 */
export const WithoutDescription: Story = {
  args: {
    id: '2',
    title: 'Revisar documentação',
    tags: ['Docs'],
    dueDate: '2024-11-25',
  },
};

/**
 * Tarefa sem tags
 * Mostra como fica quando não há categorização
 */
export const WithoutTags: Story = {
  args: {
    id: '3',
    title: 'Atualizar dependências',
    description: 'Verificar e atualizar pacotes npm desatualizados',
    dueDate: '2024-12-01',
  },
};

/**
 * Tarefa sem data
 * Para tarefas sem prazo definido
 */
export const WithoutDueDate: Story = {
  args: {
    id: '4',
    title: 'Estudar novos padrões de design',
    description: 'Pesquisar tendências atuais em UI/UX',
    tags: ['Design', 'Pesquisa'],
  },
};

/**
 * Tarefa concluída
 * Mostra o estado visual de tarefa finalizada
 */
export const Completed: Story = {
  args: {
    id: '5',
    title: 'Setup do projeto',
    description: 'Configurar Next.js, ESLint, Prettier e Storybook',
    tags: ['Setup'],
    dueDate: '2024-11-13',
    completed: true,
  },
};

/**
 * Título longo
 * Testa o comportamento com textos extensos
 */
export const LongTitle: Story = {
  args: {
    id: '6',
    title: 'Implementar sistema completo de autenticação com JWT, refresh tokens, recuperação de senha e verificação de email',
    description: 'Sistema robusto de autenticação',
    tags: ['Backend', 'Security'],
    dueDate: '2024-11-30',
  },
};

/**
 * Descrição longa
 * Testa o comportamento com descrições extensas
 */
export const LongDescription: Story = {
  args: {
    id: '7',
    title: 'Integração com API de pagamentos',
    description: 'Integrar a aplicação com a API do Stripe. Isso inclui configurar webhooks para processar eventos de pagamento, implementar lógica de retry para falhas de conexão, adicionar logs detalhados para debugging, criar testes automatizados para cada fluxo de pagamento, e documentar todo o processo de integração.',
    tags: ['Backend', 'Payment'],
    dueDate: '2024-12-10',
  },
};

/**
 * Múltiplas tags
 * Mostra como fica com várias categorias
 */
export const ManyTags: Story = {
  args: {
    id: '8',
    title: 'Refatorar componentes',
    description: 'Melhorar performance e legibilidade do código',
    tags: ['Frontend', 'React', 'Performance', 'Refactor', 'UI/UX', 'Optimization'],
    dueDate: '2024-11-28',
  },
};

/**
 * Card minimalista
 * Apenas título, sem nenhum extra
 */
export const Minimal: Story = {
  args: {
    id: '9',
    title: 'Tarefa simples',
  },
};

/**
 * Com interações
 * Mostra os callbacks funcionando
 */
export const WithInteractions: Story = {
  args: {
    id: '10',
    title: 'Tarefa interativa',
    description: 'Clique no card, editar ou deletar para ver as ações',
    tags: ['Exemplo'],
    dueDate: '2024-11-20',
    onClick: () => alert('Card clicado!'),
    onEdit: () => alert('Editar clicado!'),
    onDelete: () => alert('Deletar clicado!'),
  },
};

/**
 * Lista com múltiplos cards
 * Mostra como vários cards ficam juntos
 */
export const MultipleCards: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TaskCard
        id="1"
        title="Tarefa Pendente"
        description="Esta tarefa ainda não foi iniciada"
        tags={['Pendente', 'Backend']}
        dueDate="2024-11-20"
      />
      <TaskCard
        id="2"
        title="Tarefa em Progresso"
        description="Trabalhando ativamente nesta tarefa"
        tags={['Em Progresso', 'Frontend']}
        dueDate="2024-11-22"
      />
      <TaskCard
        id="3"
        title="Tarefa Concluída"
        description="Esta tarefa já foi finalizada com sucesso"
        tags={['Concluída']}
        dueDate="2024-11-15"
        completed={true}
      />
      <TaskCard
        id="4"
        title="Tarefa Urgente"
        description="Requer atenção imediata"
        tags={['Urgente', 'Crítico', 'Backend']}
        dueDate="2024-11-18"
      />
    </div>
  ),
};