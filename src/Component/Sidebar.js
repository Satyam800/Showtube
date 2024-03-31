import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FcFilmReel } from "react-icons/fc";
import { MdSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import MainBody from "./MainBody";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineHistory } from "react-icons/md";
import { SlLike } from "react-icons/sl";
import { MdPlaylistPlay } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { playlist } from "../Utils/playlistSlice";
import Playlistcard from "./Playlist/Playlistcard";
import { useParams,useSearchParams } from "react-router-dom";
const Sidebar = () => {
  const icon = useSelector((state) => state.Icon?.isMenuOpen);
  const [show, Setshow] = useState(false);
  const playlistItem = useSelector((store) => store.playlist.list);
  const dispatch = useDispatch();
  const { id } = useParams();
  const searchparam=useSearchParams()
  const showmore = () => {
    Setshow(true);
  };
  console.log(id, "params");
  useEffect(() => {
    dispatch(
      playlist({
        userId: JSON.parse(localStorage.getItem("id"))._id,
      })
    );
  }, []);
  return (
    <>
      {icon ? (
        <div className=" flex flex-col justify-evenly  p-1  sm:h-full  fixed top-[8%] sm:w-[19%] w-[30%] h-[90%] overflow-y-scroll bg-white rounded-lg z-40">
          <Link to="/">
            <div className=" absolute top-[15%] w-[80%] h-8 flex hover:bg-slate-400 cursor-pointer rounded-md p-1">
              <AiFillHome size={20} />
              <div className="font-bold ml-[6%]">Home</div>
            </div>
          </Link>

          <hr className="absolute sm:top-[20%] top-[24%] w-[95%] h-0.5 bg-black "></hr>

          <Link to="/history">
            <div className=" absolute sm:top-[22%] top-[26%] w-[80%] h-8 flex hover:bg-slate-400 cursor-pointer rounded-md p-1 ">
              <MdOutlineHistory size={20} />
              <div className="font-bold ml-[6%]">History</div>
            </div>
          </Link>

          <Link to="/likedVideo">
            <div className=" absolute sm:top-[29%] top-[32%] w-[80%] h-8 flex hover:bg-slate-400 cursor-pointer rounded-md p-1  ">
              <SlLike size={19} />

              <div className="font-bold ml-[12%] w-[70%]">Liked</div>
            </div>
          </Link>

          {show ? null : (
            <div
              className=" absolute sm:top-[34%] top-[38%] w-[80%] h-8 flex  cursor-pointer rounded-md p-1  "
              onClick={showmore}
            >
              <IoIosArrowDropdown size={26} />

              <div className="font-bold ml-[9%] w-[70%]">Show more</div>
            </div>
          )}

          {show ? (
            <div className="absolute top-[36%] justify-between flex flex-col font-semibold  w-[80%] h-8  cursor-pointer rounded-md p-1 ">
              {playlistItem.map((i) => {
                return (
                  <Link to={"/playlist?id="+i._id}>
                    <div className="w-[80%] h-8 rounded-sm hover:bg-slate-400 mt-4">
                      {i.name}
                    </div>
                  </Link>
                );
              })}
              <div className="flex font-semibold mt-4 ">
                {" "}
                <IoIosArrowDropup
                  size={26}
                  onClick={() => Setshow(false)}
                />{" "}
                Show more
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
