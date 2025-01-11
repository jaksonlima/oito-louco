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
          <Text id="modal-description">
            O jogo começa com 3 cartas para cada jogador. Deve começar no
            sentido horário.
            <br />
            <b>Regras Especiais:</b>
            <ul>
              <li>
                <strong>7</strong> de qualquer naipe: compra 3 cartas (carta
                acumulativa).
              </li>
              <li>
                <strong>8</strong> de qualquer naipe:
                <ul>
                  <li>Curinga 🃏.</li>
                  <li>
                    Se bater com esta carta, os pontos de todos da mesa dobram
                    (2X).
                  </li>
                </ul>
              </li>
              <li>
                <strong>A</strong> de qualquer naipe: pula o próximo jogador.
              </li>
              <li>
                <strong>Q</strong> de qualquer naipe: muda o sentido do jogo.
              </li>
              <li>
                Se o jogador estiver com 99 pontos e terminar o jogo com um{" "}
                <strong>A</strong>, ele permanece no jogo.
              </li>
              <li>
                O jogador que completar 100 pontos é eliminado da partida.
              </li>
            </ul>
            <b>Valor de Cada Carta:</b>
            <ul>
              <li>
                <strong>A:</strong> 1 ponto
              </li>
              <li>
                <strong>2:</strong> 2 pontos
              </li>
              <li>
                <strong>3:</strong> 3 pontos
              </li>
              <li>
                <strong>4:</strong> 4 pontos
              </li>
              <li>
                <strong>5:</strong> 5 pontos
              </li>
              <li>
                <strong>6:</strong> 6 pontos
              </li>
              <li>
                <strong>7:</strong> 7 pontos
              </li>
              <li>
                <strong>8:</strong> 20 pontos
              </li>
              <li>
                <strong>9:</strong> 9 pontos
              </li>
              <li>
                <strong>10:</strong> 10 pontos
              </li>
              <li>
                <strong>J:</strong> 10 pontos
              </li>
              <li>
                <strong>Q:</strong> 10 pontos
              </li>
              <li>
                <strong>K:</strong> 10 pontos
              </li>
            </ul>
          </Text>
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
