import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeletePlaylist, playlist } from "../../Utils/playlistSlice";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Header from "../Header";
const Playlistcard = () => {
  const [param] = useSearchParams();
  const id = param.get("id");
  const playlistItem = useSelector((store) => store.playlist.list);
  const itemArray = JSON.parse(localStorage.getItem("videos"));
  const dispatch = useDispatch();
  console.log(playlistItem, "oo");
  console.log(param.get("id"), "param");

  useEffect(() => {
    dispatch(
      playlist({
        userId: JSON.parse(localStorage.getItem("id"))._id,
      })
    );
  }, []);

  const filter = [];
  const filterId = playlistItem.filter((i) => {
    if (i._id == id) {
      return true;
    }
  });

  filterId?.[0]?.videoId?.map((i) => {
    itemArray?.map((j) => {
      if (i == j.id) {
        filter.push(j);
      }
    });
  });
  console.log(filter, "jj");

  const handleDelete=(i)=>{

    dispatch(DeletePlaylist({
      userId:JSON.parse(localStorage.getItem("id"))._id,
      videoId:i.id,
      Id:param.get("id")
    }))

    console.log(i,"opop");
  }
  return (
    <>
      <Header />
      <div className="absolute top-[12%] flex flex-col sm:m-2 m-0 gap-y-3  ">
        {filter.map((i) => {
          return (
            <div className="flex sm:w-[76%] w-full rounded-lg sm:h-40 h-28 bg-slate-100">
              <Link to={"/watch?v=" + i.id}>
                <img
                  className=" w-40 h-38 rounded-md"
                  alt="thumbnail"
                  src={i?.snippet?.thumbnails?.high.url}
                />
              </Link>
              <div
                className="flex flex-col sm:text-xl text-xs justify-between font-semibold ml-6
      "
              >
                {i?.snippet.title}
                <div className="m-3 font-serif text-sm text-slate-500">
                  {i?.snippet.channelTitle}
                </div>
              </div>
              <span className="absolute flex align-baseline mt-[10%] font-bold ml-[65%] w-12 cursor-pointer h-8 bg-black text-white rounded-r-xl p-0.3 hover:bg-stone-500">
                <RiDeleteBack2Fill size={32} onClick={()=>handleDelete(i)} />
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Playlistcard;
