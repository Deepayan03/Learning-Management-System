import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { useNavigate, useParams } from "react-router-dom";
import { PasswordValidator } from "../Helpers/Validator";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetPassword } from "../Redux/Slices/AuthSlice";

const ResetPassword = () => {
    const [password,setPassword] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();
    const handlePasswordChange = async(e)=>{
        e.preventDefault();
        if(!PasswordValidator(password)){
            toast.error("Enter a valid password");
            return;
        }
        await dispatch(resetPassword([password,token]));
        navigate("/login");
    }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center flex-col gap-5 h-[60vh]">
        <form
          action="submit"
          onSubmit={handlePasswordChange}
          className="flex flex-col justify-center gap-3 rounded-xl lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-2xl font-bold">
              Reset Password
            </h1>
            <label htmlFor="email">Enter your new Password</label>
            <input
              className="bg-transparent px-2 py-1 border rounded-lg"
              type="password"
              name="password"
              formNoValidate
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-600 p-2 rounded-lg hover:bg-yellow-300 transition-all ease-in-out duration-500 text-black">
              Submit
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ResetPassword;
