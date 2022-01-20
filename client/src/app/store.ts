import { configureStore } from '@reduxjs/toolkit';
import stopResultsReducer from './stopResultsSlice';
import transitReducer from './transitSlice';

export const store = configureStore({
  reducer: {
    stopResults: stopResultsReducer,
    transit: transitReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
