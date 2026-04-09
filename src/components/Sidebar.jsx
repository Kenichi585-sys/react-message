import React from "react";

export const Sidebar = ({ chats, allMessages, selectedId, onSelectChat }) => {
  return (
    <aside
      style={{
        width: "300px",
        borderRight: "1px solid #ccc",
        overflowY: "auto",
      }}
    >
      <h3>チャット一覧</h3>
      {chats.map((chat) => {
        const messages = allMessages[chat.id] || [];
        const lastMessage =
          messages.length > 0 ? messages[messages.length - 1] : null;

        return (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
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
  );
};
