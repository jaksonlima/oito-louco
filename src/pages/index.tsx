import Head from "next/head";

import { Home } from "../feature/Home/Home";

export default function IndexHome() {
  return (
    <>
      <Head>
        <title>Oito louco</title>
        <meta name="Jakson Lima" content="Jakson Wilson Bonfim de Lima" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}
