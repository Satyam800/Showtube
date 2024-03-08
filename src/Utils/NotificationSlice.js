import { createSlice } from "@reduxjs/toolkit";
import {isSubscribe,ConfirmUnsubscribe,Channeltitle}from './SubscribeSlice'


const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    text: null,
  },
  reducers: {
   
  },
  extraReducers:{
      [isSubscribe]:(state,action)=>{
        console.log('subscribed');
       state.text="Subscribed"
      },
      
  }
});


export default NotificationSlice.reducer;