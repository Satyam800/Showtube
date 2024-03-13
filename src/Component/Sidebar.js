import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FcFilmReel } from "react-icons/fc";
import { MdSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import MainBody from "./MainBody";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineHistory } from "react-icons/md";

const Sidebar = () => {
  const icon = useSelector((state) => state.Icon?.isMenuOpen);

  return (
    <>
      {icon ? (
        <div className="   p-1  sm:h-full  fixed top-[8%] sm:w-[12%] w-[30%] h-[55%] bg-white rounded-lg z-40">
          <Link to="/">
            <div className=" absolute top-[15%] w-[80%] h-8 flex hover:bg-slate-400 cursor-pointer rounded-md p-1">
              <AiFillHome size={20} />
              <div className="font-bold ml-[6%]">Home</div>
            </div>
          </Link>

          <hr className="absolute sm:top-[20%] top-[24%] w-[95%] h-0.5 bg-black "></hr>

          <Link to="/">
            <div className=" absolute sm:top-[22%] top-[26%] w-[80%] h-8 flex hover:bg-slate-400 cursor-pointer rounded-md p-1 ">
              <MdOutlineHistory size={20} />
              <Link to="/history"><div className="font-bold ml-[6%]">History</div></Link>
            </div>
          </Link>

        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
