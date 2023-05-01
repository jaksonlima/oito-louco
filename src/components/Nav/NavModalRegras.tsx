import { Button, Modal, Text, useModal } from "@nextui-org/react";

function NavModalRegras() {
  const { setVisible, bindings } = useModal();
  return (
    <div>
      <Button auto flat onPress={() => setVisible(true)}>
        Regras
      </Button>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text b id="modal-title" size={18}>
            Regras
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">Início 3 cartas;</Text>
          <Text id="modal-description">Limite de pontos 100;</Text>
          <Text id="modal-description">A: pula jogador;</Text>
          <Text id="modal-description">Q: volta jogo.</Text>
          <Text id="modal-description">
            8: vale 20 pontos final de partida;
          </Text>
          <Text id="modal-description">7: compra 3, acumulativo;</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { NavModalRegras };
