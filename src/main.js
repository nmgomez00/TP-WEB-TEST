import "./styles/globals.css";
import "./styles/general-styles.css";
import "./styles/index.css";
import "./styles/footer.css";
import "./styles/header.css";

import { displayListOfCards } from "./utils/displayListOfCards";
import { updatePagination } from "./utils/paginationLogic";
import { getData } from "./utils/getData";

const PAGE_SIZE = 20; // Número de personajes por página
let APIElements = []; // Array para almacenar los personajes

// Elementos del DOM
const form = document.getElementById("search-form");
const typeOfContentSelect = document.querySelector("#type-of-content");

async function initializePage() {
  // Intentamos obtener los datos del caché o de la API
  const TYPE_OF_CONTENT = "character"; // Tipo de contenido por defecto
  APIElements = await getData(TYPE_OF_CONTENT);

  // Inicializamos la paginación y mostramos los primeros personajes
  displayListOfCards(APIElements, TYPE_OF_CONTENT, 0, PAGE_SIZE);
  updatePagination(APIElements, TYPE_OF_CONTENT, {
    count: APIElements.length,
    from: 0,
    to: PAGE_SIZE,
    page_size: PAGE_SIZE,
  });
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#character-name");
  const orderByNameCheckbox = document.querySelector("#order-by-name");
  const genderSelect = document.querySelector("#gender");
  const statusSelect = document.querySelector("#status");

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
  if (TYPE_OF_CONTENT == "character") {
    const gender = genderSelect.value;
    const status = statusSelect.value;

    switch (gender) {
      case "All":
        break;
      case "Male":
      case "Female":
        APIElements = APIElements.filter((e) => e.gender == gender);
        break;
      case "Other":
        APIElements = APIElements.filter((e) => {
          return e.gender !== "Male" && e.gender !== "Female";
        });
        break;
      default:
        break;
    }
    switch (status) {
      case "Dead":
      case "Alive":
        APIElements = APIElements.filter((e) => e.status === status);
        break;
      case "Unknown":
        APIElements = APIElements.filter(
          (e) => e.status !== "Alive" && e.status !== "Dead"
        );
        break;
      default:
        break;
    }
  }
  displayListOfCards(APIElements, TYPE_OF_CONTENT, 0, PAGE_SIZE);
  updatePagination(APIElements, TYPE_OF_CONTENT, {
    count: APIElements.length,
    from: 0,
    to: PAGE_SIZE,
    page_size: PAGE_SIZE,
  });
});

typeOfContentSelect.addEventListener("change", () => {
  const genderSelect = document.querySelector("#gender");
  const statusSelect = document.querySelector("#status");
  const statusLabel = document.getElementById("status-label");
  const genderLabel = document.getElementById("gender-label");

  const TYPE_OF_CONTENT = typeOfContentSelect.value;
  if (TYPE_OF_CONTENT == "character") {
    genderSelect.classList.remove("hidden");
    statusSelect.classList.remove("hidden");

    statusLabel.classList.remove("hidden");
    genderLabel.classList.remove("hidden");
  } else {
    genderSelect.classList.add("hidden");
    statusSelect.classList.add("hidden");

    statusLabel.classList.add("hidden");
    genderLabel.classList.add("hidden");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("rick-and-morty-data-personajes");
  initializePage();
});
