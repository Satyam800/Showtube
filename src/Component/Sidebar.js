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
import { useParams, useSearchParams } from "react-router-dom";
import { GetSubs } from "../Utils/LikeSlice";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";

const Sidebar = () => {
  const [params] = useSearchParams();
  const icon = useSelector((state) => state.Icon?.isMenuOpen);
  const [show, Setshow] = useState(false);
  const playlistItem = useSelector((store) => store.playlist.list);
  const dispatch = useDispatch();
  const { id } = useParams();
  const subscribers = useSelector((store) => store.like.subscribed);
  const [see, SetSee] = useState(false);
  const searchparam = useSearchParams();
  const showmore = () => {
    Setshow(true);
  };
  console.log(id, "params");
  useEffect(() => {
    dispatch(
      playlist({
        userId: JSON.parse(localStorage.getItem("id"))?._id,
      })
    );

    dispatch(
      GetSubs({
        videoId: params.get("v"),
        userId: JSON.parse(localStorage.getItem("id"))?._id,
      })
    );
  }, []);
  useEffect(() => {}, [subscribers, playlistItem, see]);

  const fixedLength = subscribers?.filter((i, j) => {
    if (j < 5) {
      return i;
    }
  });

  const showmoreLength = () => {
    SetSee(true);
  };
  const togglemap = see ? subscribers : fixedLength;

  return (
    <>
      {icon ? (
        <div className=" flex flex-col justify-evenly  p-4  sm:h-full  fixed top-[8%] sm:w-[19%] w-[60%] h-[90%]  overflow-y-scroll  bg-white rounded-lg z-40">
          <Link to="/">
            <div className=" absolute top-[15%] w-[80%] h-8 flex hover:bg-slate-400 cursor-pointer rounded-md p-1 ">
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

          <div className="absolute flex flex-col sm:top-[34%] top-[60%] w-[80%] ">
            <hr className="  w-[95%] h-0.5 bg-black "></hr>
            <div className="m-3">
              <div className="font-semibold m-3 text-xl">Subscription</div>

              <div className="flex flex-col gap-y-4">
                {togglemap?.map((i, j) => {
                  return (
                    <div className="flex font-serif">
                      <img
                        className="h-8 w-8 rounded-full mr-4 "
                        alt="dp"
                        src={i.url}
                      />
                      <div>{i.subscriber}</div>
                    </div>
                  );
                })}
                {see ? (
                  <div
                    className="flex mt-4 mb-9 hover:bg-stone-400 rounded-md cursor-pointer"
                    onClick={() => SetSee(false)}
                  >
                    {" "}
                    <IoIosArrowDropup size={26} /> Show fewer
                  </div>
                ) : (
                  <div className="hover:bg-stone-400  h-8 flex  cursor-pointer rounded-md p-1 ">
                   {subscribers.length>5? <IoIosArrowDropdown size={26} />:null}

                    <div className=" ml-[9%] w-[70%] " onClick={showmoreLength}>
                      {subscribers.length>5?`Show ${subscribers.length - 5} more`:null} 
                    </div>
                  </div>
                )}
              </div>
            </div>
            <hr className="w-[95%] h-0.5 bg-black "></hr>

            {show ? null : (
              <div
                className="  h-8 flex hover:bg-stone-400  cursor-pointer rounded-md p-1 mb-[5%] "
                onClick={showmore}
              >
                <IoIosArrowDropdown size={26} />

                <div className="font-bold ml-[9%] w-[70%]">Show more</div>
              </div>
            )}

            {show ? (
              <div className="justify-between flex flex-col font-semibold  w-[80%] h-auto cursor-pointer rounded-md p-1  ">
                {playlistItem.map((i) => {
                  return (
                    <Link to={"/playlist?id=" + i._id}>
                      <div className="flex p-1 rounded-sm hover:bg-slate-400">
                        <MdOutlinePlaylistAddCheck size={29} className="" />
                        <div className="w-[80%] h-8   ml-4">
                          {i.name}
                        </div>
                      </div>
                    </Link>
                  );
                })}
                <div
                  className="flex font-semibold mt-4 mb-9 hover:bg-stone-400 rounded-md cursor-pointer "
                  onClick={() => Setshow(false)}
                >
                  {" "}
                  <IoIosArrowDropup size={26} /> Show less
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
