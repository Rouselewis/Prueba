import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ListEventTemplate, { props } from './ListEventTemplate';
import { faker } from '@faker-js/faker';
import { useForm } from 'react-hook-form';
export default {
  title: 'Organisms/ListEventTemplate',
  component: ListEventTemplate,
} as Meta;

const Template: StoryFn<props> = (args) => {
  const { control } = useForm();
  return (
    <ListEventTemplate
      className="max-w-5xl mx-auto"
      name="template"
      control={control}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  items: Array.from({ length: faker.datatype.number({ min: 3, max: 5 }) }).map(
    () => ({
      name: faker.commerce.productName(),
      value: faker.finance.amount(),
      image: faker.image.imageUrl(),
    })
  ),
};
