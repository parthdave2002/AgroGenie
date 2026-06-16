import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ChatProfileProps {
  setOpenProfileModal: (id: boolean) => void;
}

const ChatProfilePage = ({ setOpenProfileModal }: ChatProfileProps) => {
  const [LoginUserimg, setLoginUserimg] = useState("");
  const [LoginUsername, setLoginUsername] = useState<String|null>("");
  const [LoginUseremail, setLoginUseremail] = useState<String|null>("");

  const login = useSelector((state:any) => state.Login.Logincode);
  useEffect(() => {
    setLoginUserimg(login?.data?.user_img?.user_pic );
    setLoginUsername(login?.data?.name);
    setLoginUseremail(login?.data?.email)
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Profile</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Your information</h2>
        </div>
        <button className="rounded-full bg-TitaniumWhite px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-100" onClick={() => setOpenProfileModal(false)}> Close </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-lg rounded-[32px] bg-TitaniumWhite p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <img
                src={LoginUserimg}
                alt="Profile"
                className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
              
            </div>
          
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-3xl bg-White p-4 shadow-sm">
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="mt-2 text-base font-medium text-slate-900">{LoginUsername}</p>
            </div>
            <div className="rounded-3xl bg-White p-4 shadow-sm">
              <p className="text-sm text-slate-500">Email Address</p>
              <p className="mt-2 text-base font-medium text-slate-900">{LoginUseremail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatProfilePage;
