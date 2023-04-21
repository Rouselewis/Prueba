import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ListCardCategory, {
  props,
} from '@/components/main/commons/ListCardCategory';
import { faker } from '@faker-js/faker';

export default {
  title: 'Organisms/ListCardCategory',
  component: ListCardCategory,
} as Meta;

const Template: StoryFn<props> = (args) => <ListCardCategory {...args} />;

const items = Array.from({ length: 12 }, () => ({
  id: faker.datatype.uuid(),
  color: faker.internet.color(),
  image: faker.image.cats(),
  name: faker.lorem.word(),
}));

export const Grid: StoryFn<props> = Template.bind({});
Grid.args = {
  items,
  layout: 'grid',
  totalDocs: 12,
  size: 'large',
};

export const Swiper: StoryFn<props> = Template.bind({});
Swiper.args = {
  items,
  layout: 'swiper',
  totalDocs: 12,
  size: 'small',
};
