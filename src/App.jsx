import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import PageTransition from "./transitions/PageTransitions";
import Chatbot from "./components/Chatbot";

function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Chatbot />
    </PageTransition>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects"
            element={
              <PageTransition>
                <ProjectsPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
