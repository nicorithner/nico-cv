import React from "react";
import styles from "./MagicButton.module.scss";

const MagicButton = ({
  title,
  icon,
  position,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
}) => {
  return (
    <button className={styles.button}>
      {position === "left" && icon}
      {title}
      {position === "right" && icon}
    </button>
  );
};

export default MagicButton;
