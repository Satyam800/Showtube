import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IsComment } from "../Utils/isCommentPost";
import { useLocation } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { Link } from "react-router-dom";
import CommentContainer from "./Commentbox";

const Comment_List = () => {
  const [isReply, setisReply] = useState(false);
  const VideoId = useLocation();
  const [commentdata, setcommentdata] = useState([]);
  const dispatch = useDispatch();
  const ISComment = useSelector((state) => state.isComment.istrue);

  const getCommentList = async () => {
    const getdata = await fetch("http://localhost:2000/Comment/getComment", {
      method: "GET",
    });
    const data = await getdata.json();
    setcommentdata(data.reverse());
    console.log(data, "dataComment");
  };

  useEffect(() => {
    getCommentList();
    dispatch(IsComment(false));
  }, [ISComment]);

  const handleReply = () => {
    setisReply(true);
  };
  return (
    <>
      <div>
        <div>
          {commentdata.map((i) => {
            if (VideoId.search !== i.VideoURL) return;
            return (
              <div className="flex flex-col mt-3 lg:ml-[4%] sm:ml-[9%]">
                <div className="flex space-x-3 align-baseline">
                  <div className="h-10 w-10 rounded-3xl bg-slate-500"></div>
                  <div>{i.User}</div>
                </div>
                <div className="ml-9"> {i.content}</div>
                <div className=" ml-[6%]  flex  w-[30%] align-baseline justify-evenly ">
                  <div className="flex space-x-8  ">
                    <AiOutlineLike />
                    <AiOutlineDislike />
                  </div>
                  <div
                    className="realtive font-semibold cursor-pointer h-6 w-14 rounded-xl pl-2 bg-slate-300 hover:bg-slate-100"
                    onClick={handleReply}
                  >
                    Reply
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Comment_List;
