import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    event: "",
    Result: null,
    isOnFocus: false,
  },
  reducers: {
    SearchType: (state, action) => {
      state.event = action.payload;
    },
    SearchRes: (state, action) => {
      state.Result = action.payload;
      console.log(action.payload, ";;");
    },

    ShowSuggestion: (state, action) => {
      state.isOnFocus = action.payload;
    },
  },
});

export const { SearchType, SearchRes, ShowSuggestion } = SearchSlice.actions;
export default SearchSlice.reducer;
