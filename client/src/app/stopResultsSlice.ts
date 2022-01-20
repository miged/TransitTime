import { createSlice } from '@reduxjs/toolkit';

interface ResultsState {
  searchResults: any[];
  autocompleteResults: any[];
  favourites: any[];
  times: Object;
}

const initialState: ResultsState = {
  searchResults: [],
  autocompleteResults: [],
  favourites: [],
  times: {},
};

export const stopResultsSlice = createSlice({
  name: 'stopResults',
  initialState,
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
