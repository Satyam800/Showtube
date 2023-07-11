import React from "react";

const VideoCard = (props) => {
  return (
    <>
      <div className="h-50 w-30 p-2 shadow-lg rounded-md  cursor-pointer">
        {console.log(props, "op")}

        <img className="rounded-md" src={props.thumbnail?.medium.url} />

        <div className="w-30 ">
          <div className="w-30 h-10">{props.item.snippet.channelTitle}</div>

          <div>{props.item.statistics.viewCount + "views"}</div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
