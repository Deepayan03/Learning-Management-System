import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigator = useNavigate();
  return (
    <div
      onClick={() => navigator("/course/description", { state: { ...data } })}
      className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700 p-2">
      <div className="overflow-hidden">
        <img
          src={data?.thumbnail?.secure_url}
          alt="course"
          className="h-48 w-full rounded-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300"
        />
        <div className="p-3 space-y-1 text-white">
          <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
            {"  " + data?.title}
          </h2>
          <span className="text-yellow-500 font-bold">Description :</span>
          <p className="line-clamp-2">{data?.description}</p>
          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Category : </span>
            {"  " + data?.category}
          </p>
          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Total Lectures :</span>
            {"  " + data?.numberOfLectures}
          </p>
          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Instructor :</span>
            {"  " + data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
