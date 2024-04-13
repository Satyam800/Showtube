import { createSlice } from "@reduxjs/toolkit";
import {isSubscribe,ConfirmUnsubscribe,Channeltitle}from './SubscribeSlice'


const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    text: [],
  },
  reducers: {
    insert:(state,action)=>{
      state.text.push(action.payload)
    }
  },
  extraReducers:{
      [isSubscribe]:(state,action)=>{
        console.log('subscribed');
       state.text="Subscribed"
      },
  }
})

export const {insert} = NotificationSlice.actions;
export default NotificationSlice.reducer;