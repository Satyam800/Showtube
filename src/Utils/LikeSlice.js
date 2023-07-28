import { createSlice } from "@reduxjs/toolkit";

const LikeSlice = createSlice({
  name: "like",
  initialState: {
    isLike: false,
    isdislike: false,
    isthreedot: false,
  },
  reducers: {
    LikeVideo: (state, action) => {
      if (state.isdislike == true) {
        state.isdislike = false;
      }

      state.isLike = !state.isLike;
      console.log(state.isLike, "isLike");
    },
    DisLikeVideo: (state) => {
      if (state.isLike == true) {
        state.isLike = false;
      }
      state.isdislike = !state.isdislike;
    },

    isthreedotactive: (state) => {
      state.isthreedot = !state.isthreedot;
    },
    isclickOutsidethreedot:(state,action)=>{
        state.isthreedot=action.payload
    }
  },
});

export const { LikeVideo, DisLikeVideo, isthreedotactive,isclickOutsidethreedot } = LikeSlice.actions;
export default LikeSlice.reducer;
