import React, { useEffect, useRef } from "react";

export const MessageInput = ({ value, onChange, onKeyDown, onSend }) => {
  const textareaRef = useRef(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scHeight = textarea.scrollHeight;
      textarea.style.height = `${scHeight}px`;

      if (scHeight > 150) {
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.overflowY = "hidden";
      }
    }
  }, [value]);

  return (
    <div className="input-container">
      <textarea
        ref={textareaRef}
        className="chat-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
      />
      <button className="send-button" onClick={onSend} disabled={!value.trim()}>
        送信
      </button>
    </div>
  );
};
