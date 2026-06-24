import React from "react";

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button
      className={`inline-flex h-12 w-full md:w-60 cursor-pointer items-center justify-center gap-2 rounded-lg
           bg-primary px-7 text-base sm:text-xs lg:text-lg font-medium text-primary-foreground focus:outline-none ${otherClasses}`}
      onClick={handleClick}
    >
      {position === "left" && icon}
      {title}
      {position === "right" && icon}
    </button>
  );
};

export default MagicButton;
