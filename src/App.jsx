import React, { useState } from "react";
import { currentUserId, dummyChats, dummyMessages } from "./data";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState(dummyChats[0].id);
  const [messageText, setMessageText] = useState("");
  const [allMessages, setAllMessages] = useState(dummyMessages);
  const currentMessages = allMessages[selectedId];

  const handleSend = () => {
    if (messageText.trim() === "") return;

    const newMessage = {
      id: crypto.randomUUID(),
      content: messageText,
      sender: { id: currentUserId, name: "You" },
      timestamp: new Date(),
      isRead: false,
    };
    const updateAllMessages = {
      ...allMessages,
      [selectedId]: [...allMessages[selectedId], newMessage],
    };
    setAllMessages(updateAllMessages);
    setMessageText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleDeleteMessage = (messageId) => {
    const updateAllMessages = {
      ...allMessages,
      [selectedId]: allMessages[selectedId].filter(
        (message) => message.id !== messageId,
      ),
    };
    setAllMessages(updateAllMessages);
  };

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
            return (
              <p
                key={message.id}
                style={{
                  textAlign:
                    message.sender.id === currentUserId ? "right" : "left",
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.content}
                {message.sender.id === currentUserId && (
                  <button
                    onClick={() => {
                      if (confirm("削除しますか？")) {
                        handleDeleteMessage(message.id);
                      }
                    }}
                  >
                    削除
                  </button>
                )}
              </p>
            );
          })}
        </div>
        <textarea
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button onClick={handleSend}>送信</button>
      </main>
    </div>
  );
}

export default App;
