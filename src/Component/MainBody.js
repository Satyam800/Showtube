import React, { useEffect } from "react";
import VideoContainer from "./VideoContainer";
import ButtonList from "./ButtonList";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";

import SearchSuggestion from "./SearchSuggestion";
import Shimmer from "../Utils/Shimmer";

const MainBody = () => {
  let dispatch = useDispatch();
  let DataReceive = useSelector((state) => state.video.Item);

  return (
    <>
      <div className="flex ">
        <ButtonList />

        <VideoContainer />
      </div>
    </>
  );
};

export default MainBody;
