import React, { useEffect } from "react";
import App from "next/app";
import "../styles/index.css";
import { ThemeProvider } from "styled-components";
import { useRouter } from "next/router";

const theme = {
  colors: {
    primary: "#0e74ff",
  },
};

const AppWrapper = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log("App is changed to: ", url);
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return <Component {...pageProps} />;
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper Component={Component} pageProps={pageProps} />
      </ThemeProvider>
    );
  }
}
