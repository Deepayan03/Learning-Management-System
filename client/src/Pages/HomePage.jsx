import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import homePageMainImage from "../assets/homePageMainImage.png";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex flex-col items-center justify-center gap-6 mx-4 md:mx-16 h-[70vh] md:flex-row">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Find the Best <span className="text-yellow-400 font-bold">Online Courses</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            We offer a vast library of courses taught by highly skilled and
            qualified instructors at affordable prices.
          </p>
          <div className="mt-4 space-y-4 md:mt-6 md:space-y-0 md:space-x-4">
            <Link to="/courses">
              <button className="btn btn-outline btn-secondary mr-2">
                Explore Courses
              </button>
            </Link>
            <Link to="/contact">
              <button className="btn btn-outline btn-secondary mr-2">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={homePageMainImage} alt="home page" className="max-w-full h-auto" />
        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
