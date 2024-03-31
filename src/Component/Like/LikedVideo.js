
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getlikeVideo} from "../../Utils/LikeSlice"
import { MdOndemandVideo } from "react-icons/md";
import { Link } from "react-router-dom";
import LikeCard from "./Likecard";
import Header from "../Header";
const LikedVideo = () => {
const dispatch = useDispatch();
const id = JSON.parse(localStorage.getItem("id"));
const like= useSelector((store)=>store.like.likedata)
const itemArray = JSON.parse(localStorage.getItem("videos"))
console.log(like,"like")
  let filterList=[]
  itemArray.map((i)=>{
    like?.map((j)=>{     
      if(i?.id==j.videoId){
      filterList.push(i)
    }
    })
  })  
useEffect(()=>{

},[like])
  useEffect(() => {
    dispatch(
        getlikeVideo({
        userId:id?._id,
      })
    )
  },[])
  return (
    <>
    <Header/>
      <div className="sm:flex flex-col ">
        <div className="fixed sm:top-[10%] top-1 sm:w-[22%] sm:h-30 w-[32%] h-34 rounded-lg sm:m-4 m-1 ">
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
          <Link>
            <div className="absolute sm:mt-4 sm:w-[60%] sm:ml-[30%] ml-2 mt-[38%] w-[95%]   h-full flex flex-col gap-y-3">
              {filterList?.map((i) => {
                return <LikeCard data={i} key={i} />;
              })}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};



export default LikedVideo