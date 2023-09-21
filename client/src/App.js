import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import CourseList from "./Pages/Course/CourseList";
import ContactUs from "./Pages/ContactUs";
import Denied from "./Pages/Denied";
import CourseDescription from "./Pages/Course/CourseDescription";
import Authorize from "./Components/Auth/Authorize";
import CreateCourse from "./Pages/Course/CreateCourse";

function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/about" element={<AboutUs />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/courses" element={<CourseList />}></Route>
      <Route path="/contact" element={<ContactUs />}></Route>
      <Route path="/denied" element={<Denied />}></Route>
      <Route path="/course/description" element={<CourseDescription />}></Route>
      {/* ADMIN routes */}
      <Route  element={<Authorize allowedRoles={["ADMIN"]}/>}>
      <Route path="/course/create" element={<CreateCourse />}></Route>
      </Route>
      {/*PAGE NOT FOUND route */}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
