import React, { useState, useRef, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import ReplyComment from "./ReplyComment";
import { useDispatch, useSelector } from "react-redux";
import { reply } from "../Utils/commentSlice";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import ReplyCard from "./ReplyCard";
import ReplyOnReply from "./ReplyOnReply";
import CommentList from "./CommentList";
const CommentCard = (props) => {
  const [isreplied, SetisReplied] = useState(false);
  const [replied, SetReplied] = useState(false);
  const data = useSelector((store) => store.comment.replies);
  const commentdata = useSelector((store) => store.comment.commentlist);

  const dispatch = useDispatch();
  const handleReply = (i) => {
    SetisReplied(true);
   
  };
  useEffect(()=>{
   
  },[data,commentdata])
  const handleReplies = () => {
    dispatch(
      reply({
        commentable: props.data._id,
        onModel: "Comment",
      })
    )
    SetReplied(!replied);
  }
  return (
    <>
      <div className="flex  mt-1 mr-[6%]">
        <div className="w-8 h-8 rounded-3xl bg-indigo-500 p-1 font-bold sm:ml-[5%] pl-3 mt-5">
          {" "}
          {props?.data.userId?.name.split("")[0].toUpperCase()}
        </div>
        <div className="flex flex-col text-sm font-semibold ml-[4%] ">
          <div>{props.data.userId.email}</div>
          <div className="ml-[10%] font-normal mt-3">
            {props?.data?.content}
          </div>
        </div>
      </div>
      <div className="flex w-32 h-8 ml-[19%] mt-3 items-baseline">
        <AiOutlineLike size={18} />
        <div
          className=" text-sm w-12 h-8 rounded-xl p-1 cursor-pointer ml-4 hover:bg-stone-200"
          onClick={handleReply}
        >
          Reply
        </div>
      </div>

      {isreplied ? (
        <div className="ml-[28%] ">
          <ReplyComment parent={props.data} index={props.index} data={props.data} />
        </div>
      ) : null}

      {replied ? (
        <div className="h-auto w-[80%]">
          {data?.map((i, j) => {
            return <ReplyCard parent={props.data} data={i} index={j} />;
          })}
        </div>
      ) : null}

      {props?.data.comments.length != 0 ? (
        <div
          className="flex font ml-[16%]  w-24 h-8 rounded-xl  hover:bg-blue-200 cursor-pointer p-1 text-blue-700 font-semibold"
          onClick={handleReplies}
        >
          {replied ? <FaSortUp size={18} /> : <FaSortDown size={16} />}
          {props.data.comments.length} replies{" "}
        </div>
      ) : null}
    </>
  );
};

export default CommentCard
