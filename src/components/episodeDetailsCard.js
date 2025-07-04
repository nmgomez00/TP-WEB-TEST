import { extractEndpointAndId } from "../utils/extractEndpointAndId";
import { fetchCatchedElements } from "../utils/fetchCartchedElement";

/**
 * Crea una tarjeta con los detalles de un episodio
 * @param {object} episode es un objeto con la informacion especifca del episodio, y un
 * array con la endpoint a los personajes que aparecen en dicho episodio.
 * @returns{HTMLDivElement} retorna un  elemeto div con la informacion del episodio y
 * los personajes que aparecieron.
 */
export function episodeDetailsCard(episode) {
  const characters = fetchCatchedElements(
    episode.characters.map((e) => extractEndpointAndId(e))
  ).map((e) => {
    const itemEl = document.createElement("li");
    itemEl.innerHTML = `<a href="details.html?id=${e.id}&type=character" class="details-button">${e.name}</a> `;
    return itemEl;
  });
  const lista = document.createElement("ul");
  characters.forEach((e) => {
    lista.appendChild(e);
  });
  const contenedorDetallesEl = document.createElement("div");
  contenedorDetallesEl.classList.add("episode-details");

  contenedorDetallesEl.innerHTML = `
  <div class="episode-own-details">
  
  <h2>${episode.name} - ${episode.episode} </h2>
  <h2>Fecha de estreno: ${episode.air_date}</h2>

  <h2>Personajes que aparecen en el episodio (${episode.characters.length}):</h2>
  </div>`;
  contenedorDetallesEl.appendChild(lista);
  return contenedorDetallesEl;
}
