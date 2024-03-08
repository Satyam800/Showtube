import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import { VideoApi } from "../Utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { VideoArray } from "../Utils/ItemSlice";
import { Link,useLocation } from "react-router-dom";
import Shimmer from "../Utils/Shimmer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VideoContainer = () => {
  let VideoItem = useSelector((store) => store.video?.Item);
  const location= useLocation()
  console.log(location,"location");

  return (
    <>
      {VideoItem == null ? (
        <SkeletonTheme
          baseColor="#dbe3ef"
          highlightColor="#FDFDFD"
          borderRadius={"8px"}
        >
          <div className=" fixed flex flex-wrap justify-evely gap-6 ml-[9%] mt-[10%]  ">
         {
          Array(12).fill('').map((i)=>{
            return <Skeleton width={"300px"} height={"200px"} className="z-0" />
          })
         }
                       
          </div>
        </SkeletonTheme>
      ) : (
        <div className="flex  flex-wrap w-[90%] ml-[9%] mt-[10%] ">
          {VideoItem?.map((item) => {
            return (
              <Link to={"/watch?v=" + item.id}>
                <VideoCard thumbnail={item.snippet?.thumbnails} item={item} key={item.id}/>
              </Link>
            );
          })}
        </div>
      )}

      <div className="absolute">
        <Shimmer />
      </div>
    </>
  );
};

export default VideoContainer;
