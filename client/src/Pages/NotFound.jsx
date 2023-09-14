import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold tracking-widest text-white">
        404
      </h1>
      <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
        Page not found
      </div>
      <button className="mt-5 bg-zinc-200 rounded-md px-3 py-3 focus:outline-1 focus:ring border-current">
        <span
          onClick={() => navigate(-1)}
          className="relative inline-block text-sm font-medium  group active: text-black">
          Go back
        </span>
      </button>
    </div>
  );
};

export default NotFound;
