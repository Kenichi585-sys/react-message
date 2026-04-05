import React, { useState } from "react";
import { currentUserId, dummyChats, dummyMessages } from "./data";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState(dummyChats[0].id);
  const [messageText, setMessageText] = useState("");
  const [allMessages, setAllMessages] = useState(dummyMessages);
  const [editingId, setEditingId] = useState(null);
  const currentMessages = allMessages[selectedId];

  const handleSend = () => {
    if (messageText.trim() === "") return;

    if (editingId) {
      const updatedMessagesForPerson = allMessages[selectedId].map(
        (message) => {
          if (message.id === editingId) {
            return {
              ...message,
              content: messageText,
            };
          }
          return message;
        },
      );
      const updateAllMessages = {
        ...allMessages,
        [selectedId]: updatedMessagesForPerson,
      };

      setAllMessages(updateAllMessages);
      setEditingId(null);
    } else {
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
    }
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
        <div>
          {currentMessages.map((message) => {
            const isMyMessage = message.sender.id === currentUserId;

            return (
              <div
                key={message.id}
                style={{
                  textAlign: isMyMessage ? "right" : "left",
                  whiteSpace: "pre-wrap",
                  marginBottom: "10px",
                }}
              >
                <div>{message.content}</div>
                {isMyMessage && (
                  <div style={{ marginTop: "5px" }}>
                    <button
                      onClick={() => {
                        setMessageText(message.content);
                        setEditingId(message.id);
                      }}
                    >
                      編集
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("削除しますか？")) {
                          handleDeleteMessage(message.id);
                        }
                      }}
                    >
                      削除
                    </button>
                  </div>
                )}
              </div>
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
