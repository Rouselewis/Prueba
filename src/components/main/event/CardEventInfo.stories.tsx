import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CardEventInfo, { props } from './CardEventInfo';
import { faker } from '@faker-js/faker';

export default {
  title: 'Organisms/CardEventDetails',
  component: CardEventInfo,
} as Meta;

const Template: StoryFn<props> = (args) => (
  <CardEventInfo className="max-w-5xl mx-auto" {...args} />
);

export const Default: StoryFn<props> = Template.bind({});
Default.args = {
  access: faker.lorem.words(10),
  details: faker.lorem.paragraphs(),
  general: faker.lorem.words(10),
  observations: faker.lorem.words(10),
  restrictions: faker.lorem.words(10),
  services: faker.lorem.words(10),
};
