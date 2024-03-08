import { createSlice } from "@reduxjs/toolkit";

const isCommentPost = createSlice({
  name: "isComment",
  initialState: {
    istrue:false,
  },
  reducers: {
    IsComment: (state, action) => {
      state.istrue =action.payload;
    },
  },
});

export const { IsComment } =isCommentPost.actions;
export default isCommentPost.reducer;
