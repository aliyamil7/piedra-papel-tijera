import tijera from "../images/tijera.png";
import piedra from "../images/piedra.png";
import papel from "../images/papel.png";
import styles from "./hands.css?inline";

export function initHands() {
  class Hands extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
    }

    render() {
      this.shadow.innerHTML = `
        <style>
          ${styles}

          .hand {
            cursor: pointer;
            transition: transform 0.2s ease;
          }

          .hand.selected {
            transform: translateY(-30px);
          }
        </style>

        <div class="hands-container">
          <img class="hand tijera" src="${tijera}" alt="Tijera" />
          <img class="hand piedra" src="${piedra}" alt="Piedra" />
          <img class="hand papel" src="${papel}" alt="Papel" />
        </div>
      `;

      const tijeraEl = this.shadow.querySelector(".tijera") as HTMLImageElement;
      const piedraEl = this.shadow.querySelector(".piedra") as HTMLImageElement;
      const papelEl = this.shadow.querySelector(".papel") as HTMLImageElement;

      const selectHand = (move: string, element: HTMLImageElement) => {
        // saco selección de todas
        tijeraEl.classList.remove("selected");
        piedraEl.classList.remove("selected");
        papelEl.classList.remove("selected");

        // marco la elegida
        element.classList.add("selected");

        // guardo la jugada elegida
        this.setAttribute("selected-hand", move);

        console.log("Elegiste:", move);
      };

      tijeraEl.addEventListener("click", () => {
        selectHand("tijera", tijeraEl);
      });

      piedraEl.addEventListener("click", () => {
        selectHand("piedra", piedraEl);
      });

      papelEl.addEventListener("click", () => {
        selectHand("papel", papelEl);
      });
    }
  }

  if (!customElements.get("custom-hands")) {
    customElements.define("custom-hands", Hands);
  }
}
