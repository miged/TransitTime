import { createSlice } from '@reduxjs/toolkit';

interface Location {
  coordinates: number[];
}

interface RouteStop {
  route: Route;
}

interface Route {
  route_id: string;
  route_short_name: string;
  route_long_name: string;
  agency: any;
}

interface Stop {
  id: number;
  stop_id: string;
  stop_code: string;
  stop_name: string;
  route_stops: RouteStop[];
  geometry: Location;
}

interface ResultsState {
  searchResults: Stop[];
  autocompleteResults: Stop[];
  favourites: any[];
  times: Object;
  location: Coordinates;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

const initialState: ResultsState = {
  searchResults: [],
  autocompleteResults: [],
  favourites: [],
  times: {},
  location: { latitude: 0, longitude: 0 },
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
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    clearLocation: (state) => {
      state.location = { latitude: 0, longitude: 0 };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchResults,
  setAutocompleteResults,
  setFavourites,
  setTimes,
  setLocation,
  clearLocation,
} = stopResultsSlice.actions;

export default stopResultsSlice.reducer;
