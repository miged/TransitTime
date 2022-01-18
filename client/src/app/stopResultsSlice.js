import { createSlice } from '@reduxjs/toolkit';

export const stopResultsSlice = createSlice({
  name: 'stopResults',
  initialState: {
    searchResults: [],
    autocompleteResults: [],
    favouriteResults: [],
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setAutocompleteResults: (state, action) => {
      state.autocompleteResults = action.payload;
    },
    setFavouriteResults: (state, action) => {
      state.favouriteResults = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchResults, setAutocompleteResults, setFavouriteResults } =
  stopResultsSlice.actions;

export default stopResultsSlice.reducer;
