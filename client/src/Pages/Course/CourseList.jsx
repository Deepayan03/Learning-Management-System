import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import Card from "../../Components/card";
import { useQuery } from 'react-query';

const CourseList = () => {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);
//   console.log(courseData)
//   const loadCourses = async () => {
//     await dispatch(getAllCourses());
// }
//   useEffect(() => {
//     loadCourses();
//     // eslint-disable-next-line
//   },[]);
  const fetchCourses = async () => {
    const response = await dispatch(getAllCourses());
    return response;
  };

  const { isLoading, error, data } = useQuery('courses', fetchCourses, {
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  console.log(data);
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20 pr-20 flex flex-col items-center justify-center text-white">
        <h1 className="text-center text-3xl font-semibold mb-5">Explore the courses made by
        <span className="font-bold text-yellow-500 "> Indrustry Experts</span>
        </h1>
        <div className="mb-10 flex flex-wrap gap-16 justify-center items-center">
          {courseData?.map((course)=>(
            <Card key={course._id} data={course}  />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
