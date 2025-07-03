import { extractEndpointAndId } from "../utils/extractEndpointAndId";
import { fetchCatchedElements } from "../utils/fetchCartchedElement";
/**
 * Crea una tarjeta con los detalles del personaje
 * @param {object} character
 * @returns{HTMLDivElement} retorna un  elemeto div con la informacion del personaje
 */
export function characterDetailsCard(character) {
  const episodes = fetchCatchedElements(
    character.episode.map((e) => extractEndpointAndId(e))
  ).map((e) => {
    const itemEl = document.createElement("li");
    itemEl.classList.add("details-button");
    itemEl.innerHTML = `<a href="details.html?id=${e.id}&type=episode" class="details-button">${e.name}</a>`;
    return itemEl;
  });
  const lista = document.createElement("ul");
  episodes.forEach((e) => {
    lista.appendChild(e);
  });

  let originId, originHTML;
  if (character.origin.url !== "") {
    originId = extractEndpointAndId(character.origin.url)[1];
    originHTML = `<a href="details.html?id=${originId}&type=location" >${character.origin.name}</a>`;
  } else {
    originId = "";
    originHTML = `${character.origin.name}`;
  }
  let residenceId, residenceHTML;
  if (character.location.url !== "") {
    console.log("url -> ", character.location.url);
    [, residenceId] = extractEndpointAndId(character.location.url);
    residenceHTML = `<a href="details.html?id=${residenceId}&type=location" >${character.location.name}</a>`;
  } else {
    residenceId = "";
    residenceHTML = `${character.location.name}`;
  }
  /*  */
  const contenedorDetallesEl = document.createElement("div");
  contenedorDetallesEl.classList.add("character-details");
  contenedorDetallesEl.innerHTML = `
  <div class="character-own-details">
  <img src="${character.image}" alt="${character.name}"></img>
  <p>Nombre: ${character.name}
  <br>Estado: ${character.status}
  <br>Especie: ${character.species}
  <br>Genero: ${character.gender}
  <br>Origen: ${originHTML}
  <br>Locacion: ${residenceHTML}</p>
  </div>
  
  <h2>Episodios en los que aparece ${character.name} (${character.episode.length}):</h2>`;
  contenedorDetallesEl.appendChild(lista);
  return contenedorDetallesEl;
}
