import React, { useState,useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SearchSuggest } from "../Utils/SearchSlice";
import { ShowSuggestion } from "../Utils/SearchSlice";
import { filterSearch } from "../Utils/SearchSlice";
import { Link } from "react-router-dom";

const SearchSuggestion = () => {
  const SearchKey = useSelector((state) => state.search.Result)
  const [searchVideo,SetSearchVideo]=useState(false)
  const dispatch=useDispatch()
  const resultRef=useRef([])
  const onClickSuggestionVideo=()=>{
    console.log("cjanged");
  SetSearchVideo(true)
  dispatch(SearchSuggest(false))
  }

  const handlePresentResult=(i)=>{
console.log(resultRef[i]?.innerText,i,"kugug");
dispatch(filterSearch(resultRef[i]?.innerText))
dispatch(ShowSuggestion(false))
  }
  return (
    <>
      <div className=" w-[38%] h-auto ml-[22%] fixed rounded-md shadow-lg bg-slate-200 cursor-pointer">
        <ul>
          {SearchKey?.map((item,j) => {
            return (
              <div key={item} className="item-centre  hover:bg-gray-400 text-md font-semibold" ref={(item)=>resultRef[j]=item} onClick={onClickSuggestionVideo}>
               <Link to={"/search/" + item}> <li className="m-4 py-1"  onClick={()=>handlePresentResult(j)}>{item}</li></Link>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SearchSuggestion;
