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
          <Text id="modal-title" size={18}>
            Regras
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">Autores:</Text>
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
