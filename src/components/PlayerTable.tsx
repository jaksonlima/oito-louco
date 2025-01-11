import { Table } from "@nextui-org/react";

import { Player } from "../feature/Home/Home";

interface PlayerTableProps {
  players: Player[];
}

export function PlayerTable({ players }: PlayerTableProps) {
  if (players.length <= 0) {
    return <></>;
  }

  return (
    <Table
      aria-label="Example static collection table"
      bordered
      lined
      css={{
        minWidth: "250px",
        height: "auto",
      }}
    >
      <Table.Header>
        <Table.Column key="name">Name</Table.Column>
        <Table.Column key="points">Pontos</Table.Column>
      </Table.Header>
      <Table.Body css={{ fontSize: "x-large" }}>
        {players.map((player) => (
          <Table.Row key={player.id}>
            <Table.Cell>{player.name}</Table.Cell>
            <Table.Cell>{player.points}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
