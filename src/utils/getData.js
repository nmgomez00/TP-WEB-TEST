import { fetchData } from "./fetchData";
import { fetchCatchedData } from "./fetchCatchedData";
import { API_INFO } from "../api/constantes";
/**
 * Dado un tipo de elemento devuelve una lista de todos ellos buscandolos
 *  en el cache o haciendo peticiones
 * @param {string} type tipo de elemento
 * @returns  lista de JSON
 */
export async function getData(type) {
  let APIElements = [];
  const API_ENDPOINT = (() => {
    switch (type) {
      case "character":
        return API_INFO.API_CHARACTER_ENDPOINT;

      case "episode":
        return API_INFO.API_EPISODE_ENDPOINT;

      case "location":
        return API_INFO.API_LOCATION_ENDPOINT;

      default:
        return API_INFO.API_CHARACTER_ENDPOINT;
    }
  })();

  console.log(
    "Obteniendo datos de la API o del caché de tipo",
    API_ENDPOINT,
    " o cache:"
  );
  const cachedData = fetchCatchedData(API_INFO + API_ENDPOINT);
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
        API_INFO.API_URL + API_ENDPOINT,
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
