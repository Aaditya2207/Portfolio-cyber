import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Certifications } from "@/components/Certifications";
import { Methodology } from "@/components/Methodology";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Methodology />
      <Contact />
    </main>
  );
}
