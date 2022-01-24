import React from 'react';
import { StopCard } from '../components/StopCard.tsx';
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
  stop_code: 135,
  stop_name: 'Stop Name',
  route_num: 123,
  route_name: 'Route Name',
};
