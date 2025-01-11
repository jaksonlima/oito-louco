import { useState } from "react";
import { Button, Collapse, Grid, Spacer, Table, Text } from "@nextui-org/react";

import { Players } from "./Home";
import { HISTORY_PLAYERS } from "@/src/utils/env";
import { instance } from "@/src/utils/localStorage";
import { useSnackbar } from "notistack";

function getHistoryPlayers() {
  return JSON.parse(instance()?.getItem(HISTORY_PLAYERS) ?? "{}");
}

function addHistoryPlayers(endDate: string, players: Players) {
  const localStorage = instance();

  const newHistoryPlayers = {
    ...getHistoryPlayers(),
    [endDate]: players,
  };

  localStorage?.setItem(HISTORY_PLAYERS, JSON.stringify(newHistoryPlayers));
}

function removeHistoryPlayers() {
  const localStorage = instance();

  localStorage?.removeItem(HISTORY_PLAYERS);
}

type CollapseAppProps = {
  collapsePlayer: JSX.Element;
  players: Players;
  setPlayers: (data: Players) => void;
};

function HomeCollapse({
  collapsePlayer,
  players,
  setPlayers,
}: CollapseAppProps) {
  const [_, renderComponent] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Grid.Container gap={2}>
      <Grid style={{ width: "inherit" }}>
        <Collapse.Group bordered>
          <Collapse
            title="Configurações"
            subtitle="Jogadores, configuração e históricos."
            expanded
          >
            <Collapse.Group>
              <Collapse
                title="Jogadores"
                subtitle="Adicione mas jogadores a partida."
                expanded
              >
                {collapsePlayer}
              </Collapse>
              <Collapse
                title="Configuração"
                subtitle="Ao confirmar será guardado em histórico."
              >
                <div>
                  <Text>
                    Reiniciar e restaurar jogadores da última partida ?
                  </Text>
                  <Spacer y={0.2} />
                  <Button
                    rounded
                    color="success"
                    shadow
                    style={{ margin: "7px" }}
                  >
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                      onClick={() => {
                        if (players?.players?.length <= 0) return;

                        const endDate = new Date().toJSON();

                        players.end = endDate;

                        addHistoryPlayers(endDate, players);

                        const startPlayers: Players = {
                          end: null,
                          players: players.players.map((it) => {
                            it.points = 0;
                            return it;
                          }),
                        };

                        setPlayers(startPlayers);

                        enqueueSnackbar("Jogo reiniciado", {
                          variant: "success",
                        });
                        enqueueSnackbar("Histórico salvo", { variant: "info" });
                      }}
                    >
                      Confirmar
                    </Text>
                  </Button>
                </div>
                <Spacer y={1} />
                <div>
                  <Text>Finalizar partida ?</Text>
                  <Spacer y={0.2} />
                  <Button
                    rounded
                    color="warning"
                    shadow
                    style={{ margin: "7px" }}
                    onClick={() => {
                      if (players?.players?.length <= 0) return;

                      const endDate = new Date().toJSON();

                      setPlayers({ players: [], end: null });

                      players.end = endDate;

                      addHistoryPlayers(endDate, players);

                      enqueueSnackbar("Jogo finalizado", {
                        variant: "warning",
                      });
                      enqueueSnackbar("Histórico salvo", { variant: "info" });
                    }}
                  >
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      Confirmar
                    </Text>
                  </Button>
                </div>
              </Collapse>
              <Collapse
                title="Histórico"
                subtitle="Relatório completo das últimas partidas."
              >
                <div>
                  <Text>Deseja limpar histórico de partidas ?</Text>
                  <Spacer y={0.2} />
                  <Button
                    rounded
                    color="error"
                    shadow
                    style={{ margin: "7px" }}
                  >
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                      onClick={() => {
                        removeHistoryPlayers();
                        renderComponent(!_);
                        enqueueSnackbar("Histórico de partidas limpo", {
                          variant: "error",
                        });
                      }}
                    >
                      Confirmar
                    </Text>
                  </Button>
                </div>
                <Collapse.Group>
                  {typeof window !== "undefined" &&
                    localStorage &&
                    Object.entries(getHistoryPlayers())
                      .sort(([a], [b]) => (a > b ? -1 : 0))
                      .map(([end, players]) => {
                        const endDate = new Date(end).toLocaleString("pt-BR");
                        const playersSelected = players as Players;

                        return (
                          <>
                            <Collapse key={playersSelected.end} title={endDate}>
                              <Table
                                aria-label="Example table with static content"
                                css={{
                                  height: "auto",
                                  minWidth: "100%",
                                }}
                              >
                                <Table.Header>
                                  <Table.Column>Nome</Table.Column>
                                  <Table.Column>Pontos</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                  {playersSelected.players?.map((player) => (
                                    <Table.Row key={player.id}>
                                      <Table.Cell>{player.name}</Table.Cell>
                                      <Table.Cell>{player.points}</Table.Cell>
                                    </Table.Row>
                                  ))}
                                </Table.Body>
                              </Table>
                            </Collapse>
                          </>
                        );
                      })}
                </Collapse.Group>
              </Collapse>
            </Collapse.Group>
          </Collapse>
        </Collapse.Group>
      </Grid>
    </Grid.Container>
  );
}

export { HomeCollapse };
