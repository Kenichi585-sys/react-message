import React from "react";
import { currentUserId } from "../data";

export const ChatWindow = ({
  selectedChat,
  messages,
  scrollEndRef,
  onOpenEditModal,
  onOpenDeleteModal,
}) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ヘッダー */}
      <div
        style={{
          padding: "15px 20px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #eee",
          flexShrink: 0,
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.2em", color: "#333" }}>
          {selectedChat?.name}
        </div>
        <div style={{ fontSize: "0.8em", color: "#666" }}>個人チャット</div>
      </div>

      {/* メッセージエリア */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {messages.map((message) => {
          const isMyMessage = message.sender.id === currentUserId;

          return (
            <div
              key={message.id}
              className={`message-wrapper ${isMyMessage ? "my-message" : "other-message"}`}
              style={{
                display: "flex",
                flexDirection: "row", // ★ここを row にしてアイコンとメッセージを横に並べる
                alignItems: "flex-end",
                justifyContent: isMyMessage ? "flex-end" : "flex-start",
                marginBottom: "20px",
              }}
            >
              {/* 相手のアイコン */}
              {!isMyMessage && (
                <img
                  src={message.sender.avatar}
                  alt=""
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMyMessage ? "flex-end" : "flex-start",
                  maxWidth: "70%",
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
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "8px",
                    flexDirection: isMyMessage ? "row-reverse" : "row",
                  }}
                >
                  <div
                    className={`message-bubble ${isMyMessage ? "sent" : "received"}`}
                    style={{ whiteSpace: "pre-wrap", textAlign: "left" }}
                  >
                    {message.content}
                  </div>

                  <span
                    style={{
                      fontSize: "0.7em",
                      color: "#999",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
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
                      onClick={() => onOpenDeleteModal(message.id)}
                    >
                      削除
                    </button>
                  </div>
                )}
              </div>

              {/* 自分のアイコン */}
              {isMyMessage && (
                <img
                  src={message.sender.avatar}
                  alt=""
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginLeft: "10px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          );
        })}
        <div ref={scrollEndRef} />
      </div>
    </div>
  );
};
