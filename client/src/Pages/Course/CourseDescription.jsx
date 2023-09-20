import { useLocation } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

const CourseDescription = () => {
  const { state } = useLocation();
  const { role, data } = useSelector((state) => state?.auth);
  return (
    <HomeLayout>
      <div className="flex items-center justify-center  ">
        <div className="min-h-[80vh] mt-3 w-3/4 rounded-xl bg-slate-600 py-5 px-10 flex flex-col items-center justify-center text-white">
          <div className="grid grid-cols-2 gap-10 py-10 relative">
            <div className="flex items-center justify-center flex-wrap">
            <div className="space-y-5  ">
              <div className=" flex flex-col items-center justify-center text-center">
                <img
                  className=" w-80 max-h-fit flex self-center rounded-xl"
                  src={state?.thumbnail?.secure_url}
                  alt="thumbnail"
                />
              </div>
              <div className="space-y-5">
                <div className="flex flex-col ml-3 text-xl flex-wrap">
                  <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">
                      Total Lectures :
                    </span>
                    {" " + state?.numberOfLectures}
                  </p>
                  <p className="font-semibold ">
                    <span className="text-yellow-500 font-bold">
                      Instructor :
                    </span>
                    <br/>
                    <span className="break-words">
                    {" " + state?.createdBy}
                    </span>
                  </p>
                </div>
                </div>
                <div className="flex items-center justify-center">
                  {role === "ADMIN" ||
                  data?.subscription?.status === "ACTIVE" ? (
                    <button className="bg-yellow-500 text-xl rounded-xl font-bold px-5 py-3 w-full hover:bg-yellow-300 text-black transition-all ease-in-out duration-300">
                      Watch Lectures
                    </button>
                  ) : (
                    <button className="bg-yellow-500 text-xl rounded-xl font-bold px-5 py-3 w-80 hover:bg-yellow-100 text-black transition-all ease-in-out duration-300">
                      Subscribe
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xl">
              <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                {state?.title}
              </h1>
              <p className="text-yellow-500">Course Description</p>
              <p>{state?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
