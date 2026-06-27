import { ReactNode } from "react";
import {
  AmazonwebservicesPlainWordmark,
  Css3Plain,
  Html5Plain,
  JavaOriginal,
  JavascriptOriginal,
  NextjsOriginal,
  PostgresqlPlain,
  RailsPlain,
  ReactOriginal,
  RubyPlain,
  SassOriginal,
  SpringOriginal,
  TypescriptPlain,
} from "devicons-react";
import { FaDatabase } from "react-icons/fa";
import MarqueeTile from "./MarqueeTile";
import styles from "./SkillsMarquee.module.scss";

const ICON_SIZE = "2rem";

const skills: { name: string; icon: ReactNode }[] = [
  { name: "HTML", icon: <Html5Plain size={ICON_SIZE} /> },
  { name: "SASS", icon: <SassOriginal size={ICON_SIZE} /> },
  { name: "Spring Boot", icon: <SpringOriginal size={ICON_SIZE} /> },
  { name: "Ruby on Rails", icon: <RailsPlain size={ICON_SIZE} /> },
  { name: "SQL", icon: <FaDatabase size={ICON_SIZE} /> },
  { name: "PostgreSQL", icon: <PostgresqlPlain size={ICON_SIZE} /> },
  { name: "JavaScript", icon: <JavascriptOriginal size={ICON_SIZE} /> },
  { name: "TypeScript", icon: <TypescriptPlain size={ICON_SIZE} /> },
  { name: "React", icon: <ReactOriginal size={ICON_SIZE} /> },
  { name: "Next.js", icon: <NextjsOriginal size={ICON_SIZE} /> },
  { name: "CSS", icon: <Css3Plain size={ICON_SIZE} /> },
  { name: "Java", icon: <JavaOriginal size={ICON_SIZE} /> },
  { name: "Ruby", icon: <RubyPlain size={ICON_SIZE} /> },
  {
    name: "AWS",
    icon: <AmazonwebservicesPlainWordmark size={ICON_SIZE} color="#FFFFFF" />,
  },
];

export default function SkillsMarquee() {
  return (
    <div className={styles.banner} data-testid="skills-marquee">
      <span className={styles.label}>Additional Skills</span>
      <div className={styles.viewport}>
        <div className={styles.track} data-testid="skills-marquee-track">
          {[...skills, ...skills, ...skills].map(({ name, icon }, index) => (
            <MarqueeTile key={`${name}-${index}`} name={name} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
