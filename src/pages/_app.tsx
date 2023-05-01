import type { AppProps } from "next/app";

import { NextUIProviderCustom } from "@/src/context/NextUIProviderContext";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProviderCustom>
      <SnackbarProvider dense autoHideDuration={9000} maxSnack={8}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </NextUIProviderCustom>
  );
}
