import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import {  Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";
const SignUp = () => {
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupData, setSignUpData] = useState({
    fullName: "",
    email: " ",
    password: "",
    avatar: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signupData,
      [name]: value,
    });
  };
  const getImage = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setSignUpData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        // console.log(this.result);
        setPreviewImage(this.result);
      });
    }
    return;
  };
  const createNewAccount = async (event) => {
    event.preventDefault();

    // checking the empty fields
    if (
      !signupData.avatar ||
      !signupData.email ||
      !signupData.fullName ||
      !signupData.password
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    // checking the name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }

    // email validation using regex
    if (
      !signupData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      toast.error("Invalid email id");
      return;
    }

    // password validation using regex
    if (!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }
    // calling create account action
    const response = await dispatch(createAccount(signupData));
    if(response?.payload?.success)
        navigate("/");
    console.log(response);
    // clearing the signup inputs
    setSignUpData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  };
  
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form className="flex flex-col justify-center gap-3 rounded lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
                alt="img"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            onChange={getImage}
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Enter your Full Name
            </label>
            <input
              type="text"
              required
              id="fullName"
              name="fullName"
              className="bg-transparent px-2 py-1 border rounded-lg"
              onChange={(e) => {
                handleUserInput(e);
              }}
              value={signupData.fullName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Enter your email
            </label>
            <input
              type="email"
              required
              id="email"
              name="email"
              className="bg-transparent px-2 py-1 border rounded-lg"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Enter your password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              className="bg-transparent px-2 py-1 border rounded-lg"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>
          <button
            onClick={(e) => createNewAccount(e)}
            type="submit"
            className="bg-yellow-600 p-2 rounded-lg hover:bg-yellow-300 transition-all ease-in-out duration-500 text-black">
            Create Account
          </button>
          <p className="text-center">
            Already have an account ?
            <Link
              to="/login"
              className=" link text-accent cursor-pointer hover:text-blue-700">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default SignUp;
