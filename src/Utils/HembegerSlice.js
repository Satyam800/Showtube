import { createSlice } from "@reduxjs/toolkit";

const HembegerSlice = createSlice({
  name: "Icon",
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = HembegerSlice.actions;
export default HembegerSlice.reducer;
