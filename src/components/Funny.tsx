import React, { useState } from "react";
import { Modal, Button, Text } from "@nextui-org/react";

import { PlaySound } from "./PlaySound";
import { Payer } from "../feature/Home/Home";

interface FunnyProps {
  setVisible: (value: boolean) => void;
  visible: boolean;
  playerFunny: Payer | undefined;
  playerLarge: Payer | undefined;
}

export function Funny({
  visible,
  setVisible,
  playerFunny,
  playerLarge,
}: FunnyProps) {
  const closeHandler = () => {
    setVisible(false);
  };

  function handleFunnyMessage() {
    console.log({ playerFunny, playerLarge });

    if (!playerLarge && playerFunny) {
      return `Parabéns, você é o primeiro Patchon, ${playerFunny.name} 🥲`;
    }

    if (
      playerLarge &&
      playerFunny &&
      playerLarge.points === playerFunny.points &&
      playerLarge.id !== playerFunny.id
    ) {
      return `Patchon ${playerFunny.name} 🤣, você esta empatado com ${playerLarge.name}`;
    }

    if (playerLarge && playerFunny && playerLarge.points > playerFunny.points) {
      return `Patchon ${playerFunny.name} 🤣, mas o maior Patchon ainda é ${playerLarge.name}`;
    }

    if (playerLarge && playerFunny && playerFunny.points > playerLarge.points) {
      return `Patchon ${playerFunny.name} 🤣, você é o maior Patchon da partida 😂🤦🏻‍♂️`;
    }
  }

  return (
    <div>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            😂
            <Text b size={18}>
              Patchon
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <PlaySound />

          <Text id="modal-title" size={18}>
            {handleFunnyMessage()}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
