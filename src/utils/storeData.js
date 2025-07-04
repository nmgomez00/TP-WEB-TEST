import { fetchData } from "./fetchData";
import { API_INFO } from "../api/constantes";

/**
 * guarda los datos en el local storage si no se encuentra ahi anteriormente
 * @param {string} type  tipo de dato
 * @returns devueve true si los datos estan o se guardaron o false en caso contrario
 */
export async function storeData(type) {
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
  if (localStorage.getItem(API_INFO.API_URL + API_ENDPOINT)) {
    return true;
  } else {
    const data = await fetchData(API_INFO.API_URL + API_ENDPOINT);
    if (data) {
      APIElements = data.results;
      localStorage.setItem(
        API_INFO.API_URL + API_ENDPOINT,
        JSON.stringify({ timestamp: Date.now(), data })
      );
      //console.log("Datos guardados en el caché");
      return true;
    } else {
      //console.error("Error al obtener los datos de la API");
      return false;
    }
  }
}
