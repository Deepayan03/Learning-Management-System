import React from "react";
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs"
const Footer = () => {
  const year = new Date().getFullYear();
  console.log(year);
  return (
    <>
      <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-400 sm:px-10 pr-1 pl-1">
        <section>Copyright {year} | All rights reserved</section>
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
            <a className="hover:text-yellow-600 transition-all ease-in-out duration-300">
                <BsFacebook/>
            </a>
            <a className="hover:text-yellow-600 transition-all ease-in-out duration-300">
                <BsInstagram/>
            </a>
            <a className="hover:text-yellow-600 transition-all ease-in-out duration-300">
                <BsLinkedin/>
            </a>
            <a className="hover:text-yellow-600 transition-all ease-in-out duration-300">
                <BsTwitter/>
            </a>
        </section>
      </footer>
    </>
  );
};

export default Footer;
