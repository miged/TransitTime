import React from 'react';
import { StopCard } from '../components/StopCard';
import store from '../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'App/StopCard',
  component: StopCard,
};

const Template = (args) => (
  <Provider store={store}>
    <StopCard {...args} />
  </Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  stop_id: 135,
  stop_name: 'Stop Name',
  route_id: 123,
  route_name: 'Route Name',
};
