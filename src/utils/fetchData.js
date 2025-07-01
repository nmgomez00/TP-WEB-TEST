export async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`HTTP error! status: ${res.status}`);
    return null;
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

    return data;
  }
}
