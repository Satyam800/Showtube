import React from "react";
import { useSelector } from "react-redux";
import { RiDeleteBack2Fill } from "react-icons/ri";

import { Link } from "react-router-dom";

const HistoryCard = (props) => {
  const { data } = props;

  console.log(props, "card");
  return (
    <>
      <div className=" flex w-[79%] rounded-lg h-44 bg-slate-100">
        <img
          className="w-34 h-full rounded-md"
          alt="thumbnail"
          src={data?.snippet?.thumbnails?.high.url}
        />

        <div className="flex flex-col justify-between font-semibold ml-6">
          {data?.snippet.title}
          <div className="m-3 font-serif text-sm text-slate-500">
            {data?.snippet.channelTitle}
          </div>
        </div>

        <span className="absolute flex align-baseline mt-[10%] font-bold ml-[65%] w-24 h-8 bg-black text-white rounded-r-xl p-0.3 hover:bg-stone-500">
          {" "}
          Remove <RiDeleteBack2Fill size={32} />
        </span>
      </div>
    </>
  );
};

export default HistoryCard;
