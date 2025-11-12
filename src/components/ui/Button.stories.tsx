import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  args: { children: 'Continuar' },
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story  = { args: { variant: 'primary' } };
export const Ghost: Story    = { args: { variant: 'ghost' } };
export const Disabled: Story = { args: { disabled: true } };
export const FullWidth: Story= { args: { full: true } };
