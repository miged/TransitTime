import { configureStore } from '@reduxjs/toolkit';
import stopResultsReducer from './stopResultsSlice';
import transitReducer from './transitSlice';

export default configureStore({
  reducer: {
    stopResults: stopResultsReducer,
    transit: transitReducer,
  },
});
