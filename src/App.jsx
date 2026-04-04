import React, { useState } from "react";
import { dummyChats, dummyMessages } from "./data";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState(dummyChats[0].id);
  const currentMessages = dummyMessages[selectedId];
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: "300px", borderRight: "1px solid #ccc" }}>
        <h3>チャット一覧</h3>
        {dummyChats.map((chat) => {
          return (
            <div
              key={chat.id}
              onClick={() => {
                console.log("クリックされたID", chat.id);
                setSelectedId(chat.id);
              }}
            >
              {chat.name}
            </div>
          );
        })}
      </aside>

      <main style={{ flex: 1 }}>
        <h2>選ばれているID：{selectedId}</h2>
        <div>
          {currentMessages.map((message) => {
            return <p key={message.id}>{message.content}</p>;
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
