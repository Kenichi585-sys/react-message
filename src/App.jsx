import React from "react";
import { dummyChats } from "./data";
import { useChat } from "./hooks/useChat";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import EditModal from "./components/EditModal";
import "./App.css";

function App() {
  const {
    selectedId,
    setSelectedId,
    allMessages,
    currentMessages,
    currentDraft,
    setCurrentDraft,
    editText,
    setEditText,
    isModalOpen,
    scrollEndRef,
    handleSend,
    handleKeyDown,
    handleDeleteMessage,
    handleOpenEditModal,
    handleEditSave,
    handleEditCancel,
  } = useChat();

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        chats={dummyChats}
        allMessages={allMessages}
        selectedId={selectedId}
        onSelectChat={setSelectedId}
      />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatWindow
          messages={currentMessages}
          scrollEndRef={scrollEndRef}
          onOpenEditModal={handleOpenEditModal}
          onDeleteMessage={handleDeleteMessage}
        />
        <MessageInput
          value={currentDraft}
          onChange={setCurrentDraft}
          onKeyDown={handleKeyDown}
          onSend={handleSend}
        />
      </main>
      {isModalOpen && (
        <EditModal
          editText={editText}
          onChangeEditText={setEditText}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
}

export default App;
