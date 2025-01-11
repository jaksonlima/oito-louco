import { Grid } from "@nextui-org/react";
import { useWindowSize } from "../hooks/useWindowSize";
import { PropsWithChildren } from "react";

export function Hidden({ children }: PropsWithChildren) {
  const { width } = useWindowSize();
  const isMobile = (width || 0) <= 960;

  console.log(isMobile);
  return (
    <>
      <Grid hidden={isMobile}>{children}</Grid>
    </>
  );
}
