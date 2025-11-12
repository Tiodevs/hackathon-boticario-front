import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  args: { id: 'demo', placeholder: 'voce@email.com' },
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Email: Story = {
  args: { type: 'email', placeholder: 'voce@email.com' },
};

export const Password: Story = {
  args: { type: 'password', placeholder: '••••••••' },
};

export const WithError: Story = {
  args: { error: 'Valor inválido' },
};
