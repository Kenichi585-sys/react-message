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
              textAlign: isMyMessage ? "right" : "left",
              whiteSpace: "pre-wrap",
              marginBottom: "10px",
            }}
          >
            <div style={{ fontSize: "1em" }}>{message.content}</div>
            <div style={{ fontSize: "0.7em", color: "#999", marginTop: "4px" }}>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            {isMyMessage && (
              <div style={{ marginTop: "5px" }}>
                <button onClick={() => onOpenEditModal(message)}>編集</button>
                <button
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
