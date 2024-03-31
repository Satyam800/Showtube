import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer'+ localStorage.getItem("token"), // Add any other headers you need
}

export const createPlaylist=createAsyncThunk("create",async(data)=>{
console.log(data,"playlistSlice");
const res= await axios.post('http://localhost:3500/api/v1/createPlaylist',data,headers)
console.log(res.data,"watch");
return res.data.data
})



export const playlist=createAsyncThunk("playlist",async(data)=>{
  const res=await axios.post('http://localhost:3500/api/v1/fetchPlaylist',data,headers)
  console.log(res.data,"fetchPlaylist");
  return res.data
})

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
   list:[]
  },
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder.addCase(playlist.fulfilled,(state,action)=>{
      console.log(action.payload,"playlist");
        state.list=action.payload?.data
    }).addCase(createPlaylist.fulfilled,(state,action)=>{
      state.list=action.payload
    })
  }
})



export const {} = playlistSlice.actions
export default playlistSlice.reducer