/**
 * Dada un string devuelve los todos datos de cierto tipo o null
 * @param {string} url endpoint de todos los elementos de un tipo (/episodio, /character o /location)
 * @returns  null o los datos dependiendo si fue o no exitosa la peticion
 */
export async function fetchData(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return null;
    } else {
      const data = await res.json();
      const pages = data.info.pages;
      console.log("getting data from url: ", url, "pages: ", pages);
      // Si hay más de una página, hacemos peticiones a las siguientes páginas
      if (pages > 1) {
        let promesas = [];
        for (let i = 2; i <= pages; i++) {
          promesas.push(
            fetch(`${url}/?page=${i}`).then((res) => {
              if (!res.ok) {
                console.error(`HTTP error! status: ${res.status}`);
                return null;
              }
              return res.json();
            })
          );
        }
        const restoDeResultados = await Promise.all(promesas);
        console.log("restoDeResultados: ", restoDeResultados);
        data.results = data.results.concat(
          restoDeResultados.flatMap((item) => item.results)
        );
      }
      console.log("data: ", data);
      return data;
    }
  } catch (error) {
    console.error("No se pudo traer los datos", error);
    return null;
  }
}
