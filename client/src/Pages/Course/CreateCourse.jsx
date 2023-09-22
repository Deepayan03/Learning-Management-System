import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy:"",
    thumbnail: null,
    previewImage: "",
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category, thumbnail, createdBy } = userInput;
    console.log( title, description, category, thumbnail, createdBy);
    if (!title || !description || !category || !thumbnail || !createdBy) {
      toast.error("All fields are required");
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        category: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  };
  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[100vh] sm:h-[80vh] py-16">
        <form
          noValidate
          className="container w-full sm:w-1/2 flex flex-col mx-auto space-y-12">
          <fieldset className="sm:grid grid-cols-5 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            {/* Larger image with button at the bottom */}
            <div className="w-full sm:w-[1/3] flex items-center justify-center flex-col">
              <img
                name="thumbnail"
                src={userInput.previewImage || "https://source.unsplash.com/300x300/?random"}
                alt="null"
                className="w-full h-auto mb-5 rounded-sm sm:w-32 sm:h-32 dark:bg-gray-700"
              />
              <input type="file"  className="hidden" id="fileInput" onChange={handleImageUpload} />
              <button
              onClick={() => document.getElementById('fileInput').click()}
              type="button"
              className="px-4 py-2 m-auto  border rounded-md dark:border-gray-100">
              Change
            </button>
            </div>
            
            <div className="col-span-full sm:col-span-3 grid grid-cols-6 gap-4">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="title" className="text-sm">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  onChange={handleUserInput}
                  className="p-2 w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="category" className="text-sm">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  onChange={handleUserInput}
                  type="text"
                  placeholder="Category"
                  className="w-full rounded-md p-2 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="instructor" className="text-sm">
                  Instructor Name
                </label>
                <input
                  id="instructor"
                  name="createdBy"
                  type="text"
                  onChange={handleUserInput}
                  placeholder="Instructor"
                  className="w-full rounded-md p-2 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="description" className="text-sm">
                  Course description
                </label>
                <textarea
                  style={{ resize: "none" }}
                  id="description"
                  name="description"
                  onChange={handleUserInput}
                  type="text"
                  placeholder="Description"
                  className="w-full rounded-md p-5 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
            </div>
            <button
              className="col-span-full sm:col-start-4 p-3  bg-blue-300 text-black rounded-md"
              type="submit" onClick={(e)=>handleFormSubmit(e)}>
              Create
            </button>
          </fieldset>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;
