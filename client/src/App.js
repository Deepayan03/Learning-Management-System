import { Route, Routes } from "react-router-dom";
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
import UserProfile from "./Pages/User/UserProfile";
import EditProfile from "./Pages/User/EditProfile";
import Checkout from "./Pages/Payments/Checkout";
import Success from "./Pages/Payments/Success";
import Failure from "./Pages/Payments/Failure";
import DisplayLectures from "./Pages/User/Dashboard.jsx/DisplayLectures";




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
      {/* Profile Route  Accessible for both normal users and admin*/}
      <Route  element={<Authorize allowedRoles={["ADMIN","USER"]}/>}>
      <Route path="/user/profile" element={<UserProfile />}></Route>
      <Route path="/user/editProfile" element={<EditProfile />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/payment/success" element={<Success />}></Route>
      <Route path="/payment/failure" element={<Failure />}></Route>
      <Route path="/course/displayLectures" element={<DisplayLectures />}></Route>
      </Route>
      {/*PAGE NOT FOUND route */}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
