import type { AppProps } from "next/app";

import { NextUIProviderCustom } from "@/src/context/NextUIProviderContext";
import { SnackbarProviderCustom } from "../provider/SnackbarProviderCustom";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProviderCustom>
      <SnackbarProviderCustom>
        <Component {...pageProps} />
      </SnackbarProviderCustom>
    </NextUIProviderCustom>
  );
}
