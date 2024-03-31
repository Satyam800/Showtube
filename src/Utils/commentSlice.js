import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createcomment= createAsyncThunk("commment",async (data)=>{
    
  const res= await axios.post("http://localhost:3500/api/v1/comment",data)
  console.log(res,"first");
  return res.data.data
})

export const getData= createAsyncThunk("getcomment",async (data)=>{
  const res=await axios.post("http://localhost:3500/api/v1/getComment",data)
  console.log(res,"getcooment");
  return res.data.data
})

export const replyCreate= createAsyncThunk("replycreate",async (data)=>{
  console.log(data,"getreplird");
  const res=await axios.post("http://localhost:3500/api/v1/replyCreate",data)
  console.log(res,"replllllll");
 
  return res.data.data.comments
})

export const replyFirst= createAsyncThunk("replyfirstcreate",async (data)=>{
  console.log(data,"getreplird")
  const res=await axios.post("http://localhost:3500/api/v1/firstReply",data)
  console.log(res,"replllllll")
  return res.data.data
})

export const reply= createAsyncThunk("replies",async (data)=>{
  const res=await axios.post("http://localhost:3500/api/v1/replyComment",data)
  console.log(res,"getreplird");
  return res.data.data.comments
})

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentlist:[],
    replies:[]
  },
  reducers: { 
  },
  extraReducers:(builder)=>{
     builder.addCase(createcomment.fulfilled,(state,action)=>{
       state.commentlist=action.payload.reverse()
     }).addCase(getData.fulfilled,(state,action)=>{
      state.commentlist=action.payload
     }).addCase(reply.fulfilled,(state,action)=>{
      state.replies=action.payload
     }).addCase(replyCreate.fulfilled,(state,action)=>{
      state.replies=action?.payload
     }).addCase(replyFirst.fulfilled,(state,action)=>{
      state.commentlist=action.payload.reverse()
     })
  }
})
export const { } = commentSlice.actions;
export default commentSlice.reducer;

