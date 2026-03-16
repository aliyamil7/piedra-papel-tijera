import { initTitle } from "../components/title";
import { initButton } from "../components/button";
import { initHands } from "../components/hands";
import styles from "./play.css?inline";

export function playPage(): HTMLElement {
  initTitle();
  initButton();
  initHands();

  const container = document.createElement("div");
  container.classList.add("play-container");

  const title = document.createElement("custom-title");
  title.setAttribute(
    "text",
    "Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos",
  );
  title.setAttribute("variant", "play");

  const button = document.createElement("custom-button");
  button.setAttribute("text", "¡Jugar!");

  const hands = document.createElement("custom-hands");
  hands.setAttribute("text", "");

  const style = document.createElement("style");
  style.textContent = styles;
  container.appendChild(style);

  container.appendChild(title);
  container.appendChild(button);
  container.appendChild(hands);

  return container;
}
