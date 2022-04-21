import AppContextProvider from "../contexts/common/app-context";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppContextProvider>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </AppContextProvider>
  );
};

export default MyApp;
