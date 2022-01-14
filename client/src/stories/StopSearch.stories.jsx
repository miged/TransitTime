import React from 'react';

import { StopSearch } from '../components/StopSearch';

export default {
  title: 'App/StopSearch',
  component: StopSearch,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = (args) => <StopSearch {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
