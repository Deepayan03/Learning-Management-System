import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });
  console.log(data.userId);
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setData({ ...data, avatar: file, previewImage: fileReader.result });
      };
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("Please fill all the fields");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Full name should be at least 5 characters");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);
    formData.append("userId", data.userId);
    await dispatch(updateProfile(formData));
    await dispatch(getUserData());
    navigate("/user/profile");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[80vh]">
        <form className="flex flex-col items-center justify-center gap-5 rounded-xl p-4 text-white w-80 min-h-[26rem] shadow-[0_0_20px_black]">
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
          <label
            htmlFor="image_uploads"
            className="w-28 h-28 rounded-full m-0 cursor-pointer">
            {data.previewImage ? (
              <img
                src={data.previewImage}
                className="w-28 h-28 rounded-full m-auto"
                alt=""
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            id="image_uploads"
            name="image_uploads"
            onChange={handleUpload}
            className="hidden"
          />
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={data.fullName}
              id="fullName"
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full p-2 rounded-md outline-none border-[1px] border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-600 w-full hover:bg-yellow-200 text-black transition-all ease-in-out duration-300 cursor-pointer text-center font-semibold py-2 px-4 rounded-lg"
            onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default EditProfile;
