import styles from "./title.css?inline";

export function initTitle() {
  class Title extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const text = this.getAttribute("text") || "";
      const variant = this.getAttribute("variant") || "welcome";

      this.shadow.innerHTML = `
        <style>${styles}</style>
        <div class="container-title ${variant}">
          <h1 class="title">${text}</h1>
        </div>
      `;
    }
  }

  console.log(styles);

  customElements.define("custom-title", Title);
}
