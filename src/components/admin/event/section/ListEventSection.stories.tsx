import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ListEventSection, { props } from './ListEventSection';
import { faker } from '@faker-js/faker';

export default {
  title: 'Organisms/ListEventSection',
  component: ListEventSection,
} as Meta;

const Template: StoryFn<props> = (args) => <ListEventSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  cols: 10,
  rows: 10,
  items: Array.from({ length: faker.datatype.number({ min: 1, max: 20 }) }).map(
    () => ({
      id: faker.datatype.uuid(),
      name: faker.random.word(),
    })
  ),
};
