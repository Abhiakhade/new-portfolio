import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/Customcursor";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Work from "./components/Work";
import BigName from "./components/BigName";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <CustomCursor />
      <main>
        <Navbar />
        <Hero />
        <About />
        <Work />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        {/* <Gallery /> */}
        <Contact />
        <BigName />
      </main>
    </>
  );
}

export default App;
