import styles from "./button.css?inline";

export function initButton() {
  class Button extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const text = this.getAttribute("text") || "Botón";

      this.shadow.innerHTML = `
        <style>${styles}</style>
        <div class="container-button">
          <button class="button">${text}</button>
        </div>
      `;
    }
  }

  customElements.define("custom-button", Button);
}
