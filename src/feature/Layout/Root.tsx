import { Grid } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export function Root({ children }: PropsWithChildren) {
  return (
    <Grid.Container gap={2} justify="center">
      <>{children}</>
    </Grid.Container>
  );
}
