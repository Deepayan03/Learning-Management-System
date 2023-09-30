import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

const UserProfile = () => {
  const userData = useSelector((state) => state?.auth?.data);
  console.log(userData);
  return (
    <HomeLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-150 shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            alt="UserImage"
            className="w-40 m-auto rounded-full border border-black"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2">
            <p>Email:</p>
            <p>{userData?.email}</p>
            <p>Role:</p>
            <p>{userData?.role}</p>
            <p>Subscription:</p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Link to="/changePassword">
              <button className="bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 cursor-pointer text-center text-black font-bold py-2 px-4 rounded-lg ">
                Change Password
              </button>
            </Link>
            <Link to="/user/editProfile">
              <button className="bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 cursor-pointer text-center text-black font-bold py-2 px-4 rounded-lg ">
                Edit Profile
              </button>
            </Link>
          </div>
          {userData?.subscription?.status === "active" && (
            <button className="bg-red-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer text-center text-black font-bold py-2 px-4 rounded-lg ">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default UserProfile;
