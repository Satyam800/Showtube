import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FcFilmReel } from "react-icons/fc";
import { MdSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import MainBody from "./MainBody";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const icon = useSelector((state) => state.Icon?.isMenuOpen);

  return (
    <>
      {icon ? (
        <div className="   p-1  h-full  fixed top-[8%] w-[9%] bg-white ">
          <div className=" max-xl:w-[20%] fixed ">
            <AiFillHome className=" hover:bg-gray-200 hover:rounded-lg w-20 h-20 p-6 " />
            <FcFilmReel className=" hover:bg-gray-200 hover:rounded-lg w-20 h-20 p-6" />
            <MdSubscriptions className=" hover:bg-gray-200 hover:rounded-lg w-20 h-20 p-6" />
            <MdOutlineVideoLibrary className=" hover:bg-gray-200 hover:rounded-lg  w-20 h-20 p-6 " />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
