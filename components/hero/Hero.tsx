import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import MagicButton from "../buttons/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="pb-5 lg:pb-10 border-4 pt-10 z-20">
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

          <p className="text-center text-base sm:text-lg md:text-3xl lg:text-5xl font-bold dark:text-white text-black">
            <span className="text-brand">Fullstack</span> Software Developer
          </p>

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
