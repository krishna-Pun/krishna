import { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messageDb, setMessageDb] = useState([]);

  const socket = io("http://localhost:8000");

  // socket.emit("public_channel", { message: "random message" });

  useEffect(() => {
    socket.on("public_channel", (data) => {
      setMessageDb((messageDb) => [...messageDb, data.text]);
      console.log(data);
    });
  }, []);

  function sendMessage() {
    socket.emit("public_channel", { text: message });
  }

  return (
    <div className="App"
    style={{
      marginLeft: "auto",
      marginRight: "auto",
      padding: "80px",
      width: "400px",
      backgroundColor: "whiteSmoke",
      border: "3px solid blue",
      height: "100vh",
    }}
    >
      <h1> Chat Room</h1>
      {/* display message */}
      <div style = {{display: "flex", flexDirection: "coloumn"}} >

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sendMessage()}>Send</button>
      
      <div className="flex flex-col gap-y-8">
        {messageDb.map((item, index) => (
          <div key={index} className="rounded-lg w-fit p-2 bg-blue-600">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;