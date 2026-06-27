import React from "react";
import styles from "./MagicButton.module.scss";

type MagicButtonProps = {
  title: string;
  icon: React.ReactNode;
  position: string;
  href?: string;
};

const MagicButton = ({ title, icon, position, href }: MagicButtonProps) => {
  const content = (
    <>
      {position === "left" && icon}
      {title}
      {position === "right" && icon}
    </>
  );

  if (href) {
    return (
      <a href={href} className={styles.button}>
        {content}
      </a>
    );
  }

  return <button className={styles.button}>{content}</button>;
};

export default MagicButton;
