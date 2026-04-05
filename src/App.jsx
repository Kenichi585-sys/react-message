import React, { useEffect, useRef, useState } from "react";
import { currentUserId, dummyChats, dummyMessages } from "./data";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState(dummyChats[0].id);
  const [drafts, setDrafts] = useState({});
  const [allMessages, setAllMessages] = useState(dummyMessages);
  const [editingId, setEditingId] = useState(null);
  const scrollEndRef = useRef(null);
  const currentMessages = allMessages[selectedId];

  const handleSend = () => {
    const currentDraft = drafts[selectedId] || "";

    if (currentDraft.trim() === "") return;

    if (editingId) {
      const updatedMessagesForPerson = allMessages[selectedId].map(
        (message) => {
          if (message.id === editingId) {
            return {
              ...message,
              content: currentDraft,
            };
          }
          return message;
        },
      );

      setAllMessages({
        ...allMessages,
        [selectedId]: updatedMessagesForPerson,
      });
      setEditingId(null);
    } else {
      const newMessage = {
        id: crypto.randomUUID(),
        content: currentDraft,
        sender: { id: currentUserId, name: "You" },
        timestamp: new Date(),
        isRead: false,
      };
      setAllMessages({
        ...allMessages,
        [selectedId]: [...allMessages[selectedId], newMessage],
      });
    }
    setDrafts({ ...drafts, [selectedId]: "" });
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

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView();
  }, [currentMessages]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <aside
        style={{
          width: "300px",
          borderRight: "1px solid #ccc",
          overflowY: "auto",
        }}
      >
        <h3>チャット一覧</h3>
        {dummyChats.map((chat) => {
          const messages = allMessages[chat.id] || [];

          const lastMessage =
            messages.length > 0 ? messages[messages.length - 1] : null;

          return (
            <div
              key={chat.id}
              onClick={() => setSelectedId(chat.id)}
              style={{
                padding: "15px",
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: selectedId === chat.id ? "#f0f0f0" : "white",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{chat.name}</div>

              {lastMessage ? (
                <div
                  style={{
                    fontSize: "0.85em",
                    color: "#666",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {lastMessage.content.substring(0, 15)}
                    {lastMessage.content.length > 15 ? "..." : ""}
                  </span>
                  <span>
                    {new Date(lastMessage.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ) : (
                <div style={{ fontSize: "0.85em", color: "#ccc" }}>
                  まだメッセージはありません
                </div>
              )}
            </div>
          );
        })}
      </aside>

      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
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
                <div style={{ fontSize: "1em" }}>{message.content}</div>
                <div
                  style={{ fontSize: "0.7em", color: "#999", marginTop: "4px" }}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                {isMyMessage && (
                  <div style={{ marginTop: "5px" }}>
                    <button
                      onClick={() => {
                        setDrafts({ ...drafts, [selectedId]: message.content });
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
          <div ref={scrollEndRef} />
        </div>
        <div style={{ padding: "10px", borderTop: "1px solid #ccc" }}>
          <textarea
            onChange={(e) => {
              setDrafts({ ...drafts, [selectedId]: e.target.value });
            }}
            value={drafts[selectedId] || ""}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button onClick={handleSend}>送信</button>
        </div>
      </main>
    </div>
  );
}
export default App;
