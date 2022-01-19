import { configureStore } from '@reduxjs/toolkit';
import stopResultsReducer from './stopResultsSlice.ts';
import transitReducer from './transitSlice.ts';

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
