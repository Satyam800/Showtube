import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./Constant";

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer'+ localStorage.getItem("token"), // Add any other headers you need
}

export const HistoryArray=createAsyncThunk("add",async(data)=>{

const res= await axios.post(URL+'/createHistory',data,headers)

console.log(res.data,"watch");
})



export const watchHistory=createAsyncThunk("history",async(data)=>{
  const res=await axios.post(URL+'/watchHistory',data,headers)
  console.log(res.data,"watchhistory");
  return res.data
})

export const deleteHistory=createAsyncThunk("delete",async(data)=>{

  const res= await axios.post(URL+'/deleteHistory',data,headers)
  console.log(res.data,"jjkkkll");
  return res.data.data.videoId 
  console.log(res.data,"watch");
  })
  

const historySlice = createSlice({
  name: "history",
  initialState: {
    Id:[],
    video:[],
    delete:false
  },
  reducers: {
    historyArray: (state, action) => {
     state.video.push(action.payload)
    },
    deleteList:(state,action)=>{
      state.delete=action.payload
    }
  },

  extraReducers:(builder)=>{
    builder.addCase(watchHistory.fulfilled,(state,action)=>{
      console.log(action.payload.data?.videoId,"history");
        state.Id=action.payload.data?.videoId
    }).addCase(deleteHistory.fulfilled,(state,action)=>{
      state.Id=action.payload
    })
  }
})



export const {historyArray,deleteList} = historySlice.actions
export default historySlice.reducer