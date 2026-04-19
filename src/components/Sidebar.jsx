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
      <h3 style={{ padding: "15px", margin: 0 }}>チャット一覧</h3>
      {chats.map((chat) => {
        const messages = allMessages[chat.id] || [];
        const lastMessage =
          messages.length > 0 ? messages[messages.length - 1] : null;
        const avatarUrl = chat.participants[0]?.avatar;

        return (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            style={{
              padding: "15px",
              borderBottom: "1px solid #ccc",
              cursor: "pointer",
              backgroundColor: selectedId === chat.id ? "#f0f0f0" : "white",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={avatarUrl}
              alt={chat.name}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                objectFit: "cover",
                backgroundColor: "#eee",
              }}
            />

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{chat.name}</span>
                {lastMessage && (
                  <span
                    style={{
                      fontSize: "0.75em",
                      color: "#999",
                      fontWeight: "normal",
                    }}
                  >
                    {new Date(lastMessage.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>

              {lastMessage ? (
                <div
                  style={{
                    fontSize: "0.85em",
                    color: "#666",
                    marginTop: "4px",
                  }}
                >
                  {lastMessage.content.substring(0, 15)}
                  {lastMessage.content.length > 15 ? "..." : ""}
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "0.85em",
                    color: "#ccc",
                    marginTop: "4px",
                  }}
                >
                  まだメッセージはありません
                </div>
              )}
            </div>
          </div>
        );
      })}
    </aside>
  );
};
