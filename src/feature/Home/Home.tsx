import { NavBar } from "@/src/components/Nav/NavBar";
import { revisedRandId } from "@/src/utils/uuid";
import { Container, Input, Spacer, Button, Grid } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import capitalize from "lodash.capitalize";

import { HomeCollapse } from "./HomeCollapse";
import { HomeCart } from "./HomeCart";
import { useSnackbar } from "notistack";

export type Payer = {
  id?: string;
  name: string;
  points: number;
};

export type Payers = {
  players: Payer[];
  end?: string | null;
};

function Home() {
  const [players, setPlayers] = useState<Payers>({ players: [], end: null });
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Payer>();

  function addPlayer(data: Payer) {
    data.id = revisedRandId();
    data.name = capitalize(data.name);

    const newPlayers: Payers = {
      ...players,
      players: [data, ...players.players],
    };

    setPlayers(newPlayers);

    enqueueSnackbar(`Jogador: ${data.name} adicionado a partida`, {
      variant: "success",
    });
  }

  function addPoints(data: Payer, points: number) {
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
  }

  function removePlayers(data: Payer) {
    setPlayers((old) => {
      const newPlayers = old.players.filter((it) => it.id !== data.id);

      return {
        ...old,
        players: newPlayers,
      };
    });

    enqueueSnackbar(`Jogador: ${data.name} removido da partida`, {
      variant: "warning",
    });
  }

  const onSubmit = (data: Payer) => {
    addPlayer(data);
    reset();
    clearErrors();
  };

  return (
    <>
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
        <Spacer y={1} />
        <Container fluid>
          <Grid.Container gap={2} justify="center">
            {players.players
              .sort((a: Payer, b: Payer) => (a.name < b.name ? -1 : 0))
              .map((player) => (
                <HomeCart
                  key={player.id}
                  payer={player}
                  addPoints={addPoints}
                  removePlayer={removePlayers}
                />
              ))}
          </Grid.Container>
        </Container>
        <Spacer y={1} />
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
