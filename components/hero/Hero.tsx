import React from "react";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import MagicButton from "../buttons/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { PatternBackground } from "../ui/PatternBackground";
import { TypewriterEffect } from "../ui/TypewriterEffect";
import Image from "next/image";

const Hero = () => {
  const words = [
    {
      text: "Fullstack",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Software",
    },
    {
      text: "Developer",
    },
  ];

  return (
    <div className="pb-5 lg:pb-10 border-4 pt-10 z-20">
      {/* Pattern Background */}
      <PatternBackground
        gridType="dark:bg-dot-white/[0.4] bg-dot-black/[0.2]"
        styles="h-full w-full dark:bg-black-100 bg-white  flex items-center justify-center absolute top-0 left-0"
      />
      <div className="relative flex flex-col lg:flex-row justify-center items-center">
        <Image
          className="lg:order-2 w-[100%] lg:w-auto mt-4 lg:rounded-full z-10 object-cover h-[20rem] lg:h-[30rem]"
          src="/nico-headshot.png"
          alt="headshot of Nico"
          width={500}
          height={500}
        />

        <div className="flex flex-col justify-center items-center ">
          <TextGenerateEffect
            className="text-center text-3xl md:text-5xl lg:text-8xl"
            words="NICO RITHNER"
          />

          <TypewriterEffect words={words} />

          <div className="flex justify-center items-center p-1 mt-4">
            <a href="#experience">
              <MagicButton
                title="Experience"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
