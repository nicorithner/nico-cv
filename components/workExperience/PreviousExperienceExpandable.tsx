"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClicks";

export default function PreviousExperienceExpandable() {
  const [active, setActive] = useState<(typeof jobs)[number] | boolean | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                    <motion.p
                      layoutId={`location-and-years-${active.years}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-sm"
                    >
                      {`${active.location} - ${active.years[0]} to ${active.years[1]}`}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.stack === "function"
                      ? active.stack()
                      : active.stack}
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-auto mx-auto w-full gap-4 relative">
        {jobs.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 grid gap-4 lg:grid-cols-4 justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="col-span-2 lg:col-span-1">
              <motion.div
                layoutId={`image-${card.title}-${id}`}
                style={{
                  alignSelf: "center",
                  objectFit: "cover",
                  width: "100%",
                }}
              >
                <Image
                  width={500}
                  height={500}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-[100%] md:h-14 md:w-14 lg:h-[100%] lg:w-full rounded-lg object-cover"
                />
              </motion.div>
            </div>
            <div className="col-span-2 text-left h-full">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-medium text-neutral-800 dark:text-neutral-200 "
              >
                {card.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${card.description}-${id}`}
                className="text-neutral-600 dark:text-neutral-400"
              >
                {card.description}
              </motion.p>
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {typeof card.stack === "function" ? card.stack() : card.stack}
              </motion.div>
            </div>
            <div className="col-span-2 lg:col-span-1 text-center">
              <motion.button
                layoutId={`button-${card.title}-${id}`}
                className="px-4 py-2 text-sm rounded-lg font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mx-auto w-full"
              >
                {card.ctaText}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const jobs = [
  {
    description: "Full Stack Engineer",
    title: "Altvia Solutions",
    src: "/altvia.png",
    ctaText: "Learn More",
    ctaLink: "https://altvia.com/",
    location: "Broomfield, CO USA",
    years: ["2021", "2022"],
    stack: () => {
      const stack = [
        "Ruby",
        "JavaScript",
        "Ruby on Rails",
        "ReactJS",
        "AWS",
        "PostgreSQL",
        "Docker",
        "Agile",
        "Jira",
        "Gitlab",
        "Sentry",
      ];
      return (
        <div className="flex gap-2 lg:justify-normal flex-wrap mt-2 text-xs">
          {stack.map((str, index): React.ReactNode => {
            return (
              <span className="text-yellow-200 text-xs" key={index + 1}>
                {str}
              </span>
            );
          })}
        </div>
      );
    },
    content: () => {
      const desc = [
        "Feature building in React and Ruby on Rails.",
        "Agile, Scrum.",
        "Code optimization and troubleshooting.",
      ];
      return (
        <ul className="mt-1 list-none text-left text-base">
          {desc.map((str, index): React.ReactNode => {
            return (
              <li className="mb-2" key={index + 1}>
                {str}
              </li>
            );
          })}
        </ul>
      );
    },
  },
  {
    description: "Full Stack Engineer - Partime",
    title: "FyrKode Software Studio",
    src: "/fyrkode-hero-logo-lighthouse.png",
    ctaText: "Learn More",
    ctaLink: "https://fyrkode.com/",
    location: "Winter Park, CO USA",
    years: ["2024", "present"],
    stack: () => {
      const stack = [
        "JavaScript",
        "TypeScript",
        "ReactJS",
        "React Native",
        "CSS",
        "SASS",
        "JAVA",
        "SpringBoot",
        "AWS",
        "PostgreSQL",
        "Agile",
        "Jira",
        "Github",
      ];
      return (
        <div className="flex gap-2 lg:justify-normal flex-wrap mt-2 text-xs">
          {stack.map((str, index): React.ReactNode => {
            return (
              <span className="text-yellow-200 text-xs" key={index + 1}>
                {str}
              </span>
            );
          })}
        </div>
      );
    },
    content: () => {
      const desc = [
        "Feature building in ReactJS, React Native and Java.",
        "Agile, Scrum.",
        "Code optimization and troubleshooting.",
      ];
      return (
        <ul className="mt-1 list-none text-left text-base">
          {desc.map((str, index): React.ReactNode => {
            return (
              <li className="mb-2" key={index + 1}>
                {str}
              </li>
            );
          })}
        </ul>
      );
    },
  },
  {
    description: "Full Stack Engineer",
    title: "ProductPlan",
    src: "/productplan.png",
    ctaText: "Learn More",
    ctaLink: "https://www.productplan.com/",
    location: "Denver, CO USA",
    years: ["2022", "2023"],
    stack: () => {
      const stack = [
        "Ruby on Rails",
        "ReactJS",
        "AWS",
        "PostgreSQL",
        "Agile",
        "Github",
      ];
      return (
        <div className="flex gap-2 lg:justify-normal flex-wrap mt-2 text-xs">
          {stack.map((str, index): React.ReactNode => {
            return (
              <span className="text-yellow-200 text-xs" key={index + 1}>
                {str}
              </span>
            );
          })}
        </div>
      );
    },
    content: () => {
      const desc = [
        "Contributed to the development of new features as a key member of the Integrations team, including the enhancement of the app's integration with Azure DevOps, utilizing Ruby on Rails and ReactJS.",
        "Maintained legacy-code Ruby on Rails/ReactJS monolith, proactively troubleshooting issues and conducting thorough tests to ensure optimal functionality and stability.",
      ];
      return (
        <ul className="mt-1 list-none text-left text-base">
          {desc.map((str, index): React.ReactNode => {
            return (
              <li className="mb-2" key={index + 1}>
                {str}
              </li>
            );
          })}
        </ul>
      );
    },
  },
];
