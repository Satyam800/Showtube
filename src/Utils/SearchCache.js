import { createSlice } from "@reduxjs/toolkit";

const SearchCache = createSlice({
  name: "cache",
  initialState: {},
  reducers: {

    CacheTheResult:(state,action)=>{
        
        state=Object.assign(state , action.payload)
       
        console.log(state,"action.payload")


        
    }
  
  },
});

export const { CacheTheResult } = SearchCache.actions;
export default SearchCache.reducer;