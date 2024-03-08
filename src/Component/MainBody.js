import React, { useEffect } from "react";
import VideoContainer from "./VideoContainer";
import ButtonList from "./ButtonList";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import SearchVideo from "./SearchVideo";

import SearchSuggestion from "./SearchSuggestion";
import Shimmer from "../Utils/Shimmer";

const MainBody = () => {
  let dispatch = useDispatch();
  let DataReceive = useSelector((state) => state.video.Item);
  const isSearched=useSelector(store=>store.search.isSearch)
  console.log(isSearched,"fdfdfd");
  return (
    <>

    
      <div className=" w-full ">
        {isSearched?<SearchVideo/>
          :<div>
            <ButtonList />
<VideoContainer />
            </div>
        }
      </div>
    </>
  );
};

export default MainBody;
