import { FiGithub, FiLinkedin } from "react-icons/fi";
import styles from "./Footer.module.scss";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/nicorithner",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nicorithner",
    icon: FiLinkedin,
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.inner}>
        <a href="#" className={styles.logo} aria-label="Back to top">
          N<span className={styles.logoAccent}>R</span>
        </a>

        <ul className={styles.social} role="list">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon className={styles.socialIcon} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.copy}>
        &copy; {new Date().getFullYear()} Nico Rithner. All rights reserved.
      </p>
    </footer>
  );
}
