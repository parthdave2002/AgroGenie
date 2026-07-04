import { useEffect, useState } from "react";
import UserProfileImg from "../../../public/images/users/farmer-2.png"
import { useSelector } from "react-redux";

interface ChatProps {
  socket: any;
  OpenUserChat: (id: any) => void;
  setOpenChatModal: (id: boolean) => void;
  setOpenProfileModal: (id: boolean) => void;
}

const ChatUserList = ({ socket, OpenUserChat, setOpenChatModal, setOpenProfileModal }: ChatProps) => {
  const [searchText, setSearchText] = useState("");
  const [LoginUserimg, setLoginUserimg] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const login = useSelector((state:any) => state.Login.Logincode);
  
  useEffect(() => {
    setLoginUserimg(login?.data?.user_img?.user_pic );
  }, [login]);

  useEffect(() => {
    if (!socket.isConnected) return;

    setLoading(true);
    socket.getConversations();
    socket.getAllUsers();

    const handleConversations = (data: any) => {
      setConversations(data);
      setLoading(false);
    };

    const handleAllUsers = (data: any) => {
      setAllUsers(data);
    };

    if (socket.socket) {
      socket.socket.on("conversations", handleConversations);
      socket.socket.on("all-users", handleAllUsers);
    }

    return () => {
      if (socket.socket) {
        socket.socket.off("conversations", handleConversations);
        socket.socket.off("all-users", handleAllUsers);
      }
    };
  }, [socket.isConnected]);

  const filteredConversations = conversations.filter((item) =>
    item.userDetails.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );


  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const conversationMap = new Map(
    conversations.map((conversation) => [
      conversation.userDetails?._id?.toString() || conversation._id?.toString(),
      conversation,
    ])
  );

  const contactsWithLastMessage = filteredUsers.map((user) => {
    const conversation = conversationMap.get(user._id?.toString());

    return {
      ...user,
      lastMessage: conversation?.lastMessage || null,
      lastMessageTime: conversation?.lastMessageTime || null,
    };
  });



  const contactConversationIds = new Set(
    conversations.map((conversation) =>
      conversation.userDetails?._id?.toString() || conversation._id?.toString()
    )
  );

  const nonConversationContacts = contactsWithLastMessage.filter(
    (user) => !contactConversationIds.has(user._id?.toString())
  );

  const handleConversationClick = (conversation: any) => {
    OpenUserChat({
      _id: conversation._id,
      name: conversation.userDetails.name,
      email: conversation.userDetails.email,
    });
  };

  const handleUserClick = (user: any) => {
    OpenUserChat({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  };

  console.log("allUsers", allUsers, filteredConversations)

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 py-3 border-b border-slate-200 bg-White">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Messages</h2>
          </div>

          <button className="rounded-full bg-TitaniumWhite p-2 text-slate-700 transition hover:bg-slate-200" onClick={() => setOpenProfileModal(true)} > 
           <img className="w-10 h-10 rounded-full" src={LoginUserimg} alt="advisor photo" />
          </button>
        </div>

        <div className="mt-3 relative">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search contacts"
            className="w-full rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:bg-White"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 px-2 py-3 border-b">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500">Loading conversations...</p>
          </div>
        ) : (
          <>
            {filteredConversations.length > 0 && (
              <>
                {filteredConversations.map((conversation) => (
                  <button key={conversation._id} onClick={() => handleConversationClick(conversation)} className="mb-2 flex w-full items-start gap-3 rounded-3xl border bg-White px-4 py-3 text-left transition hover:border-slate-200 hover:bg-slate-100" >
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl GreenButton shadow-sm">
                      <img className="w-10 h-10 rounded-full" src={conversation?.userDetails?.user_pic} alt="advisor photo" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-slate-900">{conversation.userDetails.name}</p>
                        <span className="text-xs text-slate-400">{new Date(conversation.lastMessageTime).toLocaleTimeString()}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <span className="rounded-full bg-green-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-White">
                        {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </>
            )}

            {nonConversationContacts.length > 0 && (
              <>
                {nonConversationContacts.map((user) => (
                  <button key={user._id} onClick={() => handleUserClick(user)} className="mb-2 flex w-full items-start gap-3 rounded-3xl border bg-White px-4 py-3 text-left transition hover:border-slate-200 hover:bg-slate-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl GreenButton shadow-sm">
                      <img className="w-10 h-10 rounded-full" src={user?.user_pic} alt="advisor photo" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        {user.lastMessageTime && (
                          <span className="text-xs text-slate-400">{new Date(user.lastMessageTime).toLocaleTimeString()}</span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-500 truncate">
                        {user.lastMessage ? user.lastMessage : `Start chat with ${user.name}`}
                      </p>
                    </div>
                  </button>
                ))}
              </>
            )}

            {filteredConversations.length === 0 && nonConversationContacts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
                <p className="text-slate-500">No conversations yet</p>
                <p className="text-sm text-slate-400">Select a contact below to start a new conversation.</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="border-t border-slate-200 bg-White px-6 py-4">
        <button onClick={() => setOpenChatModal(false)} className="w-full rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-White transition hover:bg-green-600">  Close Chat </button>
      </div>
    </div>
  );
};

export default ChatUserList;
