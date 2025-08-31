import type { FC, PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
// import { logoutformlaravel, resetlogoutformlaravel } from "../Store/actions";

interface NavbarSidebarLayoutProps {children?: any;}

const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
  ];
  
  const Autologout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = ({  children }) => {
    const dispatch = useDispatch();
    // const navigation = useNavigate();
  
    let timer: NodeJS.Timeout;
  
    const handleLogoutTimer = () => {
      timer = setTimeout(() => {
        resetTimer();
        Object.values(events).forEach((item) => {
          window.removeEventListener(item, resetTimer);
        });
        logoutAction();
      }, 600000); // 600000ms = 10 minutes. You can change the time.
    };
  
    const resetTimer = () => {
      if (timer) clearTimeout(timer);
    };
  
    useEffect(() => {
      Object.values(events).forEach((item) => {
        window.addEventListener(item, () => {
          resetTimer();
          handleLogoutTimer();
        });
      });
      // Cleanup function for removing event listeners
      return () => {
        Object.values(events).forEach((item) => {
          window.removeEventListener(item, resetTimer);
        });
      };
    }, []);
  
    const { Logoutcode } = useSelector((state: any) => ({
      Logoutcode: state.Login.Logoutcode,
    }));
  
    const [userDataList, setUserDataList] = useState<boolean | null>(null);
  
    const logOutcall = () => {
      // dispatch(logoutformlaravel());
    };
  
    useEffect(() => {
      setUserDataList(Logoutcode ? Logoutcode.success : null);
    }, [Logoutcode, ]);
  
    useEffect(() => {
      if (userDataList === true) {
        Cookies.remove("token");
        Cookies.remove("username");
        // window.location.pathname = "/login";
        window.location.href = 'http://65.1.124.93:5000/login';
        // dispatch(resetlogoutformlaravel());
        setUserDataList(false);
      }
    }, [userDataList, dispatch]);
  
    const logoutAction = () => {
      logOutcall();
    };
  
    return <>{children}</>;
  };

export default Autologout;
