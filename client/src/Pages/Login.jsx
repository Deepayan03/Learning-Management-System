import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const {email , password} = loginData;
    // checking the empty fields
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    // calling Login action
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) navigate("/");
    console.log(response);
    // clearing the signup inputs
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form className="flex flex-col justify-center gap-3 rounded lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Login Page</h1>
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
              value={loginData.email}
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
              value={loginData.password}
            />
          </div>
          <button
            onClick={(e) => handleLogin(e)}
            type="submit"
            className="bg-yellow-600 p-2 rounded-lg hover:bg-yellow-300 transition-all ease-in-out duration-500 text-black">
            Login
          </button>
          <p className="text-center">
            Don't have an account ?
            <Link
              to="/signUp"
              className=" link text-accent cursor-pointer hover:text-blue-700">
              Register
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Login;
