import "../styles/globals.css";
import "../styles/general-styles.css";
import "../styles/details.css";
import "../styles/footer.css";
import "../styles/header.css";

import { episodeDetailsCard } from "../components/episodeDetailsCard.js";
import { characterDetailsCard } from "../components/characterDetailsCard.js";
import { locationDetailsCard } from "../components/locationDetailsCard.js";
import {
  fetchCatchedElement,
  fetchCatchedElements,
} from "../utils/fetchCartchedElement.js";
import { fetchElement } from "../utils/fetchElement.js";
const currentURL = window.location.href;
const urlParams = new URLSearchParams(currentURL.split("?")[1]);
const id = urlParams.get("id");
const type = urlParams.get("type");
const containerEl = document.querySelector(".details-container");

async function initialize_page() {
  let data = fetchCatchedElements([[type, id]]);
  if (data === null) {
    data = await fetchElement(type, id);
  }
  console.log("data:", data);
  displayDetails(data[0]);
}

function displayDetails(data) {
  if (!data) {
    containerEl.innerHTML = "<p>Error fetching details.</p>";
    return;
  }
  switch (type) {
    case "character":
      containerEl.appendChild(characterDetailsCard(data));

      break;
    case "episode":
      containerEl.appendChild(episodeDetailsCard(data));
      break;
    case "location":
      containerEl.appendChild(locationDetailsCard(data));
      break;
    default:
      containerEl.innerHTML = "<p>Unknown type.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initialize_page();
});
