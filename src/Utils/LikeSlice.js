import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const likeVideo=createAsyncThunk("like",async(data)=>{
  const res= await axios.post("http://localhost:3500/api/v1/likevideo",data)
  return res.data
})

export const getlikeVideo=createAsyncThunk("liked",async(data)=>{
  const res= await axios.post ("http://localhost:3500/api/v1/likedata",data)
  console.log(res.data.data,"getliked");
  return res.data
})

export const dislikeVideo=createAsyncThunk("dislike",async(data)=>{
  const res= await axios.post("http://localhost:3500/api/v1/dislike",data)
  return res.data
})

export const subscribe=createAsyncThunk("subscribe",async(data)=>{
  const res= await axios.post("http://localhost:3500/api/v1/subscribe",data)

  return res.data.data
})

export const RemoveSubs=createAsyncThunk("unsubscribe",async(data)=>{
  const res= await axios.post("http://localhost:3500/api/v1/unsubscribe",data)

  return res.data.data
}) 

export const GetSubs=createAsyncThunk("getallsubscribe",async(data)=>{
  const res= await axios.post("http://localhost:3500/api/v1/list",data)

  return res.data.data
}) 

const LikeSlice = createSlice({
  name: "like",
  initialState: {
    likedata:[],
    subscribed:[],
    totalLike:""
  },
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder.addCase(getlikeVideo.fulfilled,(state,action)=>{
      console.log(action.payload,"action.payloadLike");
      state.totalLike=action.payload.total
      state.likedata=action.payload.data
    }).addCase((dislikeVideo.fulfilled),(state,action)=>{
      state.totalLike=action.payload.total
      state.likedata=action.payload.data
    }).addCase(subscribe.fulfilled,(state,action)=>{
      console.log(action.payload,"subscribeeer");
    state.subscribed=action.payload
    }).addCase(RemoveSubs.fulfilled,(state,action)=>{
      state.subscribed=action.payload
    }).addCase(GetSubs.fulfilled,(state,action)=>{
      state.subscribed=action.payload
    }).addCase(likeVideo.fulfilled,(state,action)=>{
      state.totalLike=action.payload.total
    })
  }
});

export const { LikeVideo, DisLikeVideo, isthreedotactive,isclickOutsidethreedot } = LikeSlice.actions;
export default LikeSlice.reducer;
