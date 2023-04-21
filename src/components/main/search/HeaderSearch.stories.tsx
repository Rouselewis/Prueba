import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import HeaderSearch, { props } from '@/components/main/search/HeaderSearch';
import { faker } from '@faker-js/faker';
import { useForm, UseFormReturn } from 'react-hook-form';

export default {
  title: 'Organisms/HeaderSearch',
  component: HeaderSearch,
} as Meta;

const Template: StoryFn<props> = (args) => {
  const useFormReturn = useForm();
  return <HeaderSearch {...args} {...useFormReturn} />;
};

const items = Array.from({ length: 12 }, () => ({
  id: faker.datatype.uuid(),
  color: faker.internet.color(),
  image: faker.image.cats(),
  name: faker.lorem.word(),
}));

type StoryComponent = StoryFn<Omit<props, keyof UseFormReturn>>;

export const Swiper: StoryComponent = Template.bind({});
Swiper.args = {
  items,
  layout: 'swiper',
  totalDocs: 12,
  size: 'small',
};
