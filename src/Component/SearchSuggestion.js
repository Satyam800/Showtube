import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SearchSuggest } from "../Utils/SearchSlice";

const SearchSuggestion = () => {
  const SearchKey = useSelector((state) => state.search.Result)
  const [searchVideo,SetSearchVideo]=useState(false)
  const dispatch=useDispatch()
  const onClickSuggestionVideo=()=>{
    console.log("cjanged");
  SetSearchVideo(true)
  dispatch(SearchSuggest(false))
  }
  return (
    <>
      <div className=" w-[38%] h-auto ml-[22%] fixed rounded-md shadow-lg bg-slate-200 cursor-pointer">
        <ul>
          {SearchKey?.map((item) => {
            return (
              <div className="item-centre  hover:bg-gray-400 text-md font-semibold" onClick={onClickSuggestionVideo}>
                <li className="m-4 py-1">{item}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SearchSuggestion;
