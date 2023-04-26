import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Scenery, { props } from './Scenery';
import { faker } from '@faker-js/faker';

export default {
  title: 'Organisms/Scenery',
  component: Scenery,
} as Meta;

const Template: StoryFn<props> = (args) => <Scenery {...args} />;

export const Default = Template.bind({});
