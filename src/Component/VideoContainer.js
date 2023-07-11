import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import { VideoApi } from "../Utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { VideoArray } from "../Utils/ItemSlice";
import { Link } from "react-router-dom";
import Shimmer from "../Utils/Shimmer";

const VideoContainer = () => {
  let VideoItem = useSelector((store) => store.video?.Item);
  console.log(VideoItem, "item");

  return (
    <>
      <div className="flex  flex-wrap w-[90%] ml-[9%] mt-[10%] ">
        {VideoItem?.map((item) => {
          return (
            <Link to={"/watch?v=" + item.id}>
              <VideoCard thumbnail={item.snippet?.thumbnails} item={item} />
            </Link>
          );
        })}
      </div>

      <div className="absolute">
        <Shimmer />
      </div>
    </>
  );
};

export default VideoContainer;
