import { useState } from "react";
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
            src='https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
                  setPoints(Number(env.target.value));
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
