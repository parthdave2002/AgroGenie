import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useSocket = (userId, token) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    if (!userId || !token) return;

    // Initialize Socket.IO connection
    const socket = io(API_URL || "http://localhost:8000", {
      auth: {
        userId: userId,
        token: token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Handle connection
    socket.on("connect", () => {
      console.log("Connected to server with socket ID:", socket.id);
      setIsConnected(true);
      socket.emit("get-active-users");
      socket.emit("get-conversations");
      socket.emit("get-all-users");
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    // Handle active users update
    socket.on("active-users-updated", (users) => {
      setActiveUsers(users);
    });

    // Handle active users list
    socket.on("active-users", (users) => {
      setActiveUsers(users);
    });

    // Handle incoming message
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data.message]);
      setLastMessage(data.message);
      socket.emit("get-conversations");
    });

    // Handle message sent
    socket.on("message-sent", (data) => {
      setMessages((prev) => [...prev, data.message]);
      setLastMessage(data.message);
      socket.emit("get-conversations");
    });

    // Handle chat history
    socket.on("chat-history", (data) => {
      setMessages(data.messages);
    });

    // Handle conversations list
    socket.on("conversations", (data) => {
      setConversations(data);
    });

    // Handle all users list
    socket.on("all-users", (users) => {
      setAllUsers(users);
    });

    // Handle typing indicator
    socket.on("user-typing", (data) => {
      if (data.isTyping) {
        setTypingUsers((prev) => new Set(prev).add(data.senderId));
      } else {
        setTypingUsers((prev) => {
          const updated = new Set(prev);
          updated.delete(data.senderId);
          return updated;
        });
      }
    });

    // Handle message deleted
    socket.on("message-deleted", (data) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== data.messageId));
    });

    // Handle message edited
    socket.on("message-edited", (data) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === data.message._id ? data.message : msg))
      );
    });

    // Handle messages marked as read
    socket.on("messages-marked-read", (data) => {
      // Update conversation unread count
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === data.senderId ? { ...conv, unreadCount: 0 } : conv
        )
      );
      socket.emit("get-conversations");
    });

    // Handle notification
    socket.on("new-message-notification", (data) => {
      console.log("New message notification:", data);
    });

    // Handle errors
    socket.on("error", (data) => {
      console.error("Socket error:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, token]);

  // ==================== MESSAGE FUNCTIONS ====================

  const sendMessage = (receiverId, message) => {
    if (!socketRef.current || !isConnected) {
      console.error("Socket not connected");
      return;
    }
    socketRef.current.emit("send-message", {
      receiverId,
      message,
      message_type: "text",
      type : "personal",
    });
  };

  const getChatHistory = (otherUserId, page = 1, limit = 50) => {
    if (!socketRef.current || !isConnected) {
      console.error("Socket not connected");
      return;
    }
    socketRef.current.emit("get-chat-history", {
      otherUserId,
      page,
      limit,
    });
  };

  const deleteMessage = (messageId) => {
    if (!socketRef.current || !isConnected) {
      console.error("Socket not connected");
      return;
    }
    socketRef.current.emit("delete-message", { messageId });
  };

  const editMessage = (messageId, newMessage) => {
    if (!socketRef.current || !isConnected) {
      console.error("Socket not connected");
      return;
    }
    socketRef.current.emit("edit-message", { messageId, newMessage });
  };

  const markAsRead = (senderId) => {
    if (!socketRef.current || !isConnected) {
      console.error("Socket not connected");
      return;
    }
    socketRef.current.emit("mark-as-read", { senderId });
  };

  // ==================== USER FUNCTIONS ====================

  const getActiveUsers = () => {
    if (!socketRef.current || !isConnected) {
      console.error("Socket not connected");
      return;
    }
    socketRef.current.emit("get-active-users");
  };

  const getAllUsers = () => {
    if (!socketRef.current || !isConnected) {
      console.error("Socket not connected");
      return;
    }
    socketRef.current.emit("get-all-users");
  };

  // ==================== CONVERSATION FUNCTIONS ====================

  const getConversations = () => {
    if (!socketRef.current || !isConnected) {
      console.error("Socket not connected");
      return;
    }
    socketRef.current.emit("get-conversations");
  };

  // ==================== TYPING INDICATOR ====================

  const sendTypingIndicator = (receiverId, isTyping = true) => {
    if (!socketRef.current || !isConnected) {
      console.error("Socket not connected");
      return;
    }
    socketRef.current.emit("typing", { receiverId, isTyping });
  };

  return {
    // Connection state
    socket: socketRef.current,
    isConnected,

    // Data
    activeUsers,
    allUsers,
    messages,
    conversations,
    typingUsers,
    lastMessage,

    // Message functions
    sendMessage,
    getChatHistory,
    deleteMessage,
    editMessage,
    markAsRead,

    // User functions
    getActiveUsers,
    getAllUsers,

    // Conversation functions
    getConversations,

    // Typing indicator
    sendTypingIndicator,
  };
};

export default useSocket;
