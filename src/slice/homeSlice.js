import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { setGenres } = homeSlice.actions;

export default homeSlice.reducer;
