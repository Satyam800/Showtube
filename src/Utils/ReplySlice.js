import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ReplySlice = createSlice({
  name: "Reply",
  initialState: {
    isclicked: false,
   
  },
  reducers: {
    onReply:(state,action)=>{
        state.isclicked=true
    }
   
}});

export const { onReply } = ReplySlice.actions;
export default ReplySlice.reducer;
