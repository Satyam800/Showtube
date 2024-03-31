import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBack2Fill } from "react-icons/ri";
import {
  deleteHistory,
  deleteList,
  watchHistory,
} from "../../Utils/historySlice";
import { Link } from "react-router-dom";

const HistoryCard = (props) => {
  const dispatch = useDispatch();
  const { data } = props;

  console.log(props, "card");

  const handleDelete = () => {
    dispatch(
      deleteHistory({
        userId: JSON.parse(localStorage.getItem("id"))._id,
        videoId: data.id,
      })
    );
  };
  return (
    <>
      <div className=" flex sm:w-[79%] w-[98%] rounded-lg sm:h-44 h-24 bg-slate-100">
        {data ? (
          <Link to={"/watch?v=" + data.id}>
            <img
              className=" w-40 h-38 rounded-md"
              alt="thumbnail"
              src={data?.snippet?.thumbnails?.high.url}
            />
          </Link>
        ) : null}
        <div
          className="flex flex-col sm:text-xl text-xs justify-between font-semibold ml-6
      "
        >
          {data?.snippet.title}
          <div className="m-3 font-serif text-sm text-slate-500">
            {data?.snippet.channelTitle}
          </div>
        </div>
        <span
          className="absolute flex align-baseline mt-[9%] font-bold ml-[65%] w-24 h-8 bg-black text-white rounded-r-xl p-0.3 hover:bg-stone-500"
          onClick={handleDelete}
        >
          {" "}
          Remove <RiDeleteBack2Fill size={32} />
        </span>
      </div>
    </>
  );
};

export default HistoryCard;
