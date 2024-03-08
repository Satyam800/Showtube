import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice= createSlice({
  name: "theme",
  initialState: {
    isdark:false,
  },
  reducers: {
    ThemeChange: (state, action) => {
      state.isdark =action.payload;
    },
  },
});

export const { ThemeChange } =ThemeSlice.actions;
export default ThemeSlice.reducer;