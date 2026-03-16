import { initTitle } from "../components/title";
import { initButton } from "../components/button";
import { initHands } from "../components/hands";

export function welcomePage(): HTMLElement {
  initTitle();
  initButton();
  initHands();

  const container = document.createElement("div");

  const title = document.createElement("custom-title");
  title.setAttribute("text", "Piedra<br>Papel<br>Tijera");

  const button = document.createElement("custom-button");
  button.setAttribute("text", "Empezar");

  button.addEventListener("click", () => {
    location.hash = "/game";
  });

  const hands = document.createElement("custom-hands");
  hands.setAttribute("text", "");

  container.appendChild(title);
  container.appendChild(button);
  container.appendChild(hands);

  return container;
}
