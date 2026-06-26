import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import MagicButton from "../buttons/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";
import HexGrid from "./HexGrid";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <HexGrid />
      <div className={styles.inner}>
        <Image
          className={styles.headshot}
          src="/nico-headshot.png"
          alt="headshot of Nico"
          width={500}
          height={500}
        />
        <div className={styles.content}>
          <TextGenerateEffect
            className={styles.nameSize}
            words="NICO RITHNER"
          />
          <p className={styles.subtitle}>
            <span className={styles.brand}>Fullstack</span> Software Developer
          </p>
          <div className={styles.cta}>
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
