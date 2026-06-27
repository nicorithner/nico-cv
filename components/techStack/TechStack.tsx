import { ReactNode } from "react";
import {
  AmazonwebservicesPlainWordmark,
  Css3Plain,
  JavaOriginal,
  JavascriptOriginal,
  NextjsOriginal,
  ReactOriginal,
  RubyPlain,
  TypescriptPlain,
} from "devicons-react";
import SkillsMarquee from "./SkillsMarquee";
import StatTile from "./StatTile";
import TechTile from "./TechTile";
import styles from "./TechStack.module.scss";

const ICON_SIZE = "4rem";

const stack: { name: string; icon: ReactNode }[] = [
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

// 2021 is when professional software development experience started (Altvia Solutions).
const CAREER_START_YEAR = 2021;

export default function TechStackCard() {
  const yearsExperience = new Date().getFullYear() - CAREER_START_YEAR;

  return (
    <section id="skills" data-testid="skills-section">
      <div className={styles.grid}>
        <div className={styles.row}>
          {stack.map(({ name, icon }) => (
            <TechTile key={name} name={name} icon={icon} />
          ))}
        </div>
        <StatTile value={yearsExperience} label="Years of Professional Experience" />
      </div>
      <SkillsMarquee />
    </section>
  );
}
