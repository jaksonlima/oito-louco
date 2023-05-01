import { Button, Modal, Text } from "@nextui-org/react";
import { useState } from "react";

function NavModalDesenvolvidoPor() {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button auto color="warning" flat onPress={handler}>
        Desenvolvido por
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Jakson Lima
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-title" b size={18}>
            <a
              href="https://www.linkedin.com/in/jakson-lima-68264b160/"
              target="_blank"
            >
              LinkedIn
            </a>
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

export { NavModalDesenvolvidoPor };
