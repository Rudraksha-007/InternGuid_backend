import React, { useState } from "react";
import "../App.css";
import Navbar from "./Navbar";

const SmartAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your Smart Assistant 🤖. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Mock bot reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Got it! (This is a demo response, you can connect me to an API later)" }
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="chat-container">
        <Navbar/>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default SmartAssistant;
