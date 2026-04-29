import { useState } from "react";
import { useSelector } from "react-redux";
import ChatUserList from "./chatUserlist";
import ChatingList from "./chatSingle";
import ChatProfilePage from "./chatProfile";
import useSocket from "../../hooks/useSocket";
import Cookies from "js-cookie";

const ChatButton = () => {
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Get current user from Redux
  const login = useSelector((state: any) => state.Login.Logincode);

  const userId = login?.data?.id;
  const token = Cookies.get("token");

  // Initialize Socket.IO
  const socket = useSocket(userId, token);

  const openUserChat = (user: any) => {
    setSelectedUser(user);
    setOpenProfileModal(false);
  };

  const closeChat = () => {
    setOpenChatModal(false);
    setSelectedUser(null);
    setOpenProfileModal(false);
  };
  
  if (!userId || !token) {
    return (
      <div className="fixed bottom-4 right-4 z-50 rounded-full bg-gray-400 px-5 py-3 text-sm font-semibold text-white shadow-xl">
        Login required
      </div>
    );
  }

  return (
    <>
      {openChatModal && (
        <div className="fixed bottom-16 z-50 right-4 w-[95vw] max-w-[920px] h-[520px] rounded-[32px] border border-slate-200 bg-white shadow-[0_35px_120px_-15px_rgba(15,23,42,0.2)] overflow-hidden">
          <div className="flex h-full flex-col md:flex-row">
            <div className="w-full md:w-[38%] border-b border-slate-200 bg-slate-50 md:border-b-0 md:border-r">
              <ChatUserList
                socket={socket}
                OpenUserChat={openUserChat}
                setOpenChatModal={closeChat}
                setOpenProfileModal={() => {
                  setOpenProfileModal(true);
                  setSelectedUser(null);
                }}
              />
            </div>

            <div className="flex-1 bg-white">
              {openProfileModal ? (
                <ChatProfilePage setOpenProfileModal={() => setOpenProfileModal(false)} />
              ) : selectedUser ? (
                <ChatingList socket={socket} UserId={selectedUser} setOpenUserChat={() => setSelectedUser(null)} />
              ): (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center text-slate-500">
                  <div className="rounded-3xl bg-gray-100 px-6 py-5 text-sm shadow-sm">
                    {!socket.isConnected ? "Connecting..." : "Select a contact to start messaging."}
                  </div>
                  <button
                    className="rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600"
                    onClick={() => setOpenProfileModal(true)}
                  >
                    View profile panel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className="fixed bottom-4 right-4 z-50 inline-flex cursor-pointer items-center justify-center rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-green-600"
        onClick={() => setOpenChatModal((prev) => !prev)}
      >
        {!socket.isConnected && <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse"></span>}
        Chat Now
      </div>
    </>
  );
};

export default ChatButton;
