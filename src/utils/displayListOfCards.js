export function displayListOfCards(arr, type_of_content, from, to) {
  console.log(
    `Mostrando elementos del ${from} al ${to} de un total de ${arr.length}`
  );
  const containerEl = document.querySelector(".cards-container");

  containerEl.innerHTML = "";
  if (arr.length === 0) {
    containerEl.innerHTML = `<p>No se encontraron elementos</p>`;
  }
  if (to > arr.length) {
    to = arr.length;
  }
  if (from < 0) {
    from = 0;
  }
  // mostramos los personajes en el contenedor

  for (let i = from; i < to; i++) {
    switch (type_of_content) {
      case "character":
        const card = document.createElement("div");
        card.className = "character-card";
        card.innerHTML = `
      <img src=${arr[i].image} alt="imagen de ${arr[i].name}">
      <h3>${arr[i].name}</h3> 
      <a href="details.html?id=${arr[i].id}&type=${type_of_content}" class="details-button">Ver detalles</a>`;
        containerEl.appendChild(card);
        break;
      case "episode":
        const episodeCard = document.createElement("div");
        episodeCard.className = "episode-card";
        episodeCard.innerHTML = `
          <h3>${arr[i].name}</h3>
          <p>Episodio: ${arr[i].episode}</p>
          <p>Fecha de emisión: ${arr[i].air_date}</p>
          <a href="details.html?id=${arr[i].id}&type=${type_of_content}" class="details-button">Personajes del episodio</a>`;
        containerEl.appendChild(episodeCard);
        break;
      case "location":
        const locationCard = document.createElement("div");
        locationCard.className = "location-card";
        locationCard.innerHTML = `
          <h3>${arr[i].name}</h3>
          <p>Tipo: ${arr[i].type}</p>
          <p>Dimensión: ${arr[i].dimension}</p>
          <a href="details.html?id=${arr[i].id}&type=${type_of_content}" class="details-button">Ver residentes</a>`;
        containerEl.appendChild(locationCard);
        break;
      default:
        console.error("Tipo de contenido no reconocido");
    }
  }
}
