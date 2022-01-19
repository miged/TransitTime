import { createSlice } from '@reduxjs/toolkit';

export const stopResultsSlice = createSlice({
  name: 'stopResults',
  initialState: {
    searchResults: [],
    autocompleteResults: [],
    favourites: [],
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
  },
});

// Action creators are generated for each case reducer function
export const { setSearchResults, setAutocompleteResults, setFavourites } =
  stopResultsSlice.actions;

export default stopResultsSlice.reducer;
