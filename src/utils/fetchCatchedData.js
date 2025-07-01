export function fetchCatchedData(key) {
  if (localStorage.getItem(key)) {
    const APICached = JSON.parse(localStorage.getItem(key));
    const cacheAge = Date.now() - APICached.timestamp;
    const data = APICached.data;
    // Si el caché es menor a 1 hora, usamos los datos del caché
    if (cacheAge < 3600000) {
      console.log("Usando datos del caché");

      return data;
    } else {
      console.log("Caché expirado, obteniendo nuevos datos");
      localStorage.removeItem(key);
      console.log(`Obteniendo datos...`);
      return null;
    }
  } else {
    console.log(`Obteniendos datos...`);
    return null;
  }
}
