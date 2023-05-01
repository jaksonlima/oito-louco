import { PropsWithChildren } from "react";
import { Navbar, styled, useTheme } from "@nextui-org/react";
import Image from "next/image";

import { NavTheme } from "@/src/components/Nav/NavTheme";
import { NavModalDesenvolvidoPor } from "@/src/components/Nav/NavModalDesenvolvido";
import { NavModalRegras } from "@/src/components/Nav/NavModalRegras";

const Box = styled("div", {
  boxSizing: "border-box",
});

const Layout = ({ children }: any) => (
  <Box
    css={{
      maxW: "100%",
    }}
  >
    {children}
  </Box>
);

function NavBar({ children }: PropsWithChildren) {
  const { isDark } = useTheme();

  return (
    <>
      <Layout>
        <Navbar shouldHideOnScroll isBordered={isDark} variant="sticky">
          <Navbar.Brand>
            <Image
              src="/poker-3-512x512.png"
              alt="card"
              width={50}
              height={50}
              style={{ borderRadius: "10px" }}
            />
          </Navbar.Brand>
          <Navbar.Content hideIn="xs" variant="underline">
            <Navbar.Link isActive href="#">
              Início
            </Navbar.Link>
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Link color="inherit" href="#">
              <NavModalRegras />
            </Navbar.Link>
            <Navbar.Item>
              <NavModalDesenvolvidoPor />
            </Navbar.Item>
            <Navbar.Item>
              <NavTheme />
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
      </Layout>
      {children}
    </>
  );
}

export { NavBar };
