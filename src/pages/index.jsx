import Hero      from "../components/sections/Hero.jsx";
import WhatIDo   from "../components/sections/WhatIDo.jsx";
import Skills    from "../components/sections/Skills.jsx";
import Education from "../components/sections/Education.jsx";
import Projects  from "../components/sections/Projects.jsx";
import Contact   from "../components/sections/Contact.jsx";

export function HomePage() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <WhatIDo />
        <Skills />
        <Education />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}