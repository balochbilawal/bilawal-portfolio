import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Environment Variables Check
// ===============================

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY is missing from .env");
}

if (!process.env.GMAIL_USER) {
  console.error("❌ GMAIL_USER is missing from .env");
}

if (!process.env.GMAIL_APP_PASSWORD) {
  console.error("❌ GMAIL_APP_PASSWORD is missing from .env");
}

// ===============================
// Groq AI
// ===============================

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ===============================
// Gmail / Nodemailer
// ===============================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "Bilawal Portfolio AI Server is running 🚀",
  });
});

// ===============================
// AI Chatbot
// ===============================

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages are required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: `
You are Bilawal's AI Portfolio Assistant.

Your job is to answer questions about Bilawal, his skills, projects,
education, technologies, and portfolio.

Bilawal Baloch is a Full-Stack Developer and AI Enthusiast.

Frontend:
- React.js
- JavaScript
- HTML
- CSS
- Vite

Backend:
- Node.js
- Express.js
- Flask

Databases:
- MongoDB
- MySQL

AI / ML:
- Python
- RAG
- LLaMA
- Groq
- FAISS
- SentenceTransformers
- OCR
- PyMuPDF

Tools:
- Git
- GitHub
- VS Code
- Postman
- npm

Major Project:
LawEase – AI Legal Assistant.

LawEase is an AI-based legal guidance platform designed to
help users understand Pakistani legal information in simplified
English and Urdu.

LawEase uses:
- RAG
- Pakistani law PDFs
- Document processing
- PDF text extraction
- OCR
- Embeddings
- FAISS vector search
- SentenceTransformers
- LLaMA/Groq
- React
- Flask

Bilawal worked on the React frontend, AI/RAG workflow,
document processing, semantic retrieval, and frontend/backend integration.

Important rules:
- Answer clearly and professionally.
- Keep answers concise unless the user asks for details.
- Do not invent Bilawal's experience, education, certifications,
  companies, achievements, or technologies.
- If information is not available, say that it is not currently
  listed in the portfolio.
- You are an AI portfolio assistant, not Bilawal himself.
          `,
        },

        ...messages,
      ],

      temperature: 0.5,
      max_completion_tokens: 500,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    res.json({
      reply,
    });
  } catch (error) {
    console.error("========== GROQ ERROR ==========");
    console.error("Message:", error.message);
    console.error("Status:", error.status);
    console.error("Error:", error.error);
    console.error("================================");

    res.status(500).json({
      error: "AI service failed",
      details: error.message,
      status: error.status || 500,
    });
  }
});

// ===============================
// Contact Form
// ===============================

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,

      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    console.log(`✅ Contact message received from ${email}`);

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("========== CONTACT ERROR ==========");
    console.error("Message:", error.message);
    console.error("===================================");

    res.status(500).json({
      error: "Failed to send message",
      details: error.message,
    });
  }
});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("");
  console.log("🤖 Bilawal AI Server Started");
  console.log(`🚀 http://localhost:${PORT}`);
  console.log("🔐 Environment variables loaded");
  console.log("");
});
