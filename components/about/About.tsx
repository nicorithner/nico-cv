"use client";
import { cn } from "@/lib/utils";
import { Us, Es, No } from "react-flags-select";
import { motion } from "framer-motion";

export default function About() {
  const cardsStandardStyle =
    "row-span-1 relative overflow-hidden rounded-3xl justify-between flex flex-col space-y-4 ";
  const features = [
    {
      title: "About",
      description: [
        "Creative and resourceful problem solver with enthusiasm for learning and acquiring new skills.",
        "Patient and persistent in the face of challenging problems.",
        "Team player, cooperative and kind. Firm believer that it takes a team to achieve great things.",
      ],
      className: `${cardsStandardStyle} col-span-1 lg:col-span-3 row-span-2 border-2 p-4 h-fit`,
    },
    {
      title: "Place High Value on Communication",
      description: [ "Multilingual. Currently studying Norwegian bokmål at intermediate level." , "I am flexible with time zone communications" ],
      skeleton: <SkeletonTwo />,
      className: `${cardsStandardStyle} col-span-1 lg:col-span-3 row-span-2 h-[20rem] border-2 p-4 h-fit`,
    },
  ];

  return (
    <div className="relative z-20 lg:py-15 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-2 lg:mt-12 rounded-md">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              {feature.description.map((line, index) => (
                <FeatureDescription key={index}>{line}</FeatureDescription>
              ))}
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        `relative overflow-hidden m-4 min-h-fit bg-slate-900`,
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug ml-0">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base lg:text-lg  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left mx-0 my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonTwo = () => {
  const flagContainerStyle = "flex gap-4 items-center my-2";
  const flagStyle =
    "w-12 h-12 sm:min-w-8 sm:min-h-8  sm:min-w-[30%] lg:min-w-fit";
  const flagTextStyle =
    "text-xl sm:text-sm lg:text-xl text-white-200 font-bold text-right lg:text-left sm:min-w-[70%]";
  return (
    <div>
      <div className="p-3">
        <div className={flagContainerStyle}>
          <Us className={flagStyle} />
          <span className={flagTextStyle}>English - Fluent</span>
        </div>
        <div className={flagContainerStyle}>
          <Es className={flagStyle} />
          <span className={flagTextStyle}>Español - Fluent/Native</span>
        </div>
        <div className={flagContainerStyle}>
          <No className={flagStyle} />
          <span className={flagTextStyle}>Norsk Bokmål - Intermediate</span>
        </div>
      </div>
    </div>
  );
};

