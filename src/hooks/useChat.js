import { useEffect, useRef, useState } from "react";
import { currentUserId, dummyChats, dummyMessages, dummyUsers } from "../data";
import { handleEnterSubmit } from "../utils/keyboard";

export const useChat = () => {
  const [selectedId, setSelectedId] = useState(dummyChats[0].id);
  const [drafts, setDrafts] = useState({});
  const [allMessages, setAllMessages] = useState(dummyMessages);
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const scrollEndRef = useRef(null);
  const currentMessages = allMessages[selectedId] || [];
  const currentDraft = drafts[selectedId] || "";
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageIdToDelete, setMessageIdToDelete] = useState(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView();
  }, [currentMessages]);

  const handleSend = () => {
    if (currentDraft.trim() === "") return;

    const currentUser = dummyUsers.find((u) => u.id === currentUserId);

    const newMessage = {
      id: crypto.randomUUID(),
      content: currentDraft.trim(),
      sender: currentUser,
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

  const handleOpenEditModal = (message) => {
    setEditText(message.content);
    setEditingId(message.id);
    setIsEditModalOpen(true);
  };

  const resetEditState = () => {
    setIsEditModalOpen(false);
    setEditingId(null);
    setEditText("");
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
    resetEditState();
  };

  const handleEditCancel = () => {
    resetEditState();
  };

  const setCurrentDraft = (value) => {
    setDrafts({ ...drafts, [selectedId]: value });
  };

  const handleOpenDeleteModal = (messageId) => {
    console.log("handleOpenDeleteModal", messageId);
    setMessageIdToDelete(messageId);
    setIsDeleteModalOpen(true);
  };

  const resetDeleteState = () => {
    setIsDeleteModalOpen(false);
    setMessageIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (messageIdToDelete) {
      setAllMessages({
        ...allMessages,
        [selectedId]: allMessages[selectedId].filter(
          (message) => message.id !== messageIdToDelete,
        ),
      });
      resetDeleteState();
    }
  };

  const handleDeleteCancel = () => {
    resetDeleteState();
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
    isEditModalOpen,
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
  };
};
