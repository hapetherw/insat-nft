import { ThemeProvider, createGlobalStyle } from "styled-components";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import styledNormalize from "styled-normalize";
import { withRouter } from "next/router";
import App from "next/app";

import createStore from "store/createStore";
import theme from "theme";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import "../src/styles/index.scss";

import { MetamaskStateProvider } from "use-metamask";
import { NotificationContainer } from "react-notifications";

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
`;

function MyApp(props) {
  const { Component, pageProps, router, store } = props;
  const meta = pageProps && pageProps.meta ? pageProps.meta : null;
  
  const title =
    meta && meta.title
      ? meta.title
      : "Instagram NFT Posts: Easily Create and Sell NFTs";
  
      const description = meta && meta.description
  ? meta.description : "Create NFTs from your Instagram posts and media. Sell your NFTs in the most trusted and secure platform online.";

  const imgUrl =
    meta && meta.imgUrl
      ? meta.imgUrl
      : "https://www.fluentin3months.com/wp-content/uploads/2018/04/beautiful-spanish.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content="instagram nft, media nft" />
        <meta name="image" content={imgUrl} />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imgUrl} />
        <link rel="shortcut icon" href="/static/icon/favicon.ico" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EV6KQLWF4W"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-EV6KQLWF4W');`,
          }}
        ></script>
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <GlobalStyle />
          <MetamaskStateProvider>
            <Component router={router} {...pageProps} />
            <NotificationContainer />
          </MetamaskStateProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

const CustomApp = withRedux(createStore)(MyApp);
export default withRouter(CustomApp);
