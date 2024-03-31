import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import Shimmer from "../Utils/Shimmer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { VideoArray } from "../Utils/ItemSlice";
import { VideoApi } from "../Utils/Constant";
import axios from "axios";
import { isSubscribe, ConfirmUnsubscribe } from "../Utils/SubscribeSlice";
const Body = () => {
  let dispatch = useDispatch();
  let VideoItem = useSelector((store) => store.video?.Item);
  let DataReceive = useSelector((store) => store.video.Item);

  useEffect(() => {
    async function data() {
      let datas = await fetch(VideoApi);
      let Json_data = await datas.json();
      dispatch(VideoArray(Json_data.items));
      console.log(Json_data.items, "hello");
      localStorage.setItem("videos",JSON.stringify(Json_data.items));
    }

    data();
  }, []);
 
  return (
    <>
      <div className="flex flex-col ">
      <Header />
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Body;
