import { useEffect, useRef, useState } from "react";
import { currentUserId, dummyChats, dummyMessages } from "../data";

export function useChat() {
  const [selectedId, setSelectedId] = useState(dummyChats[0].id);
  const [drafts, setDrafts] = useState({});
  const [allMessages, setAllMessages] = useState(dummyMessages);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const scrollEndRef = useRef(null);

  const currentMessages = allMessages[selectedId] || [];

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView();
  }, [currentMessages]);

  const handleSend = () => {
    const currentDraft = drafts[selectedId] || "";
    if (currentDraft.trim() === "") return;

    if (editingId) {
      const updatedMessagesForPerson = allMessages[selectedId].map((message) => {
        if (message.id === editingId) {
          return { ...message, content: currentDraft };
        }
        return message;
      });
      setAllMessages({ ...allMessages, [selectedId]: updatedMessagesForPerson });
      setEditingId(null);
    } else {
      const newMessage = {
        id: crypto.randomUUID(),
        content: currentDraft,
        sender: { id: currentUserId, name: "You" },
        timestamp: new Date(),
        isRead: false,
      };
      setAllMessages({
        ...allMessages,
        [selectedId]: [...allMessages[selectedId], newMessage],
      });
    }
    setDrafts({ ...drafts, [selectedId]: "" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDeleteMessage = (messageId) => {
    setAllMessages({
      ...allMessages,
      [selectedId]: allMessages[selectedId].filter((message) => message.id !== messageId),
    });
  };

  const handleOpenEditModal = (message) => {
    setEditText(message.content);
    setEditingId(message.id);
    setIsModalOpen(true);
  };

  const handleEditSave = () => {
    if (editText.trim() === "") return;

    const updatedMessageForPerson = allMessages[selectedId].map((message) => {
      if (message.id === editingId) {
        return { ...message, content: editText };
      }
      return message;
    });

    setAllMessages({ ...allMessages, [selectedId]: updatedMessageForPerson });
    setIsModalOpen(false);
    setEditingId(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setEditText("");
  };

  const currentDraft = drafts[selectedId] || "";

  const setCurrentDraft = (value) => {
    setDrafts({ ...drafts, [selectedId]: value });
  };

  return {
    selectedId,
    setSelectedId,
    allMessages,
    currentMessages,
    currentDraft,
    setCurrentDraft,
    editText,
    setEditText,
    editingId,
    isModalOpen,
    scrollEndRef,
    handleSend,
    handleKeyDown,
    handleDeleteMessage,
    handleOpenEditModal,
    handleEditSave,
    handleEditCancel,
  };
}
