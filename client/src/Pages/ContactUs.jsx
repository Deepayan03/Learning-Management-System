import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { EmailValidator } from "../Helpers/Validator";
import axiosInstance from "../Helpers/axiosInstance";

const ContactUs = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { name, email, message } = userInput;
    if (!name || !email || !message) {
      toast.error("All fields are mandatory");
      return;
    }
    if (!EmailValidator(email)) {
      toast.error("Enter proper email");
      return;
    }
    try {
        const response = axiosInstance.post("/misc/contact", userInput);
        toast.promise(response,{
            loading : "Submitting your message",
            success : "Your message has been recieved",
            error : "Failed to submit the form...Please try again later"
        });
        const contactResponse = await response;
        if(contactResponse?.data?.success){
            setUserInput({
                name: "",
                email: "",
                message: "",
              });
        }
    } catch (error) {
        toast.error(error.message);
    }
  };
  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[80vh]">
        <form
          action=""
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
          noValidate>
          <h1 className="text-3xl font-semibold">Contact Form</h1>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold ml-1">
              Name
            </label>
            <input
              type="text"
              className="bg-transparent border px-2 py-1 rounded-2xl"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold ml-1">
              Email
            </label>
            <input
              type="text"
              className="bg-transparent border px-2 py-1 rounded-2xl"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold ml-1">
              Message
            </label>
            <textarea
              type="text"
              className="bg-transparent border px-2 py-1 rounded-2xl resize-none h-40"
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-200 text-black transition-all ease-in-out duration-300 rounded-2xl py-2 text-lg cursor-pointer"
            onClick={(e) => handleFormSubmit(e)}>
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ContactUs;
