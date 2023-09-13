import React from "react";
import { AiFillCloseCircle } from "react-icons/ai/";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/footer";
// import Card from "../Components/misc/card";
const HomeLayout = ({ children }) => {
  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
  };
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const isLoggedIn= useSelector((state)=>state?.auth?.isLoggedIn);
  const role= useSelector((state)=>state?.auth?.role);
  const handleLogout=(e)=>{
    e.preventDefault();
    // const res=await dispatch(logout())
    // if(res?.payload?.success){
    //   navigate("/")
    // }
  }
  return (
    <div className="min-h-[90vh]">
      <div className="drawer ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 font-bold">
              {" "}
              <Link to="/">EDURA</Link>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
              
                <li>
                  <Link to="/">Home</Link>
                </li>
                {isLoggedIn && role==="ADMIN" && <li>
                  <Link to="/admin/Dashboard">Admin Dashboard</Link>
                </li>}
                <li>
                  <Link to="/courses">All Courses</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
              
            </li>
            {isLoggedIn && (
              <li className="flex flex-row">
                <button className="btn-primary px-4 py-3 flex justify-center  font-semibold rounded-md bg-white text-black mr-3">
                  <Link to="/login">Login</Link>
                </button>
                <button className="btn-primary px-4 py-3 flex justify-center  font-semibold rounded-md bg-blue-300 text-black">
                <Link to="/signUp">Sign up</Link>
                </button>
                </li>
            )} 
            {!isLoggedIn && (
              <li className="flex flex-row" >
               
                <button className="btn-primary px-4 py-3 flex justify-center  font-semibold rounded-md bg-white text-black mr-3">
                <Link onClick={handleLogout} >Logout</Link>
                </button>
                <button className="btn-primary px-4 py-3 flex justify-center  font-semibold rounded-md bg-blue-300 text-black">
                <Link to="/user/profile">My Profile</Link>
                </button>
                </li>
            )} 

              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 min-h-full bg-base-200">
            <li>
              <button onClick={hideDrawer} className="flex-1 justify-end">
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            {! isLoggedIn && <li className="absolute bottom-4 w-[90%]">
            <div className=" w-full flex items-center justify-center">
                <button className="btn-primary px-2 py-1 h-11 w-15 font-semibold rounded-md  text-black">
                  <Link to="/login">Login</Link>
                </button>
                <button className="btn-primary px-2 py-1 h-11 w-15 font-semibold rounded-md  text-black">
                <Link to="/signUp">Sign up</Link>
                </button>
                </div>
            </li>}
            {isLoggedIn && <li className="absolute bottom-4 w-[90%]">
            <div className=" w-full flex items-center justify-center">
                <button className="btn-primary px-2 py-1 h-11 w-15 font-semibold rounded-md  text-black">
                  <Link onClick={handleLogout} >Logout</Link>
                </button>
                <button className="btn-primary px-2 py-1   h-11 w-15 font-semibold rounded-md bg-blue-300 text-black">
                <Link to="/user/profile">My Profile</Link>
                </button>
                </div>
            </li>}
            {isLoggedIn && role==="ADMIN" && <li>
                  <Link to="/admin/Dashboard">Admin Dashboard</Link>
              </li>}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
