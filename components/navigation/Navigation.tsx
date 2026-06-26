"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Navigation.module.scss";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
] as const;

export default function Navigation() {
  const [active, setActive] = useState("");
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
          NR
        </a>
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
      </nav>
    </header>
  );
}
