import { Grid } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export function Left({ children }: PropsWithChildren) {
  return <Grid>{children}</Grid>;
}
