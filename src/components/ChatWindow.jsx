import React from "react";
import { currentUserId } from "../data";

export const ChatWindow = ({
  messages,
  scrollEndRef,
  onOpenEditModal,
  onDeleteMessage,
}) => {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
      {messages.map((message) => {
        const isMyMessage = message.sender.id === currentUserId;

        return (
          <div
            key={message.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isMyMessage ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            {!isMyMessage && (
              <div
                style={{
                  fontSize: "0.8em",
                  color: "#666",
                  marginBottom: "4px",
                  marginLeft: "4px",
                }}
              >
                {message.sender.name}
              </div>
            )}
            <div
              className={`message-bubble ${isMyMessage ? "sent" : "received"}`}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {message.content}
            </div>
            <div style={{ fontSize: "0.7em", color: "#999", marginTop: "4px" }}>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            {isMyMessage && (
              <div style={{ marginTop: "5px" }}>
                <button
                  className="action-link"
                  onClick={() => onOpenEditModal(message)}
                >
                  編集
                </button>
                <button
                  className="action-link"
                  onClick={() => {
                    if (confirm("削除しますか？")) {
                      onDeleteMessage(message.id);
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
  );
};
