import About from "../components/about/About";
import Hero from "../components/hero/Hero";
import TechStackCard from "../components/techStack/TechStack";
import WorkExperience from "../components/workExperience/WorkExperience";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Hero />
        <About />
        <TechStackCard />
        <WorkExperience />
      </div>
    </main>
  );
}
