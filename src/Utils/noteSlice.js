import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./Constant";

export const createNotes=createAsyncThunk("notes",async(data)=>{
console.log(data,"notesSlice");
const res=await axios.post(URL+"/createnote",data)
console.log(res.data.datas,"resnorew");
return res.data.datas
})

export const getNotes=createAsyncThunk("get",async(data)=>{
    const res=await axios.post(URL+"/getnotes",data)
    return res.data.datas
})
export const deleteNotes=createAsyncThunk("delete",async(data)=>{
    console.log(data,"delete");
    const res=await axios.post(URL+"/deletenote",data)
    return res.data.datas
})

export const updateNotes=createAsyncThunk("update",async(data)=>{
    console.log(data,"update");
    const res=await axios.put(URL+"/updatenote",data)
    return res.data.datas
})

const NoteSlice = createSlice({
  name: "notes",
  initialState: {
  data:[],
  time:""
  },
  reducers: {
    time:(state,action)=>{
    state.time=action.payload
    }
  },

  extraReducers:(builder)=>{
    builder.addCase(createNotes.fulfilled,(state,action)=>{
       state.data=action.payload
    }).addCase(getNotes.fulfilled,(state,action)=>{
        state.data=action.payload
    }).addCase(deleteNotes.fulfilled,(state,action)=>{
        state.data=action.payload
    }).addCase(updateNotes.fulfilled,(state,action)=>{
        state.data=action.payload
    })
 }
});



export const {time } = NoteSlice.actions;
export default NoteSlice.reducer;