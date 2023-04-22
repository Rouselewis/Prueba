import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CardEventDetails, { props } from './CardEventDetails';
import { faker } from '@faker-js/faker';

export default {
  title: 'Organisms/CardEventDetails',
  component: CardEventDetails,
} as Meta;

const Template: StoryFn<props> = (args) => (
  <CardEventDetails className="max-w-5xl mx-auto" {...args} />
);

export const Default: StoryFn<props> = Template.bind({});
Default.args = {
  id: faker.datatype.uuid(),
  image: faker.image.cats(),
};
