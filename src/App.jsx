import React, { useState } from "react";
import "./App.css";
import gptlogo from "./assets/chatgpt.svg";
import addbtn from "./assets/add-30.png";
import msgicon from "./assets/message.svg";
import home from "./assets/home.svg";
import bookmark from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import send from "./assets/send.svg";
import usericon from "./assets/user-icon.png";
import gptimg from "./assets/chatgpt.svg";
import query from "./huggingFaceService";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage = { type: "user", text: input };
    setMessages([...messages, newMessage]);

    const response = await query(input);
    if (response && response.length > 0) {
      const botMessage = { type: "bot", text: response[0].generated_text };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }

    setInput("");
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="uppersidetop">
            <img src={gptlogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="middlebutton">
            <img src={addbtn} alt="new chat" className="addbutton" />
            New Chat
          </button>
          
        </div>
        
        <div className="lowerside">
          <div className="listitems">
            <img src={home} alt="home" className="listitemsimg" />
            Home
          </div>
          <div className="listitems">
            <img src={bookmark} alt="saved" className="listitemsimg" />
            Saved
          </div>
          <div className="listitems">
            <img src={rocket} alt="upgrade" className="listitemsimg" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="mainpart">
        <div className="chats">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${msg.type === "bot" ? "bot" : ""}`}
            >
              <img
                className="chatimage"
                src={msg.type === "bot" ? gptimg : usericon}
                alt={msg.type}
              />
              <p className="txt">{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={send} alt="send" className="src" />
            </button>

          </div> 
        </div>
        <p>ChatGPT can produce inaccurate information</p>
        
      </div>
      
    </div>
  );
}

export default App;