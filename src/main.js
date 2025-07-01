import "./style.css";
import { fetchData } from "./utils/fetchData";
import { fetchCatchedData } from "./utils/fetchCatchedData";
import { displayContent } from "./utils/displayContent";
import { updatePagination } from "./utils/paginationLogic";
import { getData } from "./utils/getData";

//para ordenar hay que fetchear todos los personajes y luego
/*
const API_CACHE_KEY_PERSONAJES = "rick-and-morty-data-personajes";
const API_CACHE_KEY_EPISODIOS = "rick-and-morty-data-episodios";
const API_CACHE_KEY_LOCACIONES = "rick-and-morty-data-locaciones";*/

const PAGE_SIZE = 20; // Número de personajes por página
let APIElements = []; // Array para almacenar los personajes

// Elementos del DOM
const form = document.getElementById("character-form");

async function initializePage() {
  // Intentamos obtener los datos del caché o de la API
  const TYPE_OF_CONTENT = "character"; // Tipo de contenido por defecto
  APIElements = await getData(TYPE_OF_CONTENT);

  // Inicializamos la paginación y mostramos los primeros personajes
  displayContent(APIElements, TYPE_OF_CONTENT, 0, PAGE_SIZE);
  updatePagination(APIElements, TYPE_OF_CONTENT, {
    count: APIElements.length,
    from: 0,
    to: PAGE_SIZE,
    page_size: PAGE_SIZE,
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initializePage();
});
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#character-name");
  const orderByNameCheckbox = document.querySelector("#order-by-name");
  const typeOfContentSelect = document.querySelector("#type-of-content");
  const TYPE_OF_CONTENT = typeOfContentSelect.value;

  const query = searchInput.value.trim().toLowerCase();
  APIElements = await getData(TYPE_OF_CONTENT);
  if (query === "") {
  } else {
    APIElements = APIElements.filter((character) =>
      character.name.toLowerCase().includes(query)
    );
  }
  if (orderByNameCheckbox.checked) {
    APIElements.sort((a, b) => a.name.localeCompare(b.name));
  }
  displayContent(APIElements, TYPE_OF_CONTENT, 0, PAGE_SIZE);
  updatePagination(APIElements, TYPE_OF_CONTENT, {
    count: APIElements.length,
    from: 0,
    to: PAGE_SIZE,
    page_size: PAGE_SIZE,
  });
});
