import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import SearchSuggestion from "./SearchSuggestion";

import { useSelector } from "react-redux";

const ButtonList = () => {
  const Searchdata = useSelector((state) => state.search?.event);
  const showSearchSuggestion = useSelector((state) => state.search.isOnFocus);
  console.log(showSearchSuggestion, "mbnvcx");
  return (
    <>
      <div className="grid grid-flow-col content-center justify-items-center  w-[92%] h-20 shadow-lg bg-slate-100 fixed top-[9%] pl-8 ml-[8%] rounded-lg ">
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
        <div className="h-full w-1/2 bg-gray-300 rounded-2xl text-center">
          e
        </div>
        <div className="h-full w-1/2 bg-gray-300 rounded-2xl text-center">
          f
        </div>
        <div className="h-full w-1/2 bg-gray-300 rounded-2xl text-center">
          g
        </div>

        <span className=" w-[20%]  hover:bg-gray-300 hover:rounded-xl text-center">
          <BsFillArrowRightCircleFill size="22" />
        </span>
      </div>
    </>
  );
};

export default ButtonList;
