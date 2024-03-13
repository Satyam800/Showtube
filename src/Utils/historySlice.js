import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer'+ localStorage.getItem("token"), // Add any other headers you need
}

export const HistoryArray=createAsyncThunk("add",async(data)=>{
console.log(data,"historySlice");
const res= await axios.post('http://localhost:3500/api/v1/createHistory',data,headers)

console.log(res.data,"watch");
})

export const watchHistory=createAsyncThunk("history",async(data)=>{
  const res=await axios.post('http://localhost:3500/api/v1/watchHistory',data,headers)
  console.log(res.data,"watchhistory");
  return res.data
})

const historySlice = createSlice({
  name: "history",
  initialState: {
    Id:[]
  },
  reducers: {
    historyArray: (state, action) => {
      
    },
  },

  extraReducers:(builder)=>{
    builder.addCase(watchHistory.fulfilled,(state,action)=>{
      console.log(action.payload.data.videoId,"history");
        state.Id=action.payload.data.videoId
    })
  }
})



export const {} = historySlice.actions
export default historySlice.reducer