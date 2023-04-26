import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import SeatMapEditor, { props } from './SeatMapEditor';
import { useForm } from 'react-hook-form';
export default {
  title: 'Molecules/SeatMapEditor',
  component: SeatMapEditor,
} as Meta;

const Template: StoryFn<props> = (args) => {
  const { control } = useForm();
  return <SeatMapEditor name="spots" control={control} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  rows: 10,
  columns: 10,
};
