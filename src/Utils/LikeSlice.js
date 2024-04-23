import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./Constant";

export const likeVideo=createAsyncThunk("like",async(data)=>{
  const res= await axios.post(URL+"/likevideo",data)
  return res.data
})

export const getlikeVideo=createAsyncThunk("liked",async(data)=>{
  const res= await axios.post (URL+"/likedata",data)
  console.log(res.data.data,"getliked");
  return res.data
})

export const dislikeVideo=createAsyncThunk("dislike",async(data)=>{
  const res= await axios.post(URL+"/dislike",data)
  return res.data
})

export const subscribe=createAsyncThunk("subscribe",async(data)=>{
  const res= await axios.post(URL+"/subscribe",data)

  return res.data.data
})

export const RemoveSubs=createAsyncThunk("unsubscribe",async(data)=>{
  const res= await axios.post(URL+"/unsubscribe",data)

  return res.data.data
}) 

export const GetSubs=createAsyncThunk("getallsubscribe",async(data)=>{
  const res= await axios.post(URL+"/list",data)

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
