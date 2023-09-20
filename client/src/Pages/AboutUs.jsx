import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import aboutUs from "../assets/aboutMainImage.png";
import einstein from "../assets/einstein.png";
import apj from "../assets/apj.png";
import billGates from "../assets/billGates.png";
import nellson from "../assets/nelsonMandela.png";
import steveJobs from "../assets/steveJobs.png";
import Carausel from "./Carausel";

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
        "Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great.",
      image: apj,
      slideNumber: 2,
    },
    {
      title: "Albert Einstein",
      description:
        "Education is not the learning of facts, but the training of the mind to think.",
      image: einstein,
      slideNumber: 3,
    },
    {
      title: "Steve Jobs",
      description: "Innovation distinguishes between a leader and a follower.",
      image: steveJobs,
      slideNumber: 4,
    },
    {
      title: "Bill Gates",
      description:
        "Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most",
      image: billGates,
      slideNumber: 5,
    },
  ];

  return (
    <HomeLayout>
      <div className="pt-10 px-4 md:px-20 flex flex-col text-white ">
        <section className="w-full  md:flex items-center gap-5">
          <div className="md:w-1/2">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide affordable and quality education to the
              world. We provide a platform for aspiring teachers and students to
              share their creativity, skills, and knowledge with each other to
              empower and contribute to the growth and well-being of mankind.
            </p>
          </div>
          <div className="md:w-1/3">
            <img
              id="test1"
              className="w-full drop-shadow-2xl"
              src={aboutUs}
              alt="aboutMainImage"
            />
          </div>
        </section>

        <div className="carousel m-auto w-full md:w-1/2 my-16">
          {celebrities.map((item) => (
            <Carausel
              title={item.title}
              image={item.image}
              slideNumber={item.slideNumber}
              description={item.description}
              totalSlides={celebrities.length}
              key={item.slideNumber}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;
