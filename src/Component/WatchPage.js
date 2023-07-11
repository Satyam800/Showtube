import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../Utils/HembegerSlice";
import { useDispatch, useSelector } from "react-redux";
import Shimmer from "../Utils/Shimmer";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";
import { RiShareForwardLine } from "react-icons/ri";
import { LikeVideo, DisLikeVideo, isthreedotactive,isclickOutsidethreedot } from "../Utils/LikeSlice";
import  { CommentList } from "./Comment";
import { CommentContainer } from "./Comment";
import Form from "./Form";

const WatchPage = () => {
  let VideoItem = useSelector((store) => store.video?.Item);
  let isLike = useSelector((store) => store.like?.isLike);
  let isdislike = useSelector((store) => store.like?.isdislike);
  let isthreedot = useSelector((store) => store.like?.isthreedot);
  
  const [searchParam] = useSearchParams();

  // document.addEventListener("click",(e)=>{
  //   console.log("clicked");
  //   dispatch(isclickOutsidethreedot(true))
  //   e.stopPropagation()
  // },true)
// click outside the div

  let title = VideoItem?.filter((item) => {
    if (searchParam.get("v") == item.id) {
      return item?.snippet.title;
    }
  });

  console.log(typeof searchParam.get("v"), "id");

  let dispatch = useDispatch();
  console.log(VideoItem, "kaLI");

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  
  console.log("hello");

  return (
    <>
     
        <div className="w-full h-[70%] mt-[4%] p-4 ">
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/" + searchParam.get("v")}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;
    gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div className=" bg-white text-xl font-semibold pl-7 m-3">
          {title?.map((item) => {
            return item?.snippet.title;
          })}
        </div>

        <div className="w-[60%]  grid grid-cols-10 grid-flow-col  ">
          <div className="col-span-4 flex justify-evenly ml-3 ">
            <div className="h-12 w-12  rounded-full">
              <img
                className="h-10 w-10  rounded-full m-1"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmKQkHxZUb53_2bH10WewJDiod9PutnPWaLw&usqp=CAU"
              />
            </div>

            <div className="text-xl font-semibold self-center">
              {title?.map((item) => {
                return item?.snippet.channelTitle;
              })}
            </div>

            <div className="w-24 h-9 bg-black rounded-2xl text-white font-semibold cursor-pointer self-center pl-3 pt-1">
              Subscribe
            </div>
          </div>

          <div className="col-span-6 flex items-center justify-evenly">
            <div className="flex">
              <div
                className="flex w-24 h-8 rounded-l-2xl bg-gray-400 hover:bg-slate-500 items-center pl-8 border-r-2 border-gray-500 "
                onClick={(e) => {
                  dispatch(LikeVideo());
                  console.log("calles1");
                }}
              >
                {isLike ? <AiFillLike size={24} /> : <BiLike size={24} />}
              </div>

              <div
                className="flex w-12 bg-gray-400 h-8 rounded-r-2xl hover:bg-slate-500 items-center  pl-1"
                onClick={() => {
                  dispatch(DisLikeVideo());
                  console.log("called2");
                }}
              >
                {isdislike ? (
                  <AiTwotoneDislike size={24} />
                ) : (
                  <AiOutlineDislike size={24} />
                )}
              </div>
            </div>

            <div className="flex w-16 h-8 bg-slate-400 hover:bg-slate-500 items-center rounded-2xl pl-4">
              <CgPlayListAdd size={24} />
            </div>

            <div className="flex w-24 h-8 bg-slate-400 hover:bg-slate-500 items-center rounded-2xl pl-4">
              <RiShareForwardLine size={24} />

              <div className="font-semibold ">Share</div>
            </div>

            <div className="flex w-9 h-8 bg-slate-400 hover:bg-slate-500 items-center rounded-full pl-1.5" onClick={(e) => {
                   
                  dispatch(isthreedotactive());
                }}>
              <BsThreeDots
                size={24}
                
              />

              {isthreedot && (
                <div className="flex  bg-slate-200 bottom-4 absolute w-40 h-40 rounded-xl    font-bold" onClick={(e)=>{
                  e.stopPropagation()
                }}>
                  <ul className="flex flex-col w-full  ">
                    <li className=" h-[25%]  hover:bg-slate-100">Clip</li>
                    <li className=" h-[25%] hover:bg-slate-100">Save</li>
                    <li className=" h-[25%] hover:bg-slate-100">
                      Show transcript
                    </li>
                    <li className=" h-[25%] hover:bg-slate-100">Report</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>


            

         <div className="">
      
         <CommentList/>
         <CommentContainer/>
         
         </div>
 
        <Form/>
   
    </>
  );
};

export default WatchPage;
