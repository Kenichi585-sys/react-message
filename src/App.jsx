import React from "react";
import { dummyChats } from "./data";
import { useChat } from "./hooks/useChat";
import {
  Sidebar,
  MessageInput,
  ChatWindow,
  EditModal,
  DeleteModal,
} from "./components/";
import "./App.css";

export const App = () => {
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
    handleOpenEditModal,
    handleEditSave,
    handleEditCancel,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useChat();

  const selectedChat = dummyChats.find((chat) => chat.id === selectedId);

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
          selectedChat={selectedChat}
          messages={currentMessages}
          scrollEndRef={scrollEndRef}
          onOpenEditModal={handleOpenEditModal}
          onOpenDeleteModal={handleOpenDeleteModal}
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
      {isDeleteModalOpen && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};
