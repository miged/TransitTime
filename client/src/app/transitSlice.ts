import { createSlice } from '@reduxjs/toolkit';

export const transitSlice = createSlice({
  name: 'transit',
  initialState: {
    id: 'o-dpz8-ttc',
  },
  reducers: {
    setTransitId: (state, action) => {
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTransitId } = transitSlice.actions;

export default transitSlice.reducer;
