import React from "react";

export const MessageInput = ({ value, onChange, onKeyDown, onSend }) => {
  return (
    <div style={{ padding: "10px", borderTop: "1px solid #ccc" }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        style={{
          width: "100%",
          height: "80px",
          minHeight: "50px",
          maxHeight: "200px",
          resize: "vertical",
          padding: "8px",
          boxSizing: "border-box",
        }}
      />
      <button onClick={onSend}>送信</button>
    </div>
  );
};
