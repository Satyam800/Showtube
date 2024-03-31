import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const likeVideo=createAsyncThunk("like",async(data)=>{
  const res= await axios.post("http://localhost:3500/api/v1/likevideo",data)
})

export const getlikeVideo=createAsyncThunk("liked",async(data)=>{
  const res= await axios.post ("http://localhost:3500/api/v1/likedata",data)
  console.log(res.data.data,"getliked");
  return res.data.data
})

export const dislikeVideo=createAsyncThunk("dislike",async(data)=>{
  const res= await axios.post("http://localhost:3500/api/v1/dislike",data)
  return res.data.data
})

const LikeSlice = createSlice({
  name: "like",
  initialState: {
    likedata:[]
  },
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder.addCase(getlikeVideo.fulfilled,(state,action)=>{
      console.log(action.payload,"action.payloadLike");
      state.likedata=action.payload
    }).addCase((dislikeVideo.fulfilled),(state,action)=>{
      state.likedata=action.payload
    })
  }
});

export const { LikeVideo, DisLikeVideo, isthreedotactive,isclickOutsidethreedot } = LikeSlice.actions;
export default LikeSlice.reducer;
