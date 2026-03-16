import { initHands } from "../components/hands";
import { state } from "../state";
import styles from "./game.css?inline";

import tijera from "../images/tijera.png";
import piedra from "../images/piedra.png";
import papel from "../images/papel.png";

function getHandImage(move: "piedra" | "papel" | "tijera"): string {
  if (move === "piedra") {
    return piedra;
  }

  if (move === "papel") {
    return papel;
  }

  return tijera;
}

export function gamePage(): HTMLDivElement {
  initHands();

  const container = document.createElement("div");
  container.classList.add("game-container");

  let seconds = 3;

  // CONTADOR
  const counter = document.createElement("h1");
  counter.classList.add("counter");
  counter.textContent = seconds.toString();
  container.appendChild(counter);

  // MANO DE LA COMPUTADORA (arriba)
  const computerHandContainer = document.createElement("div");
  computerHandContainer.classList.add("computer-hand-container");
  container.appendChild(computerHandContainer);

  // RESULTADO DE LA RONDA + SCORE
  const roundResultContainer = document.createElement("div");
  roundResultContainer.classList.add("round-result-container");

  const roundResultText = document.createElement("p");
  roundResultText.classList.add("round-result-text");
  roundResultText.textContent = "";

  const scoreText = document.createElement("p");
  scoreText.classList.add("score-text");

  const initialState = state.getState();
  scoreText.textContent = `Jugador: ${initialState.score.player} - Compu: ${initialState.score.computer}`;

  roundResultContainer.appendChild(roundResultText);
  roundResultContainer.appendChild(scoreText);

  container.appendChild(roundResultContainer);

  // CONTENEDOR DEL JUGADOR (abajo)
  const playerHandContainer = document.createElement("div");
  playerHandContainer.classList.add("player-hand-container");

  // AL PRINCIPIO se muestran las 3 manos para elegir
  const hands = document.createElement("custom-hands");
  playerHandContainer.appendChild(hands);

  container.appendChild(playerHandContainer);

  // ESTILOS
  const style = document.createElement("style");
  style.textContent = styles;
  container.appendChild(style);

  const interval = setInterval(() => {
    seconds--;

    if (seconds === 0) {
      clearInterval(interval);

      // El contador sigue ocupando lugar, pero invisible
      counter.style.visibility = "hidden";

      const playerMove = hands.getAttribute("selected-hand");

      if (playerMove) {
        // 1) Mostrar SOLO la mano elegida del jugador
        playerHandContainer.innerHTML = "";

        const playerHand = document.createElement("img");
        playerHand.classList.add("player-hand");
        playerHand.src = getHandImage(
          playerMove as "piedra" | "papel" | "tijera",
        );
        playerHand.alt = playerMove;

        playerHandContainer.appendChild(playerHand);

        // 2) Guardar la jugada del jugador
        state.setPlayerMove(playerMove as "piedra" | "papel" | "tijera");

        // 3) La compu elige random
        state.generateComputerMove();

        // 4) Jugar la ronda
        const roundResult = state.playRound();

        // 5) Leer el estado actual
        const currentState = state.getState();

        console.log("Jugador:", currentState.currentGame.playerMove);
        console.log("Computadora:", currentState.currentGame.computerMove);
        console.log("Resultado de la ronda:", roundResult);
        console.log("Score:", currentState.score);
        console.log("Ganador del juego:", currentState.gameWinner);

        // 6) Mostrar resultado de la ronda
        if (roundResult === "player") {
          roundResultText.textContent = "Ganaste la ronda 🎉";
        } else if (roundResult === "computer") {
          roundResultText.textContent = "Perdiste la ronda 😢";
        } else {
          roundResultText.textContent = "Empate 🤝";
        }

        // 7) Mostrar score actualizado
        scoreText.textContent = `Jugador: ${currentState.score.player} - Compu: ${currentState.score.computer}`;

        // 8) Mostrar la mano de la computadora arriba
        const computerMove = currentState.currentGame.computerMove;

        if (computerMove) {
          const computerHand = document.createElement("img");
          computerHand.classList.add("computer-hand");
          computerHand.src = getHandImage(computerMove);
          computerHand.alt = computerMove;

          computerHandContainer.innerHTML = "";
          computerHandContainer.appendChild(computerHand);
        }

        // 9) Después del reveal, decidir a dónde ir
        setTimeout(() => {
          const root = document.querySelector("#root");

          if (!root) return;

          root.innerHTML = "";

          if (currentState.gameWinner) {
            location.hash = "/result";
          } else {
            root.appendChild(gamePage());
          }
        }, 1500);
      } else {
        console.log("No elegiste ninguna mano");

        // Si no eligió ninguna mano, reinicia la ronda
        setTimeout(() => {
          const root = document.querySelector("#root");

          if (!root) return;

          root.innerHTML = "";
          root.appendChild(gamePage());
        }, 1000);
      }

      return;
    }

    counter.textContent = seconds.toString();
  }, 1000);

  return container;
}
