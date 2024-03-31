import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams, useLocation } from "react-router-dom";
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
import { HistoryArray } from "../Utils/historySlice";
import ReactPlayer from "react-player";
import {
  LikeVideo,
  DisLikeVideo,
  isthreedotactive,
  isclickOutsidethreedot,
} from "../Utils/LikeSlice";
import CommentContainer from "../features/Commentbox";

import { isSubscribe, ConfirmUnsubscribe } from "../Utils/SubscribeSlice";
import { ImTextColor } from "react-icons/im";
import Header from "./Header";
import { MdPlaylistAdd } from "react-icons/md";
import { historyArray } from "../Utils/historySlice";
import { MdOutlineWatchLater } from "react-icons/md";
import { BsEmojiGrin } from "react-icons/bs";
import SharePopup from "./Share/sharePopup";
import { Share,list} from "../Utils/HembegerSlice";
import Playlist from "./Playlist/Playlist";
import { likeVideo,getlikeVideo,dislikeVideo } from "../Utils/LikeSlice";
import { MdPlaylistPlay } from "react-icons/md";
import { createcomment } from "../Utils/commentSlice";
import CommentList from "../features/CommentList";
import { getData } from "../Utils/commentSlice";
import CommentCard from "../features/CommentCard";
const WatchPage = () => {
  let VideoItem = useSelector((store) => store.video?.Item);
 
  let isdislike = useSelector((store) => store.like?.isdislike);
  let isthreedot = useSelector((store) => store.like?.isthreedot);
  let Subscribed = useSelector((store) => store.subscribe.isValue);
  let unsubscribe = useSelector((store) => store.subscribe.unsubscribe);
  let Channeltitlename = useSelector((store) => store.subscribe.title);
  const notificationMessage = useSelector((store) => store.notification?.text);
  const location = useLocation();
  const popupRef = useRef(null);
  const overlayRef = useRef(null);
  const timeRef = useRef();
  const [searchParam] = useSearchParams();
  const shareRef = useRef();
  const [isShare, SetisShare] = useState(false);
  const params = useParams();
  const [playlist, Setplaylist] = useState(false);
  const [dislike,Setdislike]=useState(null)
  const isPlaylist=useSelector(store=>store.Icon.Playlist)
  const data = useSelector((store) => store.comment.replies);
  let dispatch = useDispatch();
  const Commentdata = useSelector((store) => store.comment.commentlist);
  
  useEffect(()=>{
console.log(data,Commentdata);
  },[data,Commentdata])

  let title = VideoItem?.filter((item) => {
    if (searchParam.get("v") == item.id) {
      dispatch(Channeltitle(item?.snippet.channelTitle));
      return item?.snippet.title;
    }
  });

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    dispatch(closeMenu());
    dispatch(ConfirmUnsubscribe(false)); // for overlay diappear, when we again go into the page, when we do not cut or cancel the overlay page
  }, [])

  const handleSubscribe = () => {
    console.log(searchParam, "Sebscribe");
    dispatch(isSubscribe(true));
    setTimeout(() => {
      toast(notificationMessage, {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "foo-bar",
      })
    }, 500)
  }

  const DoUnsubscribe = () => {
    dispatch(ConfirmUnsubscribe(true));
  }

  const handleSubscribed = () => {
    console.log(timeRef.current, "timeRef");
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

  const handleStart = () => {
    dispatch(
      HistoryArray({
        videoId: searchParam.get("v"),
        userId: JSON.parse(localStorage.getItem("id"))._id,
      })
    );
  };

  const src =
    "https://www.youtube.com/embed/" + searchParam.get("v") + "?&autoplay=1";

  useEffect(() => {
    dispatch(getlikeVideo({
      user:JSON.parse(localStorage.getItem("id"))._id
    }))
    dispatch(Share(false));
  }, []);

  const onShare = () => {
    dispatch(Share(true));
  };

  const isShareActive = useSelector((store) => store.Icon.share);

  const handlePlaylist=()=>{
dispatch(list(true))
  }

  
    useEffect(() => {
      dispatch(
        getData({
          commentable: searchParam.get("v"),
          onModel: "Comment",
        })
      );
    }, []);
  

  const getLikeData=useSelector(store=>store.like.likedata)
  const [isLike,SetisLike]=useState("")
  useEffect(()=>{
const isLiked=getLikeData.filter((i)=>{
if(i.videoId==searchParam.get("v")){
  return true
}
console.log(i,"islike")
}) 

if(isLiked.length==1){
  SetisLike(true)
  Setdislike(false)
}
else{
  SetisLike(false)
  Setdislike(true)
}
  },[getLikeData])
 
  return (
    <>
      {isShareActive ? (
        <div className="fixed  w-full h-full bg-black opacity-80">
          <SharePopup />
        </div>
      ) : null}
         
      <Header/>
      <div className="sm:w-[70%] sm:h-[70%] w-full h-[45%] sm:mt-[5%] mt-[24%] p-4  ">
        <ReactPlayer
          url={src}
          width="690px"
          height="400px"
          allowfullscreen="true"
          title="YouTube video player"
          controls="true"
          playing="true"
          onStart={handleStart}
        />
      </div>
      <div className=" bg-white text-xl font-semibold pl-4 mb-4 mt-9 ">
        {title?.map((item) => {
          return item?.snippet.title
        })}
      </div>
      <div className=" w-[90%]">
        <div className=" flex space-x-6 align-baseline  ">
          <div className="h-12 w-12  rounded-full">
            <img
              className="h-10 w-10  rounded-full m-1"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmKQkHxZUb53_2bH10WewJDiod9PutnPWaLw&usqp=CAU"
            />
          </div>           
          <div className="text-xl font-semibold ">
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

        <div className="flex  sm:w-[25%] w-[65%] cursor-pointer justify-evenly  sm:space-x-1  ml-6 mt-5 sm:ml-2">
          <div className=" flex   ">
            <div
              className="flex w-24 h-8 rounded-2xl bg-gray-400 hover:bg-slate-500 items-center pl-5 border-r-2 border-gray-500 sm:w-16 "
              onClick={()=> {              
                if(isLike==true){
                  dispatch(dislikeVideo({
                  userId:JSON.parse(localStorage.getItem("id"))._id,
                  videoId:searchParam.get("v")
                  }))
                  console.log("disllikee")
                  SetisLike(false)
                return
                }                
                SetisLike(true)               
                dispatch(likeVideo({
                  userId:JSON.parse(localStorage.getItem("id"))._id,
                  videoId:searchParam.get("v")
                }))   
              }}
            >
              {isLike ? <AiFillLike size={24} /> : <BiLike size={24} />}
            </div>
          </div>

          <div
            className="flex w-16 h-8 bg-slate-400 hover:bg-slate-500 items-center rounded-2xl pl-4 "
            onClick={handlePlaylist}
          >
            <CgPlayListAdd size={24} />
          </div>

          <div
            className="flex w-24 h-8 bg-slate-400 hover:bg-slate-500 items-center rounded-2xl pl-4"
            onClick={onShare}
          >
            <RiShareForwardLine size={24} />
            <div className="font-semibold ">Share</div>
          </div>  


        </div>
      </div>

      <div className="">
        <CommentContainer/>
      </div>
      {console.log(Commentdata,"commentdata")}
     <div className="flex w-[70%] h-auto">
     <div className="flex flex-col h-auto w-[80%] ">
        {Commentdata?.map((i,j) =>{
          return  <CommentCard data={i} index={j} key={i._id}/>
        })}
      </div>
     </div>

      {/* Overlay of unsubscribe */}

      {unsubscribe? (
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

     {isPlaylist? <div className="fixed w-full h-full bg-black opacity-80 ">
        <Playlist />
      </div>:null}
    </>
  );
};

export default WatchPage;
