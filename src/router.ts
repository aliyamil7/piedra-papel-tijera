import { welcomePage } from "./pages/welcome";
import { gamePage } from "./pages/game";
import { resultPage } from "./pages/result";

const routes: Record<string, () => HTMLElement> = {
  "/welcome": welcomePage,
  "/game": gamePage,
  "/result": resultPage,
};

export function initRouter(container: Element) {
  function renderRoute() {
    const currentPath = location.hash.slice(1) || "/welcome";

    const page = routes[currentPath] || welcomePage;

    container.innerHTML = "";
    container.appendChild(page());
  }

  window.addEventListener("hashchange", renderRoute);

  renderRoute();
}
