import React, { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch } from "react-redux";
import {Share} from "../../Utils/HembegerSlice"
import {  toast } from 'react-toastify';
const SharePopup = () => {
  const location = useLocation();
  const linkRef = useRef();
  const dispatch=useDispatch()
  const handleCopy = async () => {
    toast("Link copied to clipboard")
    console.log(linkRef.current.value, "mm");
    try {
      await navigator.clipboard.writeText(linkRef.current.innerText);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
const handleRemove=()=>{
  dispatch(Share(false))
}

  return (
    <>

    
      <div className="flex flex-col sm:p-1 p-1.3 justify-between  absolute z-100 sm:w-[35%] sm:h-[35%] w-[89%] h-[45%] sm:mt-[18%] mt-[22%] sm:left-[35%] left-[15%] rounded-lg shadow-lg bg-slate-400 ">
        Share
        <div className="absolute top-1 left-[94%] font-bold cursor-pointer" onClick={handleRemove}>
          
          <CiCircleRemove size={32} />
        </div>
        <div className="flex justify-evenly">
          <FaWhatsapp size={34} />
          <RiLinkedinFill size={34} />
          <FaTwitter size={34} />
        </div>
        <div className="flex justify-between m-2 sm:ml-8 ml-1 w-[85%] rounded-full sm:h-10 h-14 bg-slate-200 p-1">
          <div className="text-sm font-semibold pt-1" ref={linkRef}>
            https://www.youtube.com{location.pathname + location.search}
          </div>
          <div
            className="w-16 h-8 font-semibold bg-blue-400 rounded-full pl-3 cursor-pointer"
            onClick={handleCopy}
          >
            Copy
          </div>
        </div>
      </div>
    </>
  );
};

export default SharePopup;
