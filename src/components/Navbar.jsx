import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const navigate = useNavigate();
  const location = useLocation();

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Scroll to section (About)
  const goToAbout = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById("about")?.scrollIntoView({
        behavior: "smooth",
      });
    }
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>
        Bilawal.dev
      </h2>

      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={goToAbout}>About</li>
        <li onClick={() => navigate("/projects")}>Projects</li>
        <li onClick={() => navigate("/contact")}>Contact</li>
      </ul>

      {/* 🌙 Theme Toggle */}
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "dark" ? "🌙" : "☀️"}
      </button>

      <div
        className={`menu-icon ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
