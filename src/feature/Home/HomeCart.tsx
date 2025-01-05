import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
  useTheme,
} from "@nextui-org/react";

import { Payer } from "./Home";
import { Funny } from "@/src/components/Funny";

type CardProps = {
  payer: Payer;
  addPoints: (data: Payer, points: number) => void;
  removePlayer: (data: Payer) => void;
};

const paletteWeithPoints = {
  16: "#08eb88",
  33: "#98eb08",
  66: "#ffcc14",
  84: "#f23f3f",
};

function handlePaletteWeithPoints(points: number): string {
  if (points < 0) return paletteWeithPoints[84];
  if (points <= 16) return paletteWeithPoints[16];
  if (points >= 33 && points <= 66) return paletteWeithPoints[33];
  if (points >= 66 && points <= 84) return paletteWeithPoints[66];
  if (points >= 84) return paletteWeithPoints[84];
  return paletteWeithPoints[16];
}

function selectImgage(isDark: boolean | undefined) {
  if (isDark) {
    return `dark.jpg`;
  }
  return `/light.jpg`;
}

const HomeCart = ({ payer, addPoints, removePlayer }: CardProps) => {
  const [points, setPoints] = useState<number>(0);

  const { isDark } = useTheme();

  const totalPoints = Number(payer.points ?? 0);

  return (
    <Grid>
      <Card css={{ maxW: "222px", h: "250px" }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text size={12} weight="bold" transform="uppercase">
              #{payer?.id}
            </Text>
            <Text h3>{payer.name}</Text>
          </Col>
          <Col
            css={{
              position: "absolute",
              zIndex: 2,
              top: 5,
              right: -40,
              width: "93px",
            }}
          >
            <Button
              flat
              auto
              rounded
              color="error"
              onClick={() => {
                removePlayer(payer);
              }}
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                X
              </Text>
            </Button>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={selectImgage(isDark)}
            width="100%"
            height="100%"
            objectFit="cover"
            alt="Card example background"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#ffffff66",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Text
                size={18}
                css={{ fontWeight: "$bold", display: "inline-flex", gap: 8 }}
              >
                Pontos:
                <Text
                  color={handlePaletteWeithPoints(totalPoints)}
                  size={18}
                  css={{ fontWeight: "$bold" }}
                >
                  {totalPoints}
                </Text>
              </Text>
              <Spacer y={0.2} />
              <Input
                aria-label="Points"
                type="number"
                status="error"
                bordered
                placeholder="Ponto"
                onBlur={(env) => {
                  const points = Number(env.target.value);
                  setPoints(points);
                }}
              />
            </Col>
            <Col>
              <Row justify="flex-end">
                <Button
                  flat
                  auto
                  rounded
                  color="success"
                  onPress={() => {
                    addPoints(payer, points);
                  }}
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={10}
                    weight="bold"
                    transform="uppercase"
                  >
                    Enviar
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export { HomeCart };
