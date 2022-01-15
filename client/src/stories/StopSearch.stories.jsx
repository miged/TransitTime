import React from 'react';
import { StopSearch } from '../components/StopSearch';
import store from '../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'App/StopSearch',
  component: StopSearch,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = (args) => (
  <Provider store={store}>
    <StopSearch {...args} />
  </Provider>
);

export const Primary = Template.bind({});
Primary.args = {};
