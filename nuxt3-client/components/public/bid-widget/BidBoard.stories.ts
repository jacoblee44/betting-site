import type { Meta, StoryObj } from '@storybook/vue3';

import BidBoardVue from './BidBoard.vue';
// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
  title: 'Homepage/BidBoard',
  component: BidBoardVue,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof BidBoardVue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BidBoard: Story = {
  args: {
    dateString: 'ABC',
    dateTimeString: 'DEF',
  },
};
