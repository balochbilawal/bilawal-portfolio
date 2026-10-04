import { useNavigate } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero reveal" id="home">
      <div className="hero-content">
        <h1>Hi, I'm Bilawal Ali</h1>

        <h3>Full Stack Developer & AI Enthusiast</h3>

        <p>Building modern, scalable, and intelligent web applications.</p>

        <div className="hero-btns">
          <button onClick={() => navigate("/projects")}>View Projects</button>

          <button className="outline" onClick={() => navigate("/contact")}>
            Contact Me
          </button>

          <a
            href="/Bilawal-CV.pdf"
            download="Bilawal-CV.pdf"
            className="cv-btn"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
