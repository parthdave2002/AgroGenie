import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoSend } from "react-icons/io5";

interface ChatUserProps {
  socket: any;
  UserId?: any;
  setOpenUserChat: (id: boolean) => void;
}

const ChatingList = ({ socket, UserId, setOpenUserChat }: ChatUserProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const typingTimeoutRef = useRef<any>(null);

  useEffect(() => {
    if (!socket.isConnected || !UserId) return;

    setLoading(true);
    setMessages([]);
    
    socket.getChatHistory(UserId._id, 1, 50);

    const handleChatHistory = (data: any) => {
      setMessages(data.messages);
      setLoading(false);
      socket.markAsRead(UserId._id);
      socket.getConversations();
    };

    const handleMessageSent = (data: any) => {
      setMessages((prev) => [...prev, data.message]);
      socket.getConversations();
    };

    const handleMessageReceived = (data: any) => {
      setMessages((prev) => [...prev, data.message]);
      if (data.message.sender._id === UserId._id) {
        socket.markAsRead(UserId._id);
        socket.getConversations();
      }
    };

    const handleTyping = (data: any) => {
      if (data.senderId === UserId._id) {
        setIsTyping(data.isTyping);
      }
    };

    if (socket.socket) {
      socket.socket.on("chat-history", handleChatHistory);
      socket.socket.on("message-sent", handleMessageSent);
      socket.socket.on("receive-message", handleMessageReceived);
      socket.socket.on("user-typing", handleTyping);
    }

    return () => {
      if (socket.socket) {
        socket.socket.off("chat-history", handleChatHistory);
        socket.socket.off("message-sent", handleMessageSent);
        socket.socket.off("receive-message", handleMessageReceived);
        socket.socket.off("user-typing", handleTyping);
      }
    };
  }, [socket.isConnected, UserId]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (UserId?._id) {
        socket.sendTypingIndicator(UserId._id, false);
      }
    };
  }, [UserId, socket]);

  const handleSendMessage = () => {
    if (!message.trim() || !UserId) return;

    socket.sendMessage(UserId._id, message);
    setMessage("");
    socket.sendTypingIndicator(UserId._id, false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleTypingChange = (e: any) => {
    setMessage(e.target.value);
    socket.sendTypingIndicator(UserId._id, true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.sendTypingIndicator(UserId._id, false);
    }, 1500);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition hover:bg-slate-100"
          onClick={() => setOpenUserChat(false)}
        >
          <IoChevronBack className="h-5 w-5" />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold text-slate-900">{UserId?.name || "Chat"}</p>
          <p className="text-xs text-slate-500">{isTyping ? "typing..." : "Online"}</p>
        </div>

        <div className="h-12 w-12 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-sm">
          {UserId?.name?.charAt(0)}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((messageItem: any) => {
              const isFromMe = messageItem.sender._id !== UserId._id;
              return (
                <div key={messageItem._id} className={`flex ${isFromMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] break-all rounded-3xl px-4 py-3 text-sm shadow-sm ${
                      isFromMe
                        ? "bg-green-500 text-white rounded-br-[8px] rounded-bl-3xl rounded-tl-3xl rounded-tr-3xl"
                        : "bg-gray-200 text-slate-800 rounded-bl-[8px] rounded-br-3xl rounded-tl-3xl rounded-tr-3xl"
                    }`}
                  >
                    <p>{messageItem.message}</p>
                    {/* <span className="mt-2 block text-[9px] text-slate-400 text-right">{new Date(messageItem.sent_at).toLocaleTimeString()}</span> */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 bg-white px-5 py-4">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-100 px-3 py-2">
          <input
            value={message}
            onChange={handleTypingChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600 disabled:opacity-50"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <IoSend className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatingList;
