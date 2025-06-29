import "./style.css";
//para ordenar hay que fetchear todos los personajes y luego ordenarlos
const API_URL = "https://rickandmortyapi.com/api/";
const API_CACHE_KEY = "rick-and-morty-data-cache";
const PAGE_SIZE = 20; // Número de personajes por página
let APIElements = []; // Array para almacenar los personajes

// Elementos del DOM
const form = document.getElementById("character-form");
// Pagination
const firstBtn = document.getElementById("first-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const lastBtn = document.getElementById("last-btn");
const paginationNumberEl = document.getElementById("pagination-number");

let paginationState = {
  count: 0,
  from: 0,
  to: 0,
};
// Cargamos los datos al despues de que el DOM se haya cargado
document.addEventListener("DOMContentLoaded", () => {
  getCatchedData(API_URL + "character");
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#character-name");
  const orderByNameCheckbox = document.querySelector("#order-by-name");

  const query = searchInput.value.trim().toLowerCase();
  if (query === "") {
    APIElements = JSON.parse(localStorage.getItem(API_CACHE_KEY)).data.results;
  } else {
    APIElements = JSON.parse(
      localStorage.getItem(API_CACHE_KEY)
    ).data.results.filter((character) =>
      character.name.toLowerCase().includes(query)
    );
  }
  if (orderByNameCheckbox.checked) {
    APIElements.sort((a, b) => a.name.localeCompare(b.name));
  }
  displayCharacters(0, PAGE_SIZE);
  setPaginationState(APIElements.length, 0, PAGE_SIZE);
  updatePagination();
});

async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    displayCharacters([]);
    updatePagination({ page: 1, pages: 1, prev: null, next: null });
    console.error(`HTTP error! status: ${res.status}`);
  } else {
    const data = await res.json();
    let resNext = null;
    let nextData = null;
    // Guardamos todos los datos en un array para poder ordenarlos
    while (data.info.next !== null) {
      console.log("data.info.next: ", data.info.next);
      resNext = await fetch(data.info.next);
      if (!resNext.ok) {
        console.error(`HTTP error! status: ${resNext.status}`);
        break;
      }
      nextData = await resNext.json();
      // concatenamos los resultados de la siguiente página
      data.results = data.results.concat(nextData.results);
      // actualizamos la url para la siguiente iteración
      data.info.next = nextData.info.next;
      data.info.prev = nextData.info.prev;
    }
    // Guardamos los datos en el localStorage para no sobrecargar la API
    localStorage.setItem(
      API_CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data: data,
      })
    );
    APIElements = data.results;
    displayCharacters(0, 20);
    // Actualizamos el estado de la paginación
    console.log(data);
  }
}
function getCatchedData(url) {
  if (localStorage.getItem(API_CACHE_KEY)) {
    const APICached = JSON.parse(localStorage.getItem(API_CACHE_KEY));
    const cacheAge = Date.now() - APICached.timestamp;
    const data = APICached.data;
    // Si el caché es menor a 1 hora, usamos los datos del caché
    if (cacheAge < 3600000) {
      console.log("Usando datos del caché");
      APIElements = data.results;
      setPaginationState(data.info.count, 1, PAGE_SIZE);
      updatePagination();
      displayCharacters(0, 20);
      console.log(data);
      return;
    } else {
      console.log("Caché expirado, obteniendo nuevos datos");
      localStorage.removeItem(API_CACHE_KEY);
      console.log(`Obteniendo datos...`);
      fetchData(url);
    }
  } else {
    console.log(`Obteniendos datos...`);
    fetchData(url);
  }
}

function displayCharacters(from, to) {
  console.log(
    `Mostrando personajes del ${from} al ${to} de un total de ${APIElements.length}`
  );
  const containerEl = document.querySelector(".character-container");

  containerEl.innerHTML = "";
  if (APIElements.length === 0) {
    containerEl.innerHTML = `<p>No se encontraron personajes</p>`;
  }
  if (to > APIElements.length) {
    to = APIElements.length;
  }
  if (from < 0) {
    from = 0;
  }
  // mostramos los personajes en el contenedor

  for (let i = from; i < to; i++) {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <img src=${APIElements[i].image} alt="imagen de ${APIElements[i].name}">
      <h3>${APIElements[i].name}</h3> `;
    containerEl.appendChild(card);
  }
  /*
  characters.forEach(({ image, name }) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <img src=${image} alt="imagen de ${name}">
      <h3>${name}</h3> `;
    containerEl.appendChild(card);
  });
  */
}

let setPaginationState = (count, from, to) => {
  if (to > APIElements.length) {
    to = APIElements.length;
  }
  if (from < 0) {
    from = 0;
  }
  paginationState.count = count;
  paginationState.from = from;
  paginationState.to = to;
};
//se puede refactorizar el código de updatePagination para que no se repita el código de la url
const updatePagination = () => {
  if (paginationState.from > 0) {
    // seteamos la url del primer botón

    firstBtn.onclick = () => {
      displayCharacters(0, PAGE_SIZE);
      setPaginationState(paginationState.count, 0, PAGE_SIZE);
      updatePagination();
    };
    prevBtn.onclick = () => {
      displayCharacters(paginationState.from - PAGE_SIZE, paginationState.from);
      setPaginationState(
        paginationState.count,
        paginationState.from - PAGE_SIZE,
        paginationState.from
      );
      updatePagination();
    };

    firstBtn.disabled = false;
    prevBtn.disabled = false;
  } else {
    firstBtn.disabled = true;
    prevBtn.disabled = true;
  }

  if (paginationState.to < paginationState.count) {
    nextBtn.onclick = () => {
      displayCharacters(paginationState.to, paginationState.to + PAGE_SIZE);
      setPaginationState(
        paginationState.count,
        paginationState.to,
        paginationState.to + PAGE_SIZE
      );
      updatePagination();
    };
    lastBtn.onclick = () => {
      displayCharacters(
        paginationState.count - PAGE_SIZE,
        paginationState.count
      );
      setPaginationState(
        paginationState.count,
        paginationState.count - PAGE_SIZE,
        paginationState.count
      );
      updatePagination();
    };
    nextBtn.disabled = false;
    lastBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
    lastBtn.disabled = true;
  }
  paginationNumberEl.textContent = `${Math.ceil(
    paginationState.to / PAGE_SIZE
  )}/${Math.ceil(paginationState.count / PAGE_SIZE)}`;
};
