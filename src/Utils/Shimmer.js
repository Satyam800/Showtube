import React from "react";

const Shimmer = () => {
  return (
    <>
      <div className="flex flex-wrap  bg-yellow-300 absolute ">
        {Array(18)
          .fill("")
          .map((item) => {
            return <div className="w-190 h-190 bg-slate-600"></div>;
          })}
      </div>
    </>
  );
};

export default Shimmer;
