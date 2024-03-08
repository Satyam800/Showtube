import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    isclicked: false,
    ModeOption:false
  },
  reducers: {
    OnClicked:(state,action)=>{
        state.isclicked=!state.isclicked

    },
    OutsideClick:(state,action)=>{
     state.isclicked=action.payload
    },
    ClickonMode:(state,action)=>{
    
      state.ModeOption=action.payload
      state.isclicked=false
    },
    RemoveModepopup:(state,action)=>{
      state.ModeOption=action.payload
    }
}})

export const { OnClicked,OutsideClick,ClickonMode,RemoveModepopup } = UserSlice.actions
export default UserSlice.reducer



