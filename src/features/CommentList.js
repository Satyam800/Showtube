import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Utils/commentSlice";
import { useSearchParams } from "react-router-dom";
import CommentCard from "./CommentCard";
const CommentList = (props) => {
  const [param] = useSearchParams();
  const dispatch = useDispatch();
  console.log(props,"listcommet");
  useEffect(() => {
    dispatch(
      getData({
        commentable: props.data._id,
        onModel: "Comment",
      })
    );
  }, []);



  const data = useSelector((store) => store.comment.commentlist);
  const reply = useSelector((store) => store.comment.replies);

  useEffect(() => {
    console.log(data, "comes");
  }, [data,reply]);

 

  return (
    
    <>
      <div className="flex flex-col h-auto w-[80%] ">
        {data?.map((i,j) =>{
          return <CommentCard data={i} index={j} key={i._id}/>
        })}
      </div>
    </>
  );
};

export default CommentList;
