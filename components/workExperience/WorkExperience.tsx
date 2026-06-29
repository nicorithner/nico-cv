import { workExperience, education } from "../../data";
import ResumeLink from "./ResumeLink";
import styles from "./WorkExperience.module.scss";

export default function WorkExperience() {
  return (
    <section id="experience" className={styles.section} data-testid="experience-section">
      <h2 className={styles.heading}>
        My <span className={styles.accent}>Experience</span>
      </h2>

      <div className={styles.timeline}>
        {workExperience.map((job) => (
          <article key={job.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.company}>{job.company}</span>
              <div className={styles.titleRow}>
                <span className={styles.role}>{job.title}</span>
                {job.partTime && (
                  <span className={styles.badge}>Part-time</span>
                )}
              </div>
              <span className={styles.meta}>
                {job.location}&nbsp;&middot;&nbsp;{job.years[0]}–{job.years[1]}
              </span>
            </div>

            <div className={styles.divider} />

            <div className={styles.tags}>
              {job.stack.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>

            <ul className={styles.desc}>
              {job.desc.map((item, i) => (
                <li key={i} className={styles.descItem}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className={styles.subheading}>Education</p>

      <div className={styles.timeline}>
        {education.map((entry) => (
          <article key={entry.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.company}>{entry.company}</span>
              <div className={styles.titleRow}>
                <span className={styles.role}>{entry.title}</span>
              </div>
              <span className={styles.meta}>
                {entry.location}&nbsp;&middot;&nbsp;{entry.years[0]}–{entry.years[1]}
              </span>
            </div>

            <div className={styles.divider} />

            <div className={styles.tags}>
              {entry.stack.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>

            <ul className={styles.desc}>
              {entry.desc.map((item, i) => (
                <li key={i} className={styles.descItem}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div id="resume" className={styles.resumeSection} data-testid="resume-cta">
        <h3 className={styles.resumeHeading}>
          Get My <span className={styles.accent}>Resume</span>
        </h3>
        <div className={styles.resumeLinks}>
          <ResumeLink
            title="Nico Rithner's Resume"
            url="https://drive.google.com/file/d/1iPixGsLv2gI243FcHbFkPHR6r6_6wzhq/view?usp=sharing"
          />
        </div>
      </div>
    </section>
  );
}
