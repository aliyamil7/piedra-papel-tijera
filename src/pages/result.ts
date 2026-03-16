import { state } from "../state";
import styles from "./result.css?inline";

export function resultPage(): HTMLDivElement {
  const currentState = state.getState();

  const container = document.createElement("div");
  container.classList.add("result-container");

  const isPlayerWinner = currentState.gameWinner === "player";

  if (isPlayerWinner) {
    container.classList.add("win");
  } else {
    container.classList.add("lose");
  }

  // ESTRELLA
  const star = document.createElement("div");
  star.classList.add("result-star");
  star.textContent = isPlayerWinner ? "Ganaste" : "Perdiste";

  // SCORE BOX
  const scoreBox = document.createElement("div");
  scoreBox.classList.add("score-box");

  const scoreTitle = document.createElement("h2");
  scoreTitle.classList.add("score-title");
  scoreTitle.textContent = "Score";

  const playerScore = document.createElement("p");
  playerScore.classList.add("score-text");
  playerScore.textContent = `Vos: ${currentState.score.player}`;

  const computerScore = document.createElement("p");
  computerScore.classList.add("score-text");
  computerScore.textContent = `Máquina: ${currentState.score.computer}`;

  scoreBox.appendChild(scoreTitle);
  scoreBox.appendChild(playerScore);
  scoreBox.appendChild(computerScore);

  // BOTÓN
  const button = document.createElement("button");
  button.classList.add("play-again-button");
  button.textContent = "Volver a Jugar";

  button.addEventListener("click", () => {
    // Por ahora solo recarga la app
    // Más adelante lo reemplazamos por reset + router
    location.href = "/";
  });

  // ESTILOS
  const style = document.createElement("style");
  style.textContent = styles;

  container.appendChild(star);
  container.appendChild(scoreBox);
  container.appendChild(button);
  container.appendChild(style);

  return container;
}
