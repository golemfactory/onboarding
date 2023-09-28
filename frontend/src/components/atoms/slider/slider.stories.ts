import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './slider'
const meta = {
  title: 'Atoms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    InputClassName: {
      control: 'text',
      description: 'Class name to be passed to the component.',
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Red: Story = {
  args: {
    InputClassName: 'bg-red-500',
    LabelClassName: 'text-red-500',
    label: 'Red',
    min: 0,
    max: 100,
    value: 50,
  },
}

export const Large: Story = {
  args: {
    InputClassName: 'text-4xl',
    LabelClassName: 'text-4xl',
    label: 'Large',
    min: 0,
    max: 100,
    value: 50,
  },
}
