import React from "react";

function MessageInput({ value, onChange, onKeyDown, onSend }) {
  return (
    <div style={{ padding: "10px", borderTop: "1px solid #ccc" }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSend}>送信</button>
    </div>
  );
}

export default MessageInput;
