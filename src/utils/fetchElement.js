import { API_INFO } from "../api/constantes";
/**
 * dado un tipo de elemento y su id devuelve el elemento JSON
 * @param {string} type
 * @param {number} id
 * @returns  JSON o null
 */
export async function fetchElement(type, id) {
  try {
    const response = await fetch(`${API_INFO.API_URL}${type}/${id}`);
    if (!response.ok) {
      throw new Error(`error HTTP! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching detalles:", error);
    return null;
  }
}
/**
 *  dado un array de tipos y id, devuelve otro array de JSON representando elementos de cierto tipo
 * @param {*} arr array de arrays cuyos elementos son tipo y id
 * @returns array de JSON de elementos
 */
export async function fetchElements(arr) {
  const promesas = [];
  for (let i = 0; i < arr.length; i++) {
    promesas.push(
      /*
      fetch(API_INFO.API_URL + arr[i][0] + "/" + arr[i][1]).then((res) => {
        if (!res.ok) {
          console.error(`error HTTP! status: ${res.status}`);
          return null;
        }
        return res.json();
      })*/
      fetchElement(arr[i][0], arr[i][1])
    );
  }
  const elements = await Promise.all(promesas);
  return elements;
}
