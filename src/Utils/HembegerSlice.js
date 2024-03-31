import { createSlice } from "@reduxjs/toolkit";

const HembegerSlice = createSlice({
  name: "Icon",
  initialState: {
    isMenuOpen: false,
    share:false,
    Playlist:false
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    Share:(state,action)=>{
      state.share=action.payload
    },
    list:(state,action)=>{
      state.Playlist=action.payload
    }
  },
});

export const { toggleMenu, closeMenu,Share,list } = HembegerSlice.actions;
export default HembegerSlice.reducer;
