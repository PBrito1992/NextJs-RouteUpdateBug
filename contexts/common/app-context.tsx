import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  mainElementRef: null,
  setMainElementRef: (elementRef) => {}
});

const AppContextProvider = ({ children }) => {
  const [mainElementRef, setMainElementRef] = useState();

  console.log("mainElementRef - ", mainElementRef);
  return (
    <AppContext.Provider value={{ mainElementRef, setMainElementRef }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  return ctx;
};
