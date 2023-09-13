import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import aboutUs from "../assets/aboutMainImage.png";
import einstein from "../assets/einstein.png";
import apj from "../assets/apj.png";
import billGates from "../assets/billGates.png";
import nellson from "../assets/nelsonMandela.png";
import steveJobs from "../assets/steveJobs.png";
import Carausel from "./Carausel";
import Footer from "../Components/footer";
const AboutUs = () => {
  const celebrities = [
    {
      title: "Nelson Mandela",
      description:
        "Education is the most powerful tool you can use to change the world",
      image: nellson,
      slideNumber: 1,
    },
    {
      title: "A. P. J. Abdul Kalam",
      description:
        "Learning gives creativity, creativity leads to thinking,thinking provides knowledge, knowledge makes you great.",
      image: apj,
      slideNumber: 2,
    },
    {
      title: "Albert Einstein",
      description:
        "Education is not the learning of facts, but the training of themind to think.",
      image: einstein,
      slideNumber: 3,
    },
    {
      title: "Steve Jobs",
      description:"Innovation distinguishes between a leader and a follower.",
      image: steveJobs,
      slideNumber: 4,
    },
    {
      title: "Bill Gates",
      description: "Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most",
      image: billGates,
      slideNumber: 5,
    },
  ];
  return (
    <HomeLayout>
      <div className="pl-20 pt-10 flex flex-col text-white">
        {/* creating the about page main section */}
        <div className="flex items-center gap-5 mx-10">
          {/* out moto section */}
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their creativity, skills and knowledge to each
              other to empower and contribute in the growth and wellness of the
              mankind.
            </p>
          </section>

          {/* our moto image section */}
          <div className="w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0, 0, 0))",
              }}
              className="drop-shadow-2xl "
              src={aboutUs}
              alt="aboutMainImage"
            />
          </div>
        </div>

        {/* top personalities quotes section */}
        <div className="carousel m-auto w-1/2 my-16">
          {celebrities.map((item)=>(
            <Carausel
                title={item.title}
                image={item.image}
                slideNumber={item.slideNumber}
                description={item.description}
                totalSlides={celebrities.length}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;
