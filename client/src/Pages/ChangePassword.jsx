import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { changePassword } from "../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [passwords , setPasswords] = useState({
        oldPassword : "",
        newPassword : "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) =>{
        const {name , value} = e.target;
        setPasswords({
            ...passwords,
            [name] : value
        });
    }

    const handlePasswordChange = async(e) =>{
        e.preventDefault();
        const response = await dispatch(changePassword(passwords));
        console.log(response);
        if(response?.payload?.success){
            navigate("/");
            setPasswords({
                oldPassword : "",
                newPassword : "",
            });
        }
    }
    
  return (
    <HomeLayout>
      <div className="flex items-center justify-center flex-col gap-5 h-[60vh]">
        <form
          action="submit"
          onSubmit={handlePasswordChange}
          className="flex flex-col justify-center gap-3 rounded-xl lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-2xl font-bold">Reset Password</h1>
            <label htmlFor="oldPassword">Enter your current Password</label>
            <input
              className="bg-transparent px-2 py-1 border rounded-lg"
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              formNoValidate
              onChange={(e) => handleChange(e)}
            />
             <label htmlFor="newPassword">Enter your new Password</label>
            <input
              className="bg-transparent px-2 py-1 border rounded-lg"
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              formNoValidate
              onChange={(e) => handleChange(e)}
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

export default ChangePassword;
