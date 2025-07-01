import { fetchData } from "./fetchData";
import { fetchCatchedData } from "./fetchCatchedData";
const API_INFO = Object.freeze({
  API_URL: "https://rickandmortyapi.com/api/",
  API_CHARACTER_ENDPOINT: "character",
  API_EPISODE_ENDPOINT: "episode",
  API_LOCATION_ENDPOINT: "location",
  API_CACHE_KEY_PERSONAJES: "rick-and-morty-data-personajes",
  API_CACHE_KEY_EPISODIOS: "rick-and-morty-data-episodios",
  API_CACHE_KEY_LOCACIONES: "rick-and-morty-data-locaciones",
});
export async function getData(type) {
  let APIElements = [];
  const [API_CACHE_KEY, API_ENDPOINT] = (() => {
    switch (type) {
      case "character":
        return [
          API_INFO.API_CACHE_KEY_PERSONAJES,
          API_INFO.API_CHARACTER_ENDPOINT,
        ];
      case "episode":
        return [
          API_INFO.API_CACHE_KEY_EPISODIOS,
          API_INFO.API_EPISODE_ENDPOINT,
        ];
      case "location":
        return [
          API_INFO.API_CACHE_KEY_LOCACIONES,
          API_INFO.API_LOCATION_ENDPOINT,
        ];
      default:
        return [
          API_INFO.API_CACHE_KEY_PERSONAJES,
          API_INFO.API_CHARACTER_ENDPOINT,
        ];
    }
  })();

  console.log(
    "Obteniendo datos de la API o del caché de tipo",
    API_ENDPOINT,
    " o cache:",
    API_CACHE_KEY
  );
  const cachedData = fetchCatchedData(API_CACHE_KEY);
  if (cachedData) {
    console.log("Datos obtenidos del caché:", cachedData);
    APIElements = cachedData.results;
    console.log("Datos obtenidos del caché");
  } else {
    // Si no hay caché, hacemos una petición a la API
    console.log("Obteniendo datos de la API...");
    const data = await fetchData(API_INFO.API_URL + API_ENDPOINT);
    if (data) {
      APIElements = data.results;
      localStorage.setItem(
        API_CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data })
      );
      console.log("Datos guardados en el caché");
    } else {
      console.error("Error al obtener los datos de la API");
      return null;
    }
  }
  return APIElements;
}
