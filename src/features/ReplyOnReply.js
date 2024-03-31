
import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { onReply } from "../Utils/ReplySlice";
import Reply from "../Component/Reply";
import EmojiPicker from "emoji-picker-react";
import { IsComment } from "../Utils/isCommentPost";
import { useLocation,useSearchParams } from "react-router-dom";
import { OnClicked } from "../Utils/UserSlice";
import { BsEmojiSunglasses } from "react-icons/bs";
import { replyCreate } from "../Utils/commentSlice";
import CommentCard from "./CommentCard"

const ReplyOnReply = (props) => {
  const currURL = useLocation();
  const careEmoji = useRef(0);
  const replyInput=useRef()
  const [Emoji, SetEmoji] = useState(null);
  const [inputContent, setinputContent] = useState(null);
  const [isfocusonInput, setisfocusInput] = useState(false);
  const [isEmojiOpen, setisEmojiOpen] = useState(false);
  const [istext, setistext] = useState(false);
  const [obj, setobj] = useState({});
  const [param]=useSearchParams()
  const dispatch = useDispatch();
  console.log(props,"props");

  useEffect(() => {
    if (inputContent?.length < 1 || inputContent == null) {
      setistext(false);
    } else {
      setistext(true);
    }
    console.log(props.data._id,"didir");
    setobj({
      content: replyInput.current.value,
      author: "satyam",
    });
  }, [inputContent]);

  useEffect(() => {
    window.addEventListener("click", handleclickoutside);

    return () => {
      window.removeEventListener("click", handleclickoutside);
    };
  }, []);
  const OutsideClick = useRef(null); // If i am intialize it starting it giving an error why??
  const handleclickoutside = (e) => {
    if(!OutsideClick.current?.contains(e.target)) {
      console.log(e.target,"e");
      setisEmojiOpen(false);
    } else {
      console.log(e.target,"e");
      setisEmojiOpen(true);
    }
  }
  const handledata = (e) => {
    setinputContent(e.target.value);
  };

  const handleEmoji = (emoji) => {
    SetEmoji(emoji.emoji);
    setinputContent(inputContent + emoji.emoji);
    replyInput.current.value=inputContent
  };
  const handleSubmit =() => {
const commentId=props?.parent?._id
console.log(commentId,"repluoi");
    replyInput.current.value=`@${props.data.userId.name} ${inputContent}`
    const input=`@${props.data.userId.name}
     ${inputContent}`
    dispatch(replyCreate({ 
      content:input,
      onModel:"Comment",
      commentable:commentId,
      videoId:param.get("v"),
      userId:JSON.parse(localStorage.getItem("id"))._id,
    }))
    dispatch(IsComment(true))
    setinputContent(" ")
  }
  const handleCancel = (e) => {
    replyInput.current.value = null;
    setinputContent(null);
    setisfocusInput(false);
  };

  const handlefocus = () => {
    setisfocusInput(true);
  };

  const user = JSON.parse(localStorage.getItem("id"));
  const userFirstName = user?.name.split("");

  return (
    <>
      <div className="flex ">
        {user?(
          <div className="w-10 h-10 p-1 pl-3 cursor-pointer rounded-full bg-blue-800 text-white text-xl font-semibold">
            {userFirstName?.[0].toUpperCase()}
          </div>
        ):(
          <div className="rounded-2xl bg-black h-8 w-8 m-2"></div>
        )}
        <div className="w-[40%]  h-7 ml-3 rounded-xl border-b-2 hover:border-blue-400  border-slate-950">
          <input
            name="Content"
            onChange={handledata}
            id={props._id}
            className="w-full outline-0"
            placeholder="Reply a comment ..."
            type="text"
            ref={replyInput}
            onFocus={handlefocus}
          />
        </div>
      </div>
      {isfocusonInput && (
        <div className="flex  w-full ">
          <div ref={OutsideClick} className="relative">
            <span className="" id="emoji" onClick={() => setisEmojiOpen(true)}>
              {" "}
              <BsEmojiSunglasses
                size={16}
                // src={emojiPic}
                className=" ml-16 sm:ml-12 mb-6 h-6 w-6 cursor-pointer"
              />{" "}
            </span>

            {isEmojiOpen && (
              <div className=" absolute mt-2  sm:mt-9 md:mt-5 xl:mt-4  w-40 ">
                <EmojiPicker
                  className="fixed mt-2 sm:mt-1 z-100"
                  onEmojiClick={handleEmoji}
                />
              </div>
            )}
          </div>

          <div className=" sm:absolute flex sm:ml-[28%] ml-[8%] ">
            <div
              onClick={handleCancel}
              className=" font-semibold cursor-pointer w-24 h-6 rounded-xl ml-2 bg-slate-200 hover:bg-slate-500 pl-6"
            >
              Cancel
            </div>
            {istext ? (
              <div
                className="bold  w-24 h-6 cursor-pointer rounded-xl ml-2 bg-blue-500 pl-3"
                onClick={handleSubmit}
              >
                Reply
              </div>
            ) : (
              <div className="bold  w-24 h-6 rounded-xl ml-2 bg-slate-200 hover:bg-slate-500 pl-3">
               Reply
              </div>
            )}
            
          </div>
        </div>
      )}
    </>
  );
};

export default ReplyOnReply