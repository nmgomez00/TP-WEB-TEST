import { API_INFO } from "../api/constantes";
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

async function fetchElements(arr) {
  const promesas = [];
  for (let i = 0; i < arr.length; i++) {
    promesas.push(
        /*
      fetch(API_INFO.API_URL + arr[i][0] + "/" + arr[i][1]).then((res) => {
        if (!res.ok) {
          console.error(`HTTP error! status: ${res.status}`);
          return null;
        }
        return res.json();
      })*/
     fetchElement(arr[i][0],arr[i][1])
    );
  }
  const elements = await Promise.all(promesas);
  return elements;
}
