import { PropsWithChildren } from "react";
import { SnackbarOrigin, SnackbarProvider } from "notistack";

import { useWindowSize } from "@/src/hooks/useWindowSize";

const mobileWidth = 768;

const anchorOrigin = (width: number | undefined): SnackbarOrigin => {
  if (width && width <= mobileWidth)
    return { horizontal: "right", vertical: "top" };
  return { horizontal: "left", vertical: "bottom" };
};

function autoHideDuration(width: number | undefined) {
  if (width && width <= mobileWidth) return 5000;
  return 9000;
}

function maxSnack(width: number | undefined) {
  if (width && width <= mobileWidth) return 4;
  return 8;
}

function dense(width: number | undefined) {
  if (width && width <= mobileWidth) return true;
  return false;
}

function SnackbarProviderCustom({ children }: PropsWithChildren) {
  const { width } = useWindowSize();

  return (
    <SnackbarProvider
      dense={dense(width)}
      autoHideDuration={autoHideDuration(width)}
      maxSnack={maxSnack(width)}
      anchorOrigin={anchorOrigin(width)}
    >
      {children}
    </SnackbarProvider>
  );
}

export { SnackbarProviderCustom };
