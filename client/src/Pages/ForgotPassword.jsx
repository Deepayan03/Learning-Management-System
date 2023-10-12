import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { EmailValidator } from "../Helpers/Validator";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../Redux/Slices/AuthSlice";

const ForgotPassword = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    if (!EmailValidator(email)) {
      toast.error("Enter a valid email");
      return;
    }
    const response = await dispatch(forgotPassword(email));
    console.log(response);
    if(response?.payload?.success){
        setShowMessage(true);
    }
  };
  return (
    <HomeLayout>
      <div className="flex items-center justify-center flex-col gap-5 h-[60vh]">
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-3 rounded-xl lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-2xl font-bold">
              Forgot Password Page
            </h1>
            <label htmlFor="email">Enter your Email</label>
            <input
              className="bg-transparent px-2 py-1 border rounded-lg"
              type="text"
              name="email"
              formNoValidate
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-600 p-2 rounded-lg hover:bg-yellow-300 transition-all ease-in-out duration-500 text-black">
              Submit
            </button>
          </div>
        </form>
        
        {showMessage && (
          <div className="text-center flex flex-col justify-center gap-3 rounded-xl lg p-4 text-white w-96 shadow-[0_0_10px_black]">
            <p>
              An email will be sent to you shortly.Click on the link and you
              will be redirected to the reset password page.
              <Link
              to="https://mail.google.com/mail/u/0/#inbox"
              className=" link text-accent cursor-pointer hover:text-blue-700">
             {"    Click here to go to email"}
            </Link>
            </p>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};
export default ForgotPassword;
