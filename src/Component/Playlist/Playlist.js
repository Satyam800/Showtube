import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { list } from "../../Utils/HembegerSlice";
import { createPlaylist, playlist } from "../../Utils/playlistSlice";
import { all } from "axios";
const Playlist = () => {
  const [searchParam] = useSearchParams();
  const Id = searchParam.get("v");
  const playlistRef = useRef([]);
  const titleRef = useRef();
  const nameRef = useRef([]);
  const [clickedonCreate, SetclickedOnCreate] = useState(false);
  const dispatch = useDispatch();
  const [isCreate, SetisCreate] = useState(false);
  const allList = useSelector((store) => store.playlist.list);
  const clickedonPlaylist = useSelector((store) => store.Icon.Playlist);
  const handleInput = (index) => {
    const box = playlistRef.current[index];
    console.log(box.checked, nameRef.current, "checking");
    if (box.checked == true) {
      dispatch(
        createPlaylist({
          name: nameRef.current[index].innerText,
          userId: JSON.parse(localStorage.getItem("id"))?._id,
          videoId: Id,
        })
      );
    }
    console.log("changeed", box?.checked);
  };

  useEffect(() => {
      dispatch(
        playlist({
          userId: JSON.parse(localStorage.getItem("id"))._id,
        })
      )
    SetclickedOnCreate(false)
  }, [clickedonCreate,clickedonPlaylist])

  const handleCreate = () => {
    dispatch(
      createPlaylist({
        name: titleRef.current.value,
        userId: JSON.parse(localStorage.getItem("id"))?._id,
        videoId: Id,
      })
    )
    SetclickedOnCreate(true);
    SetisCreate(false);
  };

  const handleCut = () => {
    SetisCreate(true);
    SetclickedOnCreate(false);
  };
  return (
    <>
      <div className="absolute top-[25%] z-200 left-[39%] z-100 flex flex-col p-1 sm:w-[20%] w-[47%] min-h-[38%] max-h-auto bg-white bg-opacity-100 shadow-xl rounded-sm ">
        <RiDeleteBack2Fill
          size={32}
          className="absolute left-[93%] top-0 cursor-pointer"
          onClick={() => dispatch(list(false))}
        />
        <div className="flex flex-col  ml-[20%]  ">
          <span className="font-semibold">save to</span>
          <hr className="ml-0"/>
          {allList?.map((i, index) => {
            return (
              <label
                className="flex text-xl w-[90%] gap-y-3  ml-[3%] focus:bg-slate-50 "
                key={index}
                ref={(i) => (nameRef.current[index] = i)}
              >
                <input
                className="mr-2"
                  type="checkbox"
                  ref={(i) => (playlistRef.current[index] = i)}
                  onChange={() => handleInput(index)}
                />
                <div className="w-[90%]h-8">{i.name}</div>
              </label>
            );
          })}
        </div>
        {isCreate ? null : (
          <div
            className="flex cursor-pointer text-xl mt-5 ml-[15%]  font-thin "
            onClick={handleCut}
          >
            <CiSquarePlus size={32} />
            <div className="text-xl text-red-700">Create playlist</div>
          </div>
        )}

        {isCreate ? (
          <label className="flex flex-col   w-[90%] ml-[5%] rounded-lg   font-semibold">
            <span className="text-xl font-medium m-1"> Title</span>
            <input
              ref={titleRef}
              className="py-1 px-2  focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 outline-none border-b-2 border-cyan-700"
              placeholder="Enter Playlist Name"
            />

            <button
              className="w-20 h-8 mt-3 left-[30%] text-xl rounded-lg  text-red-900 bg-black hover:bg-cyan-800"
              onClick={handleCreate}
            >
              create
            </button>
          </label>
        ) : null}
      </div>
    </>
  );
};

export default Playlist;
