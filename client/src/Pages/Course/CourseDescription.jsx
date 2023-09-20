import { useLocation } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

const CourseDescription = () => {
  const { state } = useLocation();
  const { role, data } = useSelector((state) => state?.auth);

  return (
    <HomeLayout>
      <div className="px-4 h-3/4 md:px-0 flex items-center justify-center">
        <div className="mt-3 w-full md:w-3/4 rounded-xl bg-slate-600 py-5 px-4 md:px-10 flex flex-col items-center justify-center text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 py-5 relative">
            <div className="space-y-5 text-center md:text-left">
              <img
                className="w-80 max-h-fit mx-auto md:mx-0 rounded-xl"
                src={state?.thumbnail?.secure_url}
                alt="thumbnail"
              />
              <div className="space-y-5">
                <div className="text-xl">
                  <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">
                      Total Lectures :
                    </span>
                    {" " + state?.numberOfLectures}
                  </p>
                  <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">
                      Instructor :
                    </span>
                    <br />
                    <span className="break-words">
                      {" " + state?.createdBy}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                {role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                  <button className="bg-yellow-500 text-xl rounded-xl font-bold px-5 py-3 w-full md:w-auto hover:bg-yellow-300 text-black transition-all ease-in-out duration-300">
                    Watch Lectures
                  </button>
                ) : (
                  <button className="bg-yellow-500 text-xl rounded-xl font-bold px-5 py-3 w-full md:w-auto hover:bg-yellow-100 text-black transition-all ease-in-out duration-300">
                    Subscribe
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-2 text-xl">
              <h1 className="text-3xl font-bold text-yellow-500 mb-3 text-center md:text-left">
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
