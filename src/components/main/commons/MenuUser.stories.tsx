import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import MenuUser, { props } from './MenuUser';
import { faker } from '@faker-js/faker';

export default {
  title: 'Molecules/MenuUser',
  component: MenuUser,
} as Meta;

const Template: StoryFn<props> = (args) => <MenuUser {...args} />;

export const Default = Template.bind({});
