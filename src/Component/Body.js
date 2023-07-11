import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Shimmer from "../Utils/Shimmer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { VideoArray } from "../Utils/ItemSlice";
import { VideoApi } from "../Utils/Constant";

const Body = () => {
  let dispatch = useDispatch();

  let VideoItem = useSelector((store) => store.video?.Item);

  let DataReceive = useSelector((state) => state.video.Item);

  useEffect(() => {
    async function data() {
      let datas = await fetch(VideoApi);
      let Json_data = await datas.json();
      dispatch(VideoArray(Json_data.items));
      console.log(Json_data.items, "hello");
    }

    data();
  }, []);

  return (
    <>
      <div className="flex flex-col  ">
        <Sidebar />

        <Outlet />
      </div>
    </>
  );
};

export default Body;
