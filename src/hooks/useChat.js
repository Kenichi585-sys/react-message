import { useEffect, useRef, useState } from "react";
import { currentUserId, dummyChats, dummyMessages } from "../data";
import { handleEnterSubmit } from "../utils/keyboard";

export const useChat = () => {
  const [selectedId, setSelectedId] = useState(dummyChats[0].id);
  const [drafts, setDrafts] = useState({});
  const [allMessages, setAllMessages] = useState(dummyMessages);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const scrollEndRef = useRef(null);
  const currentMessages = allMessages[selectedId] || [];
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageIdToDelete, setMessageIdToDelete] = useState(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView();
  }, [currentMessages]);

  const handleSend = () => {
    const currentDraft = drafts[selectedId] || "";
    if (currentDraft.trim() === "") return;

    const newMessage = {
      id: crypto.randomUUID(),
      content: currentDraft.trim(),
      sender: { id: currentUserId, name: "You" },
      timestamp: new Date(),
      isRead: false,
    };
    setAllMessages({
      ...allMessages,
      [selectedId]: [...allMessages[selectedId], newMessage],
    });
    setDrafts({ ...drafts, [selectedId]: "" });
  };

  const handleKeyDown = (e) => {
    handleEnterSubmit(e, handleSend);
  };

  const handleDeleteMessage = (messageId) => {
    setAllMessages({
      ...allMessages,
      [selectedId]: allMessages[selectedId].filter(
        (message) => message.id !== messageId,
      ),
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
        return { ...message, content: editText.trim() };
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

  const handleOpenDeleteModal = (messageId) => {
    console.log("handleOpenDeleteModal", messageId);
    setMessageIdToDelete(messageId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (messageIdToDelete) {
      handleDeleteMessage(messageIdToDelete);
      handleDeleteCancel();
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setMessageIdToDelete(null);
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
    isModalOpen,
    scrollEndRef,
    handleSend,
    handleKeyDown,
    handleDeleteMessage,
    handleOpenEditModal,
    handleEditSave,
    handleEditCancel,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};
