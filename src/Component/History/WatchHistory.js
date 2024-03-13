import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { watchHistory } from "../../Utils/historySlice";
import HistoryCard from "./HistoryCard";
import { VideoArray } from "../../Utils/ItemSlice";
import { VideoApi } from "../../Utils/Constant";
import { MdOndemandVideo } from "react-icons/md";
import { Link } from "react-router-dom";
const WatchHistory = () => {
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem("id"));
  const history = useSelector((store) => store.history.Id);
  const itemArray = useSelector((store) => store.video.Item);
  var filterList = [];
  history?.map((i) => {
    itemArray?.map((j) => {
      if (j?.id == i) {
        filterList.push(j);
      }
    });
  });

  useEffect(() => {
    async function data() {
      let datas = await fetch(VideoApi);
      let Json_data = await datas.json();
      dispatch(VideoArray(Json_data.items));
      console.log(Json_data.items, "hello");
    }
    data();

    dispatch(
      watchHistory({
        userId: id._id,
      })
    );
  }, []);

  return (
    <>
      <div className="flex ">
        <div className="fixed top-[10%] sm:w-[22%] sm:h-30 w-[32%] h-34 rounded-lg m-4 ">
          {filterList ? (
            <img
              className=" "
              src={filterList?.[0]?.snippet?.thumbnails?.high.url}
              alt="thumbnail"
            />
          ) : (
            "No any video"
          )}
          <div className="flex font-bold ml-6 ">
            Total {filterList.length} video{" "}
            <span>
              <MdOndemandVideo className="m-1" size={22} />
            </span>
          </div>
        </div>

        <div>
          <Link>
            <div className="absolute mt-4 w-[60%] ml-[30%]  h-full flex flex-col gap-y-3">
              {filterList.map((i) => {
                return <HistoryCard data={i} />;
              })}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default WatchHistory;
