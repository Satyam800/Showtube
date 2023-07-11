import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../Utils/HembegerSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { YouTube_Search_API } from "../Utils/Constant";
import { SearchType, SearchRes, ShowSuggestion } from "../Utils/SearchSlice";
import SearchSuggestion from "./SearchSuggestion";
import { CacheTheResult } from "../Utils/SearchCache";

const Header = () => {
  const Searchdata = useSelector((state) => state.search?.event);
  const ShowResult = useSelector((state) => state.search?.Result);
  const showSearchSuggestion = useSelector((state) => state.search.isOnFocus);
  const CacheResult= useSelector((state)=>state.cache)

  

  const SearchResult = () => {
    console.log(ShowResult, "ok");
  };

  useEffect(() => {
    let promise = setTimeout(() => {
      if(CacheResult[Searchdata]){
          dispatch(SearchRes(CacheResult[Searchdata]))
      }
      else{
        Search()
      }
    }, 300);
    
    console.log(CacheResult,"cachetheresult")
    return () => {
      clearTimeout(promise);
    };
  }, [Searchdata]);

  async function Search() {
    let data = await fetch(YouTube_Search_API + Searchdata);
    let json = await data.json();

    dispatch(SearchRes(json[1]));

    dispatch(CacheTheResult({
    
     [Searchdata] : json[1]

    
  }))
    console.log(json[1], "pkkllkjjhh");
  }

  const icon = useSelector((state) => state.Icon?.isMenuOpen);

  const dispatch = useDispatch();
  console.log(icon);

  const Iconswitch = () => {
    dispatch(toggleMenu());
  };

  return (
    <>
      <div className="grid grid-cols-5 shadow-md items-baseline  fixed w-full z-20 bg-white">
        <div className="flex p-5   items-center   ">
          <img
            onClick={Iconswitch}
            className="h-6 mr-2 hover:bg-gray-200 hover:rounded-3xl cursor-pointer "
            src="https://cdn-icons-png.flaticon.com/512/3917/3917215.png"
          />
          <img
            className="h-8  w-40 "
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/2560px-Logo_of_YouTube_%282015-2017%29.svg.png"
          />
        </div>

        <div className="  col-span-3 w-full   ">
          <div className=" flex  items-baseline w-4/6 h-8 rounded-full border-2 border-zinc-300 ">
            <input
              placeholder="Search"
              className=" rounded-l-full w-[95%] h-full outline-gray-600 p-2 text-xl "
              onChange={(e) => dispatch(SearchType(e.target.value))}
              onFocus={() => dispatch(ShowSuggestion(true))}
              onBlur={() => dispatch(ShowSuggestion(false))}
            />

            <div
              className="cursor-pointer w-[5%] "
              onClick={() => SearchResult()}
            >
              <AiOutlineSearch size="19" />
            </div>
          </div>
        </div>
        <div className=" flex justify-evenly ">
          <img
            className=" h-8 "
            alt="icon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrHT--zJvS8seSj_lzt3rNeIz0TF2tGhbpUA&usqp=CAU"
          />
          <img
            className="h-9 "
            alt="login"
            src="https://w7.pngwing.com/pngs/713/762/png-transparent-computer-icons-button-login-image-file-formats-logo-monochrome.png"
          />
        </div>
      </div>

      <div className="w-full ml--8">
        {Searchdata.length > 0 && showSearchSuggestion ? (
          <div className="z-40 relative top-20  ">
            <SearchSuggestion  />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Header;

/*

Header
   Search
Body
 MainContainer
    buttonList
   sidebar//on hambericon
   videoContainer
     videoCard







*/
