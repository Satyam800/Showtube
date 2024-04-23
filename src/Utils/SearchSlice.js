import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TitleData=JSON?.parse(localStorage?.getItem("videos"))?.map((i)=>i?.snippet?.channelTitle)


const SearchSlice = createSlice({
  name: "search",
  initialState: {
    event: "",
    Result: null,
    isOnFocus: false,
    isSearch:false,
    Searched:""
  },
  reducers: {
    SearchType: (state, action) => {
      state.event = action.payload;
    },
    fetchData: (state, action) => {
      const filterResult=TitleData.filter((i)=>{
        console.log(action.payload.url,"kjg");
        if(i.search(action.payload.url)!=-1) return i
      })
      state.Result =filterResult;
      console.log(filterResult, ";;");
    },
    ShowSuggestion: (state, action) => {
      state.isOnFocus = action.payload;
    },
    SearchSuggest:(state,action)=>{
      state.isSearch=action.payload
    },
    filterSearch:(state,action)=>{
      state.Searched=action.payload
    }
  },
});

export const { SearchType, SearchRes, ShowSuggestion,SearchSuggest ,fetchData,filterSearch} = SearchSlice.actions;
export default SearchSlice.reducer;
