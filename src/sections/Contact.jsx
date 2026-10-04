import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="contact reveal delay-3" id="contact">
      <div className="contact-container">
        <h2>Contact Me</h2>

        <p className="contact-subtitle">
          Have a project idea or want to work together? Send me a message.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* NAME */}

          <div className="field">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              required
            />

            <label>Name</label>
          </div>

          {/* EMAIL */}

          <div className="field">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />

            <label>Email</label>
          </div>

          {/* MESSAGE */}

          <div className="field">
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder=" "
              required
            ></textarea>

            <label>Message</label>
          </div>

          {/* SUBMIT BUTTON */}

          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {/* SUCCESS MESSAGE */}

          {status === "success" && (
            <p className="form-success">✓ Message sent successfully!</p>
          )}

          {/* ERROR MESSAGE */}

          {status === "error" && (
            <p className="form-error">
              ✕ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
