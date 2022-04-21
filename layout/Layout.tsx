import { useEffect, useRef } from "react";
import TopBar from "../components/navigation/TopBar";
import SideBar from "../components/navigation/SideBar";
import { useAppContext } from "../contexts/common/app-context";

const Layout = ({ children }) => {
  const mainElementRef = useRef();
  const { setMainElementRef } = useAppContext();

  useEffect(() => {
    console.log("UPDATE MAINELEMENTREF");
    mainElementRef.current && setMainElementRef(mainElementRef);
  }, [setMainElementRef]);

  return (
    <>
      <div className="h-screen flex overflow-hidden bg-brand-background font-main">
        <SideBar></SideBar>
        <div className="flex flex-col w-0 flex-1">
          <TopBar></TopBar>
          <main
            className="flex-1 relative flex flex-col focus:outline-none overflow-y-scroll"
            ref={mainElementRef}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
