import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! 👋 I'm Bilawal's AI Assistant. Ask me anything about his skills, projects, or experience.",
    },
  ]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userText = message.trim();

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      // Convert frontend messages into AI format
      const chatMessages = [
        ...messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
        {
          role: "user",
          content: userText,
        },
      ];

      const response = await fetch(
        "https://bilawal-portfolio-production.up.railway.app/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            messages: chatMessages,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Something went wrong");
      }

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry 😔 I couldn't connect to the AI server. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-profile">
              <div className="bot-avatar">🤖</div>

              <div>
                <h3>Bilawal AI</h3>

                <span>
                  <i></i>
                  {loading ? "Thinking..." : "Online"}
                </span>
              </div>
            </div>

            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="message-avatar">🤖</div>
                )}

                <div className="message-text">{msg.text}</div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="message bot-message">
                <div className="message-avatar">🤖</div>

                <div className="message-text typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask me something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />

            <button onClick={handleSend} disabled={loading || !message.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        className={`chatbot-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
      >
        {isOpen ? "×" : "🤖"}
      </button>
    </>
  );
};

export default Chatbot;
