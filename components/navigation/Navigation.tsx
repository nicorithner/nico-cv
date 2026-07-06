"use client";
import { useEffect, useRef, useState } from "react";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import styles from "./Navigation.module.scss";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
] as const;

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
] as const;

export default function Navigation() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    const order = NAV_LINKS.map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.current.add(entry.target.id);
          } else {
            visible.current.delete(entry.target.id);
          }
        });
        const found = order.find((id) => visible.current.has(id));
        setActive(found ? `#${found}` : "");
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Site navigation">
        <a href="#" className={styles.logo} aria-label="Back to top">
          N<span className={styles.logoAccent}>R</span>
        </a>
        <div className={styles.navEnd}>
          <ul className={styles.links} role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.link}${active === href ? ` ${styles.linkActive}` : ""}`}
                  aria-current={active === href ? "true" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
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
          <button
            type="button"
            className={styles.menuToggle}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <ul id="mobile-menu" className={styles.mobileMenu} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`${styles.mobileLink}${active === href ? ` ${styles.linkActive}` : ""}`}
                aria-current={active === href ? "true" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
