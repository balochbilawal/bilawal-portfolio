import "./Skills.css";

const skills = [
  "React",
  "JavaScript",
  "Node.js",
  "MySQL",
  "AI / ML",
  "Git",
  "REST APIs",
  "Tailwind CSS",
];

export default function Skills() {
  return (
    <section className="skills reveal delay-2" id="skills">
      <h2>Skills</h2>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div
            className="skill-card"
            style={{ animationDelay: `${index * 0.1}s` }}
            key={skill}
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
