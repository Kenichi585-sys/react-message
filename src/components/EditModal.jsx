import React from "react";

function EditModal({ editText, onChangeEditText, onSave, onCancel }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>メッセージを編集</h3>
        <textarea
          style={{
            width: "100%",
            height: "100px",
            marginBottom: "10px",
            padding: "8px",
            boxSizing: "border-box",
          }}
          value={editText}
          onChange={(e) => onChangeEditText(e.target.value)}
        />
        <div style={{ textAlign: "right" }}>
          <button onClick={onCancel}>キャンセル</button>
          <button
            onClick={onSave}
            style={{
              marginLeft: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "5px 15px",
              borderRadius: "4px",
            }}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
