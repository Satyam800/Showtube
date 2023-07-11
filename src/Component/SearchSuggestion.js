import React from "react";
import { useSelector } from "react-redux";

const SearchSuggestion = () => {
  const SearchKey = useSelector((state) => state.search.Result);
  return (
    <>
      <div className="bg-white w-[38%] h-auto ml-[22%] fixed rounded-md shadow-lg ">
        <ul>
          {SearchKey?.map((item) => {
            return (
              <div className="item-centre  hover:bg-gray-400 text-md font-semibold">
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
