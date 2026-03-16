import { initRouter } from "./router";

function main() {
  const root = document.querySelector("#root");

  if (!root) return;

  initRouter(root);
}

main();
