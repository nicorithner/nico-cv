import About from "../components/about/About";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import TechStackCard from "../components/techStack/TechStack";
import WorkExperience from "../components/workExperience/WorkExperience";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <Hero />
          <TechStackCard />
          <WorkExperience />
          <About />
        </div>
      </main>
      <Footer />
    </>
  );
}
