import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  watchHistory,
  historyArray,
  deleteList,
} from "../../Utils/historySlice";
import HistoryCard from "./HistoryCard";
import { VideoArray } from "../../Utils/ItemSlice";
import { VideoApi } from "../../Utils/Constant";
import { MdOndemandVideo } from "react-icons/md";
import { Link } from "react-router-dom";
import Header from "../Header";
const WatchHistory = () => {
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem("id"));
  const history = useSelector((store) => store.history?.Id);
  const itemArray = JSON.parse(localStorage.getItem("videos"));
  const isdelete = useSelector((store) => store.history.delete);
  let filterList = [];

  itemArray.map((i) => {
    history?.map((j) => {
      if (i?.id == j) {
        filterList.push(i);
      }
    });
  });

  useEffect(() => {
    dispatch(deleteList(false));
  }, [history]);

  console.log("mmm");
  useEffect(() => {
    dispatch(
      watchHistory({
        userId: id?._id,
      })
    );
  }, []);

  console.log(filterList, "filterList");
  return (
    <>
      <Header />
      <div className="sm:flex flex-col  ">
        <div className="absolute  sm:top-12 top-16 sm:w-[22%] sm:h-30 w-[32%] h-34 rounded-lg sm:m-4 m-1 ">
          {filterList ? (
            <img
              className=" "
              src={filterList?.[0]?.snippet?.thumbnails?.high.url}
              alt="thumbnail"
            />
          ) : (
            "No any video"
          )}
          <div className="flex font-bold sm:ml-6 ml-3 ">
            Total {filterList?.length} video{" "}
            <span>
              <MdOndemandVideo className="sm:m-1 ml-4" size={22} />
            </span>
          </div>
        </div>
        <div>
          <div className="absolute sm:top-[6%] top-[25%] sm:w-[60%] sm:ml-[30%] ml-2  w-[95%]   h-full flex flex-col gap-y-3">
            {filterList?.map((i) => {
              return <HistoryCard data={i} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchHistory;
