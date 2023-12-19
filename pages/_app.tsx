import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import Layout from "../components/Layout/Layout";
import getLibrary from "../utils/getLibrary";
import "./../styles/styles.scss";
import Web3ReactManager from "../components/Web3ReactManager";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store/store";
import language, { setLanguage } from "../store/language";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const getLanguage = async (lang: string = "en-US") => {
    // localStorage.setItem("lang", lang);
    console.log("getting language");
    const path = `/api/getLanguage/?lang=${lang}`;
    fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(async function (response) {
      const data = await response.json();
      const dataMap = new Map<string, string>(Object.entries(data));
      store.dispatch(setLanguage({ value: dataMap, name: lang }));
    });
  };

  useEffect(() => {
    let current = store.getState().language.name;
    if (!current || current != router.locale) getLanguage(router.locale);
  }, [router]);

  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
          <Web3ReactManager>
            <Component {...pageProps} />
          </Web3ReactManager>
          <ToastContainer
            position="bottom-right"
            pauseOnFocusLoss={false}
            theme="dark"
          />
        </Layout>
      </Web3ReactProvider>
    </Provider>
  );
}

export default MyApp;
