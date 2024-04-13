import React from "react";

const VideoCard = (props) => {
  return (
    <>
    
      <div className="h-50 w-30 p-2 shadow-lg rounded-md  cursor-pointer">
        <img className="rounded-md" src={props.thumbnail?.medium.url} />
        <div className="w-30 ">
       <div className="flex m-2">
       <img className="w-8 h-8 rounded-full" alt="dp"  src={props?.item.snippet?.thumbnails?.default?.url} />
        <div className="  w-30 h-10 ml-2 font-serif ">{props.item.snippet?.channelTitle}
         </div>
       </div>
        <div className="font-light">{props.item.statistics?.viewCount}<span className="w-12 ml-3 p-1 h-8 font-semibold rounded-2xl bg-pink-100">views</span> </div>
        </div>
      </div>
       
    </>
  )
}

export default VideoCard
