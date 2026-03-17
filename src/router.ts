import { welcomePage } from "./pages/welcome";
import { gamePage } from "./pages/game";
import { resultPage } from "./pages/result";

// Definimos las rutas sin la barra diagonal para evitar confusiones de URL
const routes: Record<string, () => HTMLElement> = {
  welcome: welcomePage,
  game: gamePage,
  result: resultPage,
};

export function initRouter(container: Element) {
  function renderRoute() {
    // 1. Obtenemos lo que viene después del '#' (slice(1))
    // 2. Quitamos la '/' inicial si existe (replace) para que coincida con nuestro objeto routes
    const currentPath = location.hash.slice(1).replace(/^\//, "") || "welcome";

    // Buscamos la página; si no existe, por defecto va a welcome
    const page = routes[currentPath] || welcomePage;

    // Limpiamos el contenedor y renderizamos la nueva página
    container.innerHTML = "";
    container.appendChild(page());
  }

  // Escuchamos el cambio de hash en la URL
  window.addEventListener("hashchange", renderRoute);

  // Ejecutamos una vez al cargar para mostrar la página inicial
  renderRoute();
}
