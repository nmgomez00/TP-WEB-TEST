import { API_INFO } from "../api/constantes";
export function fetchCatchedElement(type, id) {
  if (!id || !type) {
    console.log("Datos invalidos");
    return;
  }
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

  const cachedData = JSON.parse(
    localStorage.getItem(API_INFO.API_URL + API_ENDPOINT)
  ).data.results.find((element) => element.id === parseInt(id));
  if (cachedData) {
    console.log("Datos obtenidos del caché:", cachedData);
    return cachedData;
  }
  return null;
}
export function fetchCatchedElements(arr) {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i][0], " ", arr[i][1]);
    results.push(fetchCatchedElement(arr[i][0], arr[i][1]));
  }
  return results;
}
