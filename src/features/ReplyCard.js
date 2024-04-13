import React, { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { useDispatch,useSelector } from "react-redux";
import ReplyComment from "./ReplyComment";
import { reply,replyFirst,Insert } from "../Utils/commentSlice";
import ReplyOnReply from "./ReplyOnReply";
import { GoCommentDiscussion } from "react-icons/go";

const ReplyCard = (props) => {
  const dispatch = useDispatch();
  const [isreplied, SetisReplied] = useState(false);
  const [replied, SetReplied] = useState(false);
  const handleReply = () => {
    SetisReplied(true);
  };
  const insert = useSelector((store) => store.comment.insert);



  return (
    <>
      <div>
        <div className="flex w-full  ml-[28%]">
          <div className="w-6 h-6 rounded-3xl bg-indigo-500 pl-2 font-bold sm:ml-[5%]  ">
            {props.data?.userId?.name?.split("")[0].toUpperCase()}
          </div>
          <div className="flex flex-col font-semibold text-sm ml-[4%] ">
            <div>{props.data.userId.email}</div>
            <div className="flex flex-col ml-[10%] font-mono mt-1">
              {props.data?.content.split("")[0]=="@"?
              <div>
                <div className="text-blue-400 font-extralight">
              {" "}
              {props.data?.content.split(" ")[0]}
            </div>
            <div className="font-serif text-black">
              {props.data?.content.split(" ").filter((i,j) => {
                if (j != 0) return i;
              })}
            </div>
              </div>
            :props.data?.content}
              {/*  */}
            </div>
          </div>
        </div>
        <div className="flex w-32 h-8 ml-[39%] mt-1 items-baseline">
        <GoCommentDiscussion size={20} />

          <div
            className=" text-sm w-12 h-8 rounded-xl p-1 cursor-pointer ml-4 hover:bg-stone-200"
            onClick={handleReply}
          >
            Reply
          </div>
        </div>
        {isreplied ? (
          <div className="w-[70%] m-3 ml-[34%]">
            {console.log(props, "reply reply")}
            <ReplyOnReply
              parent={props.parent}
              index={props.index}
              data={props.data}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ReplyCard;
