import "./About.css";
import profile from "../assets/profile.jpg (2).png";

export default function About() {
  return (
    <section className="about reveal delay-1" id="about">
      <div className="about-container">
        <img src={profile} alt="Bilawal Baloch" />

        <div className="about-content">
          <h2>About Me</h2>

          <p>
            I am a Computer Science student and passionate Full Stack Developer
            with a strong interest in Artificial Intelligence. I love building
            clean, responsive, and user-focused web applications.
          </p>

          <p>
            Currently working on AI-based Final Year Projects and modern React
            applications.
          </p>
        </div>
      </div>
    </section>
  );
}
