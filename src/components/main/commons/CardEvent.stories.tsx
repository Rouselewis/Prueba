import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CardEvent, { props } from '@/components/main/commons/CardEvent';
import { faker } from '@faker-js/faker';

export default {
  title: 'Molecules/CardEvent',
  component: CardEvent,
} as Meta;

const Template: StoryFn<props> = (args) => (
  <div className={args.layout == 'grid' ? 'max-w-md' : ''}>
    <CardEvent {...args} />
  </div>
);

export const NotWillAttend: StoryFn<props> = Template.bind({});
NotWillAttend.args = {
  layout: 'grid',
  image: faker.image.cats(),
  name: faker.name.jobTitle(),
  startDate: faker.date.past(),
  location: faker.address.city(),
  endDate: faker.date.future(),
};

export const WillAttend: StoryFn<props> = Template.bind({});
WillAttend.args = {
  layout: 'grid',
  image: faker.image.cats(),
  name: faker.name.jobTitle(),
  startDate: faker.date.past(),
  location: faker.address.city(),
  endDate: faker.date.future(),
  willAttend: true,
};

export const Column: StoryFn<props> = Template.bind({});
Column.args = {
  layout: 'column',
  image: faker.image.cats(),
  name: faker.name.jobTitle(),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  location: faker.address.city(),
};
