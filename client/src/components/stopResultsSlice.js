import { createSlice } from '@reduxjs/toolkit';

export const stopResultsSlice = createSlice({
  name: 'stopResults',
  initialState: {
    value: [],
  },
  reducers: {
    setResults: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setResults } = stopResultsSlice.actions;

export default stopResultsSlice.reducer;
