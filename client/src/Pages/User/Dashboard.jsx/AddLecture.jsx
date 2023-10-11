import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCourseLectures } from "../../../Redux/Slices/LectureSlice";
import HomeLayout from "../../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

const AddLecture = () => {
  const courseDetails = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    id: courseDetails._id,
    lecture: undefined,
    title: undefined,
    description: "",
    videoSrc: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleVideo = (e) => {
    const video = e.target.files[0];
    const source = URL.createObjectURL(video);
    console.log(source);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { lecture, title, description } = userInput;
    if (!lecture || !title || !description) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(addCourseLectures(userInput));
    if (response.payload.success) {
      setUserInput({
        id: courseDetails._id,
        lecture: undefined,
        title: undefined,
        description: "",
        videoSrc: "",
      });
      navigate(-1);
    }
  };

  useEffect(() => {
    console.log(courseDetails);

    if (!courseDetails) {
      navigate("/courses");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <HomeLayout>
      <div className=" text-white flex flex-col items-center justify-center gap-10 mx-16 min-h-[80vh] rounded-xl">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2 text-xl text-green-500">
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add your new lecture
            </h1>
          </header>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              value={userInput.title}
              onChange={handleInputChange}
              placeholder="Enter the title for lecture"
              className="bg-transparent px-3 py-1 border rounded-xl"
            />

            <textarea
              name="description"
              value={userInput.description}
              onChange={handleInputChange}
              placeholder="Enter the description for lecture"
              className="resize-none h-24 bg-transparent px-3 py-1 border rounded-xl scroll-m-3"
            />
            {userInput.videoSrc ? (
              <video
                src={userInput.videoSrc}
                muted
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"></video>
            ) : (
              <div className="h-48 border flex items-center justify-center cursor-pointer rounded-xl">
                <label
                  htmlFor="lecture"
                  className="font-semibold text-xl cursor-pointer">
                  Choose your video
                </label>
                <input
                  type="file"
                  name="lecture"
                  id="lecture"
                  onChange={handleVideo}
                  accept="video/mp4,video/x-m4v,video/*"
                  className="hidden"
                />
              </div>
            )}

            <button className="btn-primary py-1 font-semibold text-lg rounded-xl">
              Add Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AddLecture;
