import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import SeatMapEditor, { props } from './SeatMapEditor';

export default {
  title: 'Molecules/SeatMapEditor',
  component: SeatMapEditor,
} as Meta;

const Template: StoryFn<props> = (args) => <SeatMapEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  rows: 10,
  columns: 10,
};
