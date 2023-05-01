import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicHome = dynamic(() => import("../feature/Home/Home"), {
  ssr: false,
});

export default function IndexHome() {
  return (
    <>
      <Head>
        <title>Oito louco</title>
        <meta name="Jakson Lima" content="Jakson Wilson Bonfim de Lima" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicHome />
    </>
  );
}
