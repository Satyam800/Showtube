import { createSlice } from "@reduxjs/toolkit";

const SubscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    isValue: false,
    unsubscribe:false,
    title:null
  },
  reducers: {
    isSubscribe:(state, action) => {
      state.isValue = action.payload;
    },
    ConfirmUnsubscribe:(state,action)=>{
        state.unsubscribe=action.payload
    },
    Channeltitle:(state,action)=>{
      state.title=action.payload
    }
  },
 
});

export const { isSubscribe,ConfirmUnsubscribe,Channeltitle} = SubscribeSlice.actions;
export const isSubscribestate= ((store)=>store.subscribe.isValue)
export default SubscribeSlice.reducer;
