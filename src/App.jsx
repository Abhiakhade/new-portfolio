import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/Customcursor";
import About from "./components/About";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import BigName from "./components/BigName";
import CountLoader from "./components/Loader";

function App() {
  return (
    <div className="relative isolate min-h-screen w-full min-w-0 overflow-x-clip bg-[#120E06] text-[#FFF7E3]">
      {/* Navigation */}
      <Navbar />
      <CountLoader />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Main content */}
      <main className="relative min-w-0 w-full">
        <Hero />

        <About />

        <Work />

        <Skills />

        <Projects />

        <Experience />

        <Education />

        <Contact />

        <BigName />
      </main>
    </div>
  );
}

export default App;
