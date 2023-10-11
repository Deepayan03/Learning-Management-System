import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomeLayout from "../../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLectures,
  getCourseLectures,
} from "../../../Redux/Slices/LectureSlice";

const DisplayLectures = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const lectures = useSelector((lectureState) => lectureState.lectures);
  // const {lectures} = useSelector((lectureState) => lectureState.lectures);
  const [currentLecture, setCurrentLecture] = useState(0);
  const { role } = useSelector((data) => data.auth);
  const loadLectures = async () => {
    await dispatch(getCourseLectures(state._id));
  };
  const handleLectureDelete = async (courseId, lectureId) => {
    await dispatch(deleteCourseLectures([courseId, lectureId]));
    await dispatch(getCourseLectures(state._id));
  };
  useEffect(() => {
    if (!state) {
      navigate("/courses");
    }
    console.log(role);
    loadLectures();
    //eslint-disable-next-line
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[50vh] py-10 text-white mx-[5%] overflow-hidden">
        {/* displaying the course name */}

        <h1 className="text-center text-2xl font-semibold text-yellow-500">
          Course Name : {state?.title}
        </h1>
        {console.log(lectures)}
        {lectures.lectures.length > 0 && (
          <div className="flex justify-center gap-10 w-full">
            {/* left section for playing the video and displaying course details to admin */}
            <div className="space-y-5 w-[28rem] h-[25rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              {/* {console.log(lectures.lectures[currentLecture].lecture.secure_url)} */}
              <video
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                src={
                  lectures &&
                  lectures.lectures[currentLecture]?.lecture?.secure_url
                }
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"></video>
              <div>
                <h1>
                  <span className="text-yellow-500">Title : </span>
                  {lectures && lectures.lectures[currentLecture]?.title}
                </h1>
                <p>
                  {" "}
                  <span className="text-yellow-500 line-clamp-4">
                    Description :{" "}
                  </span>
                  {lectures && lectures.lectures[currentLecture]?.description}
                </p>
              </div>
            </div>

            {/* right section for displaying all the lectures of the course */}
            <ul className="w-[28rem]  p-2 h-[25rem] rounded-lg shadow-[0_0_10px_black] space-y-4 overflow-y-auto ">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures List</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", {
                        state: { ...state },
                      })
                    }
                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                    Add New Lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.lectures.map((element, index) => {
                  return (
                    <li
                      className={`space-y-2 cursor-pointer p-3 rounded-xl ${
                        index === currentLecture
                          ? "bg-slate-700"
                          : "bg-slate-500"
                      }`}
                      onClick={() => setCurrentLecture(index)}
                      key={element._id}>
                      <p
                        className="cursor-pointer"
                       >
                        <span className="text-yellow-500">
                          {" "}
                          Lecture {index + 1} :{" "}
                        </span>
                        {element?.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            handleLectureDelete(state?._id, element?._id)
                          }
                          className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
