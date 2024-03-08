import React, { useState, useEffect, useRef } from "react";
import { useSearchParams,useLocation } from "react-router-dom";
import { closeMenu } from "../Utils/HembegerSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";
import { RiShareForwardLine } from "react-icons/ri";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Channeltitle } from "../Utils/SubscribeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  LikeVideo,
  DisLikeVideo,
  isthreedotactive,
  isclickOutsidethreedot,
} from "../Utils/LikeSlice";
import CommentContainer from "../features/Commentbox";
import Comment_List from "../features/Comment_List";
import { isSubscribe, ConfirmUnsubscribe } from "../Utils/SubscribeSlice";
import { ImTextColor } from "react-icons/im";
import Header from "./Header";

const WatchPage = () => {
  let VideoItem = useSelector((store) => store.video?.Item);
  let isLike = useSelector((store) => store.like?.isLike);
  let isdislike = useSelector((store) => store.like?.isdislike);
  let isthreedot = useSelector((store) => store.like?.isthreedot);
  let Subscribed = useSelector((store) => store.subscribe.isValue);
  let unsubscribe = useSelector((store) => store.subscribe.unsubscribe);
  let Channeltitlename = useSelector((store) => store.subscribe.title);
  const notificationMessage = useSelector((store) => store.notification?.text);
  const location=useLocation()
  const popupRef = useRef(null);
  const overlayRef = useRef(null);
  const [searchParam] = useSearchParams();
  let dispatch = useDispatch();
 console.log(location,"lo");
  let title = VideoItem?.filter((item) => {
    if (searchParam.get("v") == item.id) {
      dispatch(Channeltitle(item?.snippet.channelTitle));
      return item?.snippet.title;
    }
  });

  console.log(typeof searchParam.get("v"), "id");

  console.log(title, "kaLI");

  useEffect(() => {
    dispatch(closeMenu());
    dispatch(ConfirmUnsubscribe(false)); // for overlay diappear, when we again go into the page, when we do not cut or cancel the overlay page
  }, []);

  const handleSubscribe = () => {
    dispatch(isSubscribe(true));
    setTimeout(() => {
      toast(notificationMessage, {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "foo-bar",
      });
    }, 500);
  };

  const DoUnsubscribe = () => {
    dispatch(ConfirmUnsubscribe(true));
  };

  const handleSubscribed = () => {
    dispatch(isSubscribe(false));
    dispatch(ConfirmUnsubscribe(false));
  };

  const handledisappearpopup = (e) => {
    if (!popupRef.current?.contains(e.target)) {
      console.log("outside");
      dispatch(ConfirmUnsubscribe(false));
    }
  };

  const handlecancelUnsubscribe = () => {
    dispatch(ConfirmUnsubscribe(false));
  };

  const [box, setbox] = useState([]);
  const [contain, setcontain] = useState([]);
  const [isactive, setisactive] = useState(false);
  const handlebox = (e) => {
    if (box.length == 4) {
      for (let i = 0; i <= 3; i++) {
        if (box[i] == null) {
          box[i] = e.target.innerText;
          setbox([...box]);
          return;
        }
      }
    } else {
      if (box.length > 3) {
        return;
      }
      setbox((prev) => [...prev, e.target.innerText]);
    }
  };

  const handlecut = (e) => {
    console.log(e, "ll");

    let b = box.map((i) => {
      if (i == e.target.innerText) {
        return null;
      } else {
        return i;
      }
    });
    e.target.innerText = null;

    setbox([...b]);
  };

  useEffect((box) => {
    if (box?.length <= 3) {
      const handlenull = (event) => {
        event.stopPropagation();
        event.target.innerText = null;
      };
      document.addEventListener("click", handlenull);
    }
  }, []);

  return (
    <>
    <Header />
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
      <div className=" bg-white text-xl font-semibold pl-4 mb-4">
        {title?.map((item) => {
          return item?.snippet.title;
        })}
      </div>

      <div className=" w-[90%]  ">
        <div className=" flex space-x-6 align-baseline  ">
          <div className="h-12 w-12  rounded-full">
            <img
              className="h-10 w-10  rounded-full m-1"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmKQkHxZUb53_2bH10WewJDiod9PutnPWaLw&usqp=CAU"
            />
          </div>

          <div className=" text-xl font-semibold ">
            {title?.map((item) => {
              return item?.snippet.channelTitle;
            })}
          </div>

          <div className="">
            {Subscribed ? (
              <div
                className="flex  space-x-1 w-32 h-9 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 rounded-2xl  font-semibold cursor-pointer self-center pl-3 pt-1"
                onClick={DoUnsubscribe}
              >
                <div>Subscribed</div>
                <div className="">
                  <IoIosArrowDropdownCircle size={24} />
                </div>
              </div>
            ) : (
              <div
                className="w-24 h-9 bg-black rounded-2xl text-white font-semibold cursor-pointer self-center pl-3 pt-1"
                onClick={handleSubscribe}
              >
                Subscribe
              </div>
            )}
          </div>
        </div>

        <div className="flex  w-[30%] justify-between  sm:space-x-1  ml-12 mt-5 sm:ml-2">
          <div className=" flex   ">
            <div
              className="flex w-24 h-8 rounded-l-2xl bg-gray-400 hover:bg-slate-500 items-center pl-8 border-r-2 border-gray-500 sm:w-16 "
              onClick={(e) => {
                dispatch(LikeVideo());
                console.log("calles1");
              }}
            >
              {isLike ? <AiFillLike size={24} /> : <BiLike size={24} />}
            </div>

            <div
              className="flex w-12 bg-gray-400 h-8 rounded-r-2xl hover:bg-slate-500 items-center  pl-1 "
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

          <div className="flex w-16 h-8 bg-slate-400 hover:bg-slate-500 items-center rounded-2xl pl-4 ">
            <CgPlayListAdd size={24} />
          </div>

          <div className="flex w-24 h-8 bg-slate-400 hover:bg-slate-500 items-center rounded-2xl pl-4">
            <RiShareForwardLine size={24} />

            <div className="font-semibold ">Share</div>
          </div>

          <div
            className="flex w-9 h-8 bg-slate-400 hover:bg-slate-500 items-center rounded-full pl-1 "
            onClick={(e) => {
              dispatch(isthreedotactive());
            }}
          >
            <div>
              <BsThreeDots size={24} />
            </div>

            {isthreedot && (
              <div
                className="  bg-slate-200 relative  mb-4 sm:bottom-12 w-40 h-40 rounded-xl    font-bold "
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
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
        <CommentContainer />
      </div>

      <div>
        <Comment_List />
      </div>

      {/* Overlay of unsubscribe */}

      {unsubscribe ? (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-40"
          ref={overlayRef}
          onClick={handledisappearpopup}
        >
          <div
            className="sticky mt-[25%] ml-[40%] bg-white shadow-lg max-w-[22%] h-[18%] rounded-xl text-center"
            ref={popupRef}
          >
            <div className="pt-5"> Unsubscribe from {Channeltitlename} ? </div>
            <div className=" flex justify-evenly m-12 pl-14 ">
              <div
                className="w-22 h-6 font-semibold rounded-lg hover:bg-slate-300 cursor-pointer mr-2"
                onClick={handlecancelUnsubscribe}
              >
                Cancel
              </div>
              <div
                className="w-26 h-7 pl-1 font-semibold rounded-xl text-blue-500 hover:bg-blue-100 cursor-pointer"
                onClick={handleSubscribed}
              >
                Unsubscribe
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <ToastContainer
        autoClose={2000}
        toastStyle={{
          borderRadius: "100px",
          backgroundColor: "black",
          color: "white",
        }}
      />
    </>
  );
};

export default WatchPage;
