import { createSlice } from '@reduxjs/toolkit';

export const stopResultsSlice = createSlice({
  name: 'stopResults',
  initialState: {
    searchResults: [],
    autocompleteResults: [],
    favourites: [],
    times: {},
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setAutocompleteResults: (state, action) => {
      state.autocompleteResults = action.payload;
    },
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    setTimes: (state, action) => {
      state.times = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchResults,
  setAutocompleteResults,
  setFavourites,
  setTimes,
} = stopResultsSlice.actions;

export default stopResultsSlice.reducer;
