import { Grid } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export function Right({ children }: PropsWithChildren) {
  return <Grid xs>{children}</Grid>;
}
