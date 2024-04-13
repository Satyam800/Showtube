import React, { useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import SearchSuggestion from "./SearchSuggestion";
import { SearchSuggest } from "../Utils/SearchSlice";

import { useSelector } from "react-redux";

const ButtonList = () => {
  const Searchdata = useSelector((state) => state.search?.event);
  const showSearchSuggestion = useSelector((state) => state.search.isOnFocus);
  console.log(showSearchSuggestion, "mbnvcx");
  
  useEffect(()=>{
   

  },[])

  return (
    <>
      <div className="grid grid-flow-col content-center justify-items-center  w-[92%] h-20 shadow-sm bg-white fixed sm:top-[9%] top-[13%] pl-8 ml-[8%] rounded-lg ">
        <div className="h-full w-1/2 bg-gray-300 rounded-2xl text-center">
          a
        </div>
        <div className="h-full w-1/2 bg-gray-300 rounded-2xl text-center">
          b
        </div>
        <div className="h-full w-1/2 bg-gray-300 rounded-2xl text-center">
          c
        </div>
        <div className="h-full w-1/2 bg-gray-300 rounded-2xl text-center">
          d
        </div>
      
       

        <span className=" w-[20%]  hover:bg-gray-300 hover:rounded-xl text-center">
          <BsFillArrowRightCircleFill size="22" />
        </span>
      </div>
    </>
  );
};

export default ButtonList;
