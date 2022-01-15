import { configureStore } from '@reduxjs/toolkit';
import stopResultsReducer from '../components/stopResultsSlice';

export default configureStore({
  reducer: {
    stopResults: stopResultsReducer,
  },
});
