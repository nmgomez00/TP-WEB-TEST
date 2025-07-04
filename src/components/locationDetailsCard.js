import { extractEndpointAndId } from "../utils/extractEndpointAndId";
import { fetchCatchedElements } from "../utils/fetchCartchedElement";
/**
 * Crea una tarjeta con los detalles de un locacion
 * @param {object} episode es un objeto con la informacion especifca del locacion, y un
 * array con la endpoint a los personajes que residen en dicha locacion.
 * @returns{HTMLDivElement} retorna un  elemeto div con la informacion la locacion y residentes.
 */
export function locationDetailsCard(location) {
  let characters = [];
  if (location.residents.length !== 0) {
    characters = fetchCatchedElements(
      location.residents.map((e) => extractEndpointAndId(e))
    ).map((e) => {
      const itemEl = document.createElement("li");
      itemEl.innerHTML = `<a href="details.html?id=${e.id}&type=character" class="details-button"" >${e.name}</a>`;
      return itemEl;
    });
  } else {
    const itemEl = document.createElement("li");
    itemEl.innerHTML = `No hay residentes`;
    characters = [itemEl];
  }

  const lista = document.createElement("ul");
  characters.forEach((e) => {
    lista.appendChild(e);
  });

  const contenedorDetallesEl = document.createElement("div");
  contenedorDetallesEl.classList.add("location-details");
  contenedorDetallesEl.innerHTML = `
  <div class="location-own-details">
  <h2> ${location.name} - ${location.type} </h2>
  <h2>Dimension: ${location.dimension}</h2>
  <h2>Residentes de ${location.name} (${location.residents.length}):</h2>
  </div>`;
  contenedorDetallesEl.appendChild(lista);
  return contenedorDetallesEl;
}
