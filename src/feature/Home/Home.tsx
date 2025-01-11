import { NavBar } from "@/src/components/Nav/NavBar";
import { revisedRandId } from "@/src/utils/uuid";
import { Container, Input, Spacer, Button, Grid } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import capitalize from "lodash.capitalize";

import { HomeCollapse } from "./HomeCollapse";
import { HomeCart } from "./HomeCart";
import { useSnackbar } from "notistack";
import { PlayerFunny } from "@/src/components/PlayerFunny";
import { PlayerTable } from "@/src/components/PlayerTable";
import { useWindowSize } from "@/src/hooks/useWindowSize";

export type Player = {
  id?: string;
  name: string;
  points: number;
};

export type Players = {
  players: Player[];
  end?: string | null;
};

function Home() {
  const [players, setPlayers] = useState<Players>({ players: [], end: null });
  const [playerLarge, setPlayerLarge] = useState<Player | null>();
  const [playerFunny, setPlayerFunny] = useState<Player | null>();
  const [playerWinner, setPlayerWinner] = useState<Player | null>();

  const { width } = useWindowSize();
  const isMobile = (width || 0) <= 960;

  const [funnyOpen, setFunnyOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Player>();

  function addPlayer(data: Player) {
    data.id = revisedRandId();
    data.name = capitalize(data.name);

    const newPlayers: Players = {
      ...players,
      players: [data, ...players.players],
    };

    setPlayers(newPlayers);
    resetFunny();

    enqueueSnackbar(`Jogador: ${data.name} adicionado a partida`, {
      variant: "success",
    });
  }

  function addPoints(data: Player, points: number) {
    setPlayers((old) => {
      const newPlayers = old.players.map((it) => {
        if (it.id === data.id) {
          it.points = Number(it.points) + Number(points);
        }
        return it;
      });

      return {
        ...old,
        players: newPlayers,
      };
    });

    enqueueSnackbar(`Pontos: ${points} adicionados para ${data.name}`, {
      variant: "info",
    });

    addFunny(data);
  }

  function addFunny(payer: Player) {
    const playersLarge = players.players.filter((play) => play.points >= 100);

    if (players.players.length - playersLarge.length === 1) {
      const playerWinner = players.players.filter((play) => play.points < 100);

      if (playerWinner && playerWinner[0]) {
        setPlayerWinner(playerWinner[0]);
      }
    }

    if (payer.points >= 100) {
      setFunnyOpen(true);

      const playersLarge = players.players
        .filter((play) => play.points >= 100)
        .filter((play) => play.id !== payer.id)
        .sort((a: Player, b: Player) => (a.points < b.points ? 0 : -1));

      if (playersLarge.length > 0) {
        setPlayerLarge(playersLarge[0]);
      }

      setPlayerFunny(payer);
    }
  }

  function removePlayers(data: Player) {
    setPlayers((old) => {
      const newPlayers = old.players.filter((it) => it.id !== data.id);

      return {
        ...old,
        players: newPlayers,
      };
    });

    resetFunny();

    enqueueSnackbar(`Jogador: ${data.name} removido da partida`, {
      variant: "warning",
    });
  }

  function resetFunny() {
    setPlayerLarge(null);
    setPlayerFunny(null);
    setPlayerWinner(null);
  }

  function orderPlayers() {
    return players.players.sort((a: Player, b: Player) =>
      a.points < b.points ? 0 : -1
    );
  }

  const onSubmit = (data: Player) => {
    addPlayer(data);
    reset();
    clearErrors();
  };

  return (
    <>
      <PlayerFunny
        visible={funnyOpen}
        setVisible={setFunnyOpen}
        playerLarge={playerLarge}
        playerFunny={playerFunny}
        playerWinner={playerWinner}
      />

      <NavBar>
        <Container xs>
          <HomeCollapse
            players={players}
            setPlayers={setPlayers}
            collapsePlayer={
              <div style={{ margin: "27px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Input
                      aria-label="Name"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Nome é obrigatório.",
                        },
                      })}
                      labelPlaceholder="Nome do jogador"
                      helperText={errors["name"]?.message as string}
                      helperColor={
                        errors["name"]?.message !== null ? "warning" : "default"
                      }
                    />
                    <Spacer y={2} />
                    <Input
                      aria-label="Points"
                      {...register("points")}
                      type="number"
                      labelPlaceholder="Pontos iniciais 0"
                    />
                    <Spacer y={2} />
                    <Button
                      type="submit"
                      icon={<UserIcon />}
                      shadow
                      color="gradient"
                      auto
                    >
                      Adicionar Jogador
                    </Button>
                  </div>
                </form>
              </div>
            }
          />
        </Container>
        <Container fluid>
          <Grid.Container>
            <Grid hidden={isMobile}>
              <PlayerTable players={orderPlayers()} />
            </Grid>

            <Grid xs>
              <Grid.Container gap={2} justify="center">
                <>
                  {orderPlayers().map((player) => (
                    <HomeCart
                      key={player.id}
                      payer={player}
                      addPoints={addPoints}
                      removePlayer={removePlayers}
                    />
                  ))}
                </>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Container>
      </NavBar>
    </>
  );
}

const UserIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}: any) => {
  return (
    <svg
      data-name="Iconly/Curved/Profile"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          data-name="Stroke 1"
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
        />
        <path
          data-name="Stroke 3"
          d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
        />
      </g>
    </svg>
  );
};

export default Home;
