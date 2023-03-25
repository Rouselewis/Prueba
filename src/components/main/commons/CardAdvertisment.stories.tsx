import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CardAdvertisment, { props } from './CardAdvertisment';
import {faker} from '@faker-js/faker'

export default {
  title: 'Molecules/CardAdvertisment',
  component: CardAdvertisment,
} as Meta;

const Template: StoryFn<props> = (args) => <CardAdvertisment {...args} />;

export const Default = Template.bind({});