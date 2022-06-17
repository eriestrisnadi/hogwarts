import "@coreui/coreui/dist/css/coreui.min.css";
import "styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Hogwarts</title>
        <meta name="description" content="Hogwarts characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="main">
        <Component {...pageProps} />
      </main>
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
