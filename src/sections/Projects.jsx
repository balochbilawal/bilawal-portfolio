import "./Projects.css";

const projects = [
  {
    title: "AI Career Recommendation System",
    tech: "React • ML • Python",
    description:
      "An AI-powered system that analyzes user information and provides personalized career recommendations.",
    features: [
      "AI-based career recommendations",
      "Machine learning integration",
      "Personalized results",
      "Responsive React interface",
    ],
  },

  {
    title: "LawEase – AI Legal Assistant",
    tech: "React • Flask • Python • RAG • LLaMA • FAISS",

    description:
      "LawEase is an AI-based legal guidance platform designed to help users understand Pakistani legal information through simplified English and Urdu responses.",

    problem:
      "Legal information can be difficult for ordinary users to find, understand, and interpret. LawEase focuses on making relevant legal information easier to access through an AI-powered interface.",

    solution:
      "The system uses Retrieval-Augmented Generation (RAG) to retrieve relevant information from a legal knowledge base and provide context-aware responses through an AI assistant.",

    features: [
      "AI-powered legal assistant",
      "Retrieval-Augmented Generation (RAG)",
      "Pakistani law PDF processing",
      "OCR-based document scanning",
      "English and Urdu support",
      "Semantic search using FAISS",
      "Document text extraction",
      "AI responses using LLaMA/Groq",
    ],

    architecture: [
      "Legal PDF Documents",
      "Text Extraction & OCR",
      "Document Chunking",
      "Sentence Embeddings",
      "FAISS Vector Search",
      "Relevant Context Retrieval",
      "LLaMA/Groq AI Response",
    ],

    technologies: [
      "React.js",
      "Python",
      "Flask",
      "LLaMA",
      "Groq",
      "FAISS",
      "SentenceTransformers",
      "PyMuPDF",
      "OCR",
    ],

    role: "Developed the React frontend, integrated the AI/RAG workflow, worked on document processing and semantic retrieval, and connected the frontend with the AI backend.",
  },

  {
    title: "Smart Wholesale Marketplace",
    tech: "MERN Stack",
    description:
      "A digital marketplace designed to connect wholesalers and buyers through a modern full-stack platform.",
    features: [
      "Product marketplace",
      "User authentication",
      "Product management",
      "MongoDB database",
      "Responsive interface",
    ],
  },
];

export default function Projects() {
  return (
    <section className="projects reveal delay-2" id="projects">
      <div className="projects-container">
        {/* SECTION HEADER */}

        <h2>My Projects</h2>

        <p className="projects-subtitle">
          Some of the projects I have built using modern web development,
          artificial intelligence, and full-stack technologies.
        </p>

        {/* PROJECT CARDS */}

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              className="project-card"
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
              key={project.title}
            >
              <div className="project-number">0{index + 1}</div>

              <h3>{project.title}</h3>

              <p className="project-tech">{project.tech}</p>

              <p className="project-description">{project.description}</p>

              <div className="project-actions">
                <a href={`#case-study-${index}`} className="case-study-btn">
                  View Case Study →
                </a>

                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CASE STUDIES */}

        <div className="case-studies">
          {projects.map((project, index) => (
            <article
              className="case-study"
              id={`case-study-${index}`}
              key={project.title}
            >
              {/* HEADER */}

              <div className="case-study-header">
                <span>CASE STUDY 0{index + 1}</span>

                <h3>{project.title}</h3>
              </div>

              {/* DESCRIPTION */}

              <p className="case-study-description">{project.description}</p>

              {/* LAW EASE DETAILS */}

              {project.problem && (
                <div className="case-study-section">
                  <h4>01. Problem</h4>

                  <p>{project.problem}</p>
                </div>
              )}

              {project.solution && (
                <div className="case-study-section">
                  <h4>02. Solution</h4>

                  <p>{project.solution}</p>
                </div>
              )}

              {/* ARCHITECTURE */}

              {project.architecture && (
                <div className="case-study-section">
                  <h4>03. AI / RAG Architecture</h4>
                  <div className="architecture-flow">
                    {project.architecture.map((step, stepIndex) => (
                      <div className="architecture-item" key={step}>
                        <div className="architecture-step">
                          <span>{stepIndex + 1}</span>
                          <p>{step}</p>
                        </div>

                        {stepIndex < project.architecture.length - 1 && (
                          <div className="architecture-arrow">↓</div>
                        )}
                      </div>
                    ))}
                  </div>{" "}
                </div>
              )}

              {/* FEATURES + TECHNOLOGIES */}

              <div className="case-study-content">
                <div>
                  <h4>Key Features</h4>

                  <ul>
                    {project.features?.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Technologies</h4>

                  {project.technologies ? (
                    <div className="technology-list">
                      {project.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                  ) : (
                    <p>{project.tech}</p>
                  )}
                </div>
              </div>

              {/* ROLE */}

              {project.role && (
                <div className="case-study-section">
                  <h4>My Role</h4>

                  <p>{project.role}</p>
                </div>
              )}

              {/* BUTTONS */}

              <div className="case-study-buttons">
                <a href={project.github} target="_blank" rel="noreferrer">
                  View GitHub →
                </a>

                <a href={project.demo} target="_blank" rel="noreferrer">
                  Live Demo →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
