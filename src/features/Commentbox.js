import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { onReply } from "../Utils/ReplySlice";
import Reply from "../Component/Reply";
import EmojiPicker from "emoji-picker-react";
import Comment_List from "./Comment_List";
import { IsComment } from "../Utils/isCommentPost";
import { useLocation } from "react-router-dom";
import { OnClicked } from "../Utils/UserSlice";
const CommentContainer = () => {
  const currURL = useLocation();
  const careEmoji = useRef(0);
  const [Emoji, SetEmoji] = useState(null);
  const [inputContent, setinputContent] = useState(null);
  const [isfocusonInput, setisfocusInput] = useState(false);
  const [isEmojiOpen, setisEmojiOpen] = useState(false);
  const [istext, setistext] = useState(false);
  const [obj, setobj] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    if (inputContent?.length < 1 || inputContent == null) {
      setistext(false);
    } else {
      setistext(true);
    }
    document.getElementById("inputValue").value = inputContent;
    setobj({
      content: inputContent,
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
    if (!OutsideClick.current?.contains(e.target)) {
      console.log(e.target, "e");
      setisEmojiOpen(false);
    } else {
      console.log(e.target, "e");
      setisEmojiOpen(true);
    }
  };
  const handledata = (e) => {
    setinputContent(e.target.value);
  };

  const handleEmoji = (emoji) => {
    SetEmoji(emoji.emoji);
    setinputContent(inputContent + emoji.emoji);
  };
  const handleSubmit = () => {
    console.log(inputContent, typeof inputContent);
    const sendComment = fetch("http://localhost:2000/Comment/postComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: inputContent,
        author: "satyam",
        URL: currURL.search,
      }),
    });
    dispatch(IsComment(true));
  };

  const handleCancel = (e) => {
    document.getElementById("inputValue").value = null;
    setinputContent(null);
    setisfocusInput(false);
  };

  const handlefocus = () => {
    setisfocusInput(true);
  };

  return (
    <>
      <div className="text-xl font-semibold m-3">Comment </div>
      <div className="flex">
        <div className="rounded-2xl bg-black h-8 w-8 m-2"></div>
        <div className="w-[40%]  h-7 ml-3 rounded-xl border-b-2 hover:border-blue-400  border-slate-950">
          <input
            name="Content"
            onChange={handledata}
            className="w-full outline-0 "
            placeholder="Add an comment..."
            type="text"
            id="inputValue"
            onFocus={handlefocus}
          />
        </div>
      </div>
      {isfocusonInput && (
        <div className="flex  w-full ">
          <div ref={OutsideClick} className="relative">
            <span className="" id="emoji" onClick={() => setisEmojiOpen(true)}>
              {" "}
              <img
                // src={emojiPic}
                className=" ml-16 sm:ml-12 mb-6 h-8 w-8 cursor-pointer"
              />{" "}
            </span>

            {isEmojiOpen && (
              <div className=" absolute mt-2  sm:mt-9 md:mt-5 xl:mt-4  w-40 ">
                <EmojiPicker
                  className="fixed mt-2 sm:mt-1"
                  onEmojiClick={handleEmoji}
                />
              </div>
            )}
          </div>

          <div className=" sm:absolute flex ml-[28%] ">
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
                Comment
              </div>
            ) : (
              <div className="bold  w-24 h-6 rounded-xl ml-2 bg-slate-200 hover:bg-slate-500 pl-3">
                Comment
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CommentContainer;
