import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";

import { PlaySound } from "./PlaySound";
import { Player } from "../feature/Home/Home";
import { PlayVideo } from "./PlayVideo";

interface FunnyProps {
  setVisible: (value: boolean) => void;
  visible: boolean;
  playerFunny: Player | undefined | null;
  playerLarge: Player | undefined | null;
  playerWinner: Player | undefined | null;
}

interface FunnyModal {
  setVisible: (value: boolean) => void;
  visible: boolean;
  playerFunny: Player | undefined | null;
  playerLarge: Player | undefined | null;
}

interface WinnerModal {
  setVisible: (value: boolean) => void;
  visible: boolean;
  playerWinner: Player | undefined | null;
}

function FunnyModal({
  visible,
  setVisible,
  playerFunny,
  playerLarge,
}: FunnyModal) {
  const closeHandler = () => {
    setVisible(false);
  };

  function handleFunnyMessage() {
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
        width="600px"
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={24}>
            😂
            <Text b size={24}>
              Patchon
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <PlaySound />
          <Text id="modal-title" size={24}>
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

function WinnerModal({ visible, setVisible, playerWinner }: WinnerModal) {
  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Modal
        closeButton
        blur
        width="640px"
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ gap: "$10" }}>
          <Text id="modal-title" size={24}>
            🙅🏻‍♂️🙅🏻‍♀️ Winn
          </Text>
          <Text b size={24}>
            😎 {playerWinner?.name} 🥳
          </Text>
        </Modal.Header>
        <Modal.Body>
          <PlayVideo />
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

export function PlayerFunny({
  visible,
  setVisible,
  playerFunny,
  playerLarge,
  playerWinner,
}: FunnyProps) {
  return (
    <>
      {playerWinner ? (
        <>
          {" "}
          <WinnerModal
            visible={visible}
            setVisible={setVisible}
            playerWinner={playerWinner}
          />
        </>
      ) : (
        <>
          <FunnyModal
            visible={visible}
            setVisible={setVisible}
            playerFunny={playerFunny}
            playerLarge={playerLarge}
          />
        </>
      )}
    </>
  );
}
