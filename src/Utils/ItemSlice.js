import { createSlice } from "@reduxjs/toolkit";

const ItemSlice = createSlice({
  name: "video",
  initialState: {
    Item: null,
  },
  reducers: {
    VideoArray: (state, action) => {
      console.log(action.payload,"item");
      state.Item = action.payload;
    },
  },
});

export const { VideoArray } = ItemSlice.actions;
export default ItemSlice.reducer;
