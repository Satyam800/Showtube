import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../Utils/HembegerSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { YouTube_Search_API } from "../Utils/Constant";
import { SearchType, SearchRes, ShowSuggestion } from "../Utils/SearchSlice";
import SearchSuggestion from "./SearchSuggestion";
import { CacheTheResult } from "../Utils/SearchCache";
import { FaUserTie } from "react-icons/fa";
import { BsFillBellFill } from "react-icons/bs";
import { ImYoutube2 } from "react-icons/im";
import {
  OnClicked,
  OutsideClick,
  ClickonMode,
  RemoveModepopup,
} from "../Utils/UserSlice";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineModeNight } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { ThemeChange } from "../Utils/ThemeSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation, Navigate } from "react-router-dom";
import { loginState, clearMessage } from "../Utils/authSlice";
import { fetchData } from "../Utils/SearchSlice";
import { Link } from "react-router-dom";
import { API_KEY } from "../Utils/Constant";
import { FaRegCircleDot } from "react-icons/fa6";
import Notification from "./Notification";
import axios from "axios";
const Header = () => {
  const Searchdata = useSelector((state) => state.search?.Result);
  const ShowResult = useSelector((state) => state.search?.Result);
  const showSearchSuggestion = useSelector((state) => state.search.isOnFocus);
  const CacheResult = useSelector((state) => state.cache);

  const clickonmode = useSelector((store) => store.user.ModeOption);
  const isdarkmode = useSelector((store) => store.theme.isdark);
  const isSigned = useSelector((store) => store.auth.Signin);
  const isLogin = useSelector((store) => store.auth.login);
  const dispatch = useDispatch();
  const UserRefBox = useRef();
  const UserRef = useRef();
  const ModeRef = useRef();
  const location = useLocation();
  const LoginCredentialRef = useRef();
  const onclickonModeoptionRef = useRef();
  const [userDetail, SetuserDetail] = useState();
  const [isSignIn, SetisSignIn] = useState("");
  const SuggestionRef=useRef()
  const [ClickedOnUser, SetClickedOnUser] = useState(false);
  const SearchResult = () => {
   
  };
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    dispatch(clearMessage());
    SetuserDetail(null);
    SetisSignIn(false);
    SetClickedOnUser(false);
  };

  console.log(isLogin, "isLogin");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("id"));

    SetuserDetail(user);
    SetisSignIn(isLogin);
   Setnotificaton(false)
  }, []);

  const userFirstName = userDetail?.name.split("");

  useEffect(() => {
    let promise = setTimeout(() => {
      if (CacheResult[Searchdata]) {
        dispatch(SearchRes(CacheResult[Searchdata]));
      } else {
        Search();
      }
    }, 300);

    console.log(CacheResult, "cachetheresult");
    return () => {
      clearTimeout(promise);
    };
  }, [Searchdata]);
 
  async function Search() {
   
 
   
    // const data = await fetch(url, {
    //   method: "GET",
    // });
    // const jsondata = await data.json();
    // console.log(jsondata, "Searchsuggestion");
    // dispatch(SearchRes(jsondata[1]));
    // dispatch(
    //   CacheTheResult({
    //     [Searchdata]: jsondata[1],
    //   })
    // );
  }

  const icon = useSelector((state) => state.Icon?.isMenuOpen);

  const Iconswitch = () => {
    dispatch(toggleMenu());
  }

  const handleuser = () => {
    if (UserRef.current.innerText == "Login") {
      SetisSignIn(true);
      dispatch(loginState(false));
    } else {
      SetClickedOnUser(true);
    }
  };

  useEffect(() => {
    const handleoustside = (e) => {
      if (
        !UserRefBox.current?.contains(e.target) &&
        !UserRef?.current?.contains(e.target)
      ) {
        SetClickedOnUser(false);
      }
    };

    document.addEventListener("click", handleoustside);
  }, []);
  

  useEffect(() => {
    const handleoutsideevent = (e) => {
      if (clickonmode == true) {
        if (!ModeRef.current?.contains(e.target)) {
          dispatch(RemoveModepopup(false));
        }
      }

     

      if(!notificationRef.current?.contains(e.target)&&!iconRef.current?.contains(e.target)){
        console.log("nojiji")
        Setnotificaton(false)
      }

     
    };
    document.addEventListener("click", handleoutsideevent);
  }, []);

  const handleMode = () => {
    dispatch(ClickonMode(true));
  };
  const lengthNotify=useSelector(store=>store.notification.text)

  const handledarkmode = () => {
    const roots = document.getElementById("root");
    roots.style.backgroundColor = "black";

    dispatch(ThemeChange(true));
    dispatch(ClickonMode(false));
  }
  const handlelightmode = () => {
    const roots = document.getElementById("root")
    roots.style.backgroundColor = "white"
    dispatch(ThemeChange(false));
    dispatch(ClickonMode(false));
  }
 const [notification,Setnotificaton]=useState(false)
 
 const notificationRef=useRef()
 const iconRef=useRef()
  const handleDisappear=()=>{
Setnotificaton(true)
  }

  return (
    <>
      <div className="top-0 grid sm:grid-cols-5 grid-cols-3 shadow-md items-baseline  fixed w-full z-20 bg-white">
        <div className="flex p-5   items-center   ">
          <img
            onClick={Iconswitch}
            className="h-6 mr-2 hover:bg-gray-200 hover:rounded-3xl cursor-pointer "
            src="https://cdn-icons-png.flaticon.com/512/3917/3917215.png"
          />
          <Link to="/">
            {" "}
            <ImYoutube2 size={49} className="ml-[30%] sm:ml-[15%]" />
          </Link>
        </div>

        <div className="  sm:col-span-3 col-span-4   w-full    ">
          <div className=" flex  items-baseline w-4/6 h-8 rounded-full border-2 border-zinc-300 ">
            <input
              placeholder="Search"
              className=" rounded-l-full w-[95%] h-full outline-gray-600 p-2 text-xl "
              onChange={(e) => dispatch(fetchData({
                url: e.target.value
              }))}
              onFocus={() => dispatch(ShowSuggestion(true))}
              // onBlur={() => dispatch(ShowSuggestion(false))}
            />

            <div
              className="cursor-pointer w-[5%]  "
              onClick={() => SearchResult()}
            >
              <AiOutlineSearch size="19" />
            </div>
          </div>
        </div>
        <div className="absolute  sm:left-[85%] top-7 left-[62%] flex justify-evenly  align-baseline sm:mr-1 sm:space-x-2"  ref={iconRef}>
          <div className="h-8 w-8 mr-[55%] bg-slate-300 rounded-full p-1 cursor-pointer ">
            <BsFillBellFill size={22} onClick={handleDisappear} / >
          
           {notification?<div className="absolute  right-4 top-9 " ref={notificationRef}>
           <Notification/>
           </div>:null}
          </div>
          <div onClick={handleuser} ref={UserRef}>
            {JSON.parse(localStorage.getItem("id")) ? (
              <div className="w-10 h-10 p-1 pl-3 cursor-pointer rounded-full bg-blue-800 text-white text-xl font-semibold">
                {userFirstName?.[0].toUpperCase()}
              </div>
            ) : (
              <div className="w-20  p-2 pl-4 cursor-pointer font-bold rounded-3xl bg-black text-white">
                Login
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full ml--8" >
        {Searchdata?.length > 0 && showSearchSuggestion ? (
          <div className="z-40 relative top-20  " ref={SuggestionRef}>
            <SearchSuggestion />
          </div>
        ) : null}
      </div>

      {ClickedOnUser ? (
        <div
          className=" flex flex-col fixed w-72 h-[98%] mt-3 ml-[70%] bg-slate-50 z-30 rounded-xl "
          ref={UserRefBox}
        >
          <div className="flex justify-center border-b-2 border-slate-200 ">
            <div className="w-10 h-10 m-2 p-1 pl-3 cursor-pointer rounded-full bg-blue-800 text-white text-xl font-semibold">
              {userFirstName?.[0].toUpperCase()}
            </div>
            <div className="ml-2">{userDetail?.name}</div>
          </div>

          <div className="flex  border-b-2 border-white hover:bg-slate-200 p-2 cursor-pointer">
            <span>
              <HiOutlineLogout size={28} />
            </span>
            <div className="ml-3 hover: bg-white" onClick={handleSignOut}>
              Sign Out
            </div>
          </div>

          <div
            className="flex  border-b-2 border-white hover:bg-slate-200 p-2 cursor-pointer"
            onClick={handleMode}
            ref={onclickonModeoptionRef}
          >
            <span className="flex-none w-6">
              <MdOutlineModeNight size={28} />
            </span>
            <span className="flex-none  ml-3">Appeareance:{"theme"}</span>
            <span className="grow pl-14">
              <IoIosArrowForward size={28} />
            </span>
          </div>
        </div>
      ) : null}

      {isSignIn || isLogin ? (
        <Navigate to="/login" state={{ from: location }} replace />
      ) : null}

      {clickonmode ? (
        <div
          ref={ModeRef}
          className=" flex flex-col justify-center items-center gap-4 fixed  mt-[8%] ml-[80%] w-60 h-[20%] rounded-xl shadow-md bg-slate-100 z-40 "
        >
          <div
            className="flex w-full cursor-pointer hover:bg-white"
            onClick={handledarkmode}
          >
            <MdModeNight size={28} /> <span>Dark theme</span>{" "}
            <span>{isdarkmode ? <TiTick /> : null}</span>
          </div>
          <div
            className="flex w-full cursor-pointer hover:bg-white"
            onClick={handlelightmode}
          >
            <MdOutlineModeNight size={28} /> <span>Light theme</span>
            <span>{isdarkmode ? null : <TiTick />}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
