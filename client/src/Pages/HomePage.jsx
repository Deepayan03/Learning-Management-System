import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import homePageMainImage from "../assets/homePageMainImage.png"
const HomePage = () => {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[60vh]">
        <div className="w-1/2 space-y-6 ">
          <h1 className="text-5xl font-semibold">
            Find Out Best
            <span className="text-yellow-400 font-bold"> Online Courses</span>
            
          </h1>
          <p className="text-xl text-gray-200">
              we have a large library of courses taught by highly skilled and
              qualified faculties at a very affordable cost
            </p>
            <div className="space-x-6">
                <Link to="/courses">
                <button className="btn btn-outline btn-secondary">Explore Courses</button>
                </Link>
                <Link to="/contact">
                <button className="btn btn-outline btn-secondary">Contact Us</button>
                </Link>
            </div>
        </div>
        <div className="w-1/2 flex-1 justify-center align-middle   ">
            <img src={homePageMainImage} className="" alt="home page" />
        </div>
      </div>
    </HomeLayout >
  );
};

export default HomePage;
