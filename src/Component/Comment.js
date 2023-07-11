import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useDispatch,useSelector } from "react-redux";
import { onReply } from "../Utils/ReplySlice";
import Reply from "./Reply";

const commentdata = [
  {
    name: "satyam",
    content: "hey i am satyam",
    Reply: [
      {
        name: "kumar",
        content: "hello",
        like: <AiOutlineLike />,
    dislike: <AiOutlineDislike />,
      },
    ],
    like: <AiOutlineLike />,
    dislike: <AiOutlineDislike />,
  },
  {
    name: "satyam",
    content: "hey i am satyam",
    Reply: [
      {
        name: "kumar",
        content: "hello",
        like: <AiOutlineLike />,
    dislike: <AiOutlineDislike />,
      },
    ],
    like: <AiOutlineLike />,
    dislike: <AiOutlineDislike />,
  },
  {
    name: "satyam",
    content: "hey i am satyam",
    Reply: [
      {
        name: "kumar",
        content: "hello",
        like: <AiOutlineLike />,
    dislike: <AiOutlineDislike />,
      },
    ],
    like: <AiOutlineLike />,
    dislike: <AiOutlineDislike />,
  },
  {
    name: "satyam",
    content: "hey i am satyam",
    Reply: [
      {
        name: "kumar",
        content: "hello",
        like: <AiOutlineLike />,
    dislike: <AiOutlineDislike />,
      },
    ],
    like: <AiOutlineLike />,
    dislike: <AiOutlineDislike />,

  },
];

const Comment = ( {data }) => {
  let { content, name,like,dislike} = data;
  let dispatch= useDispatch()
  let isclicked=useSelector((store)=>store.Reply.isclicked)
 
  return (
    <>
    <div className="flex space-x-4">
    <div className="h-8 w-8 rounded-2xl bg-black"></div>
      <div className="font-semibold">{name}</div>
    </div>
    <div className="ml-12">{content}</div>
      <div className="flex space-x-7 item-baseline ml-12 py-3">
        <span>{like}</span>
        <span>{dislike}</span>
        <div className="font-semibold hover:bg-slate-300 w-20  rounded-lg" onClick={()=>dispatch(onReply())}>
          <span className="p-4 cursor-pointer ">Reply</span>
           {isclicked && <Reply/>}
          </div> 
        

      </div>
    </>
  );
};
const CommentList = ({ commentK }) => {
  return (
    <>
    {
       
        commentK?.map((item,index)=>{
         return <div className="ml-3">
            { console.log(commentdata.Reply)}
            <Comment data={item} key={index}/>
              <div className="ml-8 pl-2">
              <CommentList commentK={item.Reply}/>
              </div>
          
          </div>  
      
        })
      
    }
    </>
    
  )
}

//  return commentK?.map((item,index)=>(
//    <div className="ml-3">
//      <Comment data={item} key={index}/>
//      <div className="">
//        <CommentList commentK={commentdata.Reply}/>
//      </div>
//    </div>  
// this is alternate of above syntax
//  )) This syntax is confusing "(" after => find it later

const CommentContainer = () => {
  return (
    <>
      <div className="flex space-x-3 ">
        <div className="font-semibold m-3 pl-3 ">Comment</div>
        <div className="font-semibold">Sort by</div>
      </div>
      <CommentList commentK={commentdata} />
    
    </>
  );
};

export default Comment;
export {CommentContainer,CommentList}
