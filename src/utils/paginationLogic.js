import { displayListOfCards } from "./displayListOfCards";
const firstBtn = document.getElementById("first-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const lastBtn = document.getElementById("last-btn");
const paginationNumberEl = document.getElementById("pagination-number");

export let paginationState = {
  count: 0,
  from: 0,
  to: 0,
  page_size: 20,
};

/**
 * Actualiza el estado y los eventos de los botones de la paginacion
 * @param {object} elements lista de elementos de un tipo especifico
 * @param {*} type_of_content  tipo de los elementos
 * @param {*} newPaginationState  nuevo estado de la paginacion
 */
export function updatePagination(
  elements,
  type_of_content,
  newPaginationState
) {
  if (!(newPaginationState === null || newPaginationState === undefined)) {
    if (newPaginationState.to > newPaginationState.count) {
      newPaginationState.to = newPaginationState.count;
    }
    if (newPaginationState.from < 0) {
      newPaginationState.from = 0;
    }
    paginationState = newPaginationState;
  }

  if (paginationState.from > 0) {
    firstBtn.onclick = () => {
      displayListOfCards(
        elements,
        type_of_content,
        0,
        paginationState.page_size
      );
      updatePagination(elements, type_of_content, {
        count: paginationState.count,
        from: 0,
        to: paginationState.page_size,
        page_size: paginationState.page_size,
      });
    };
    prevBtn.onclick = () => {
      displayListOfCards(
        elements,
        type_of_content,
        paginationState.from - paginationState.page_size,
        paginationState.from
      );
      updatePagination(elements, type_of_content, {
        count: paginationState.count,
        from: paginationState.from - paginationState.page_size,
        to: paginationState.from,
        page_size: paginationState.page_size,
      });
    };

    firstBtn.disabled = false;
    prevBtn.disabled = false;
  } else {
    firstBtn.disabled = true;
    prevBtn.disabled = true;
  }

  if (paginationState.to < paginationState.count) {
    nextBtn.onclick = () => {
      displayListOfCards(
        elements,
        type_of_content,
        paginationState.to,
        paginationState.to + paginationState.page_size
      );

      updatePagination(elements, type_of_content, {
        count: paginationState.count,
        from: paginationState.to,
        to: paginationState.to + paginationState.page_size,
        page_size: paginationState.page_size,
      });
    };
    lastBtn.onclick = () => {
      displayListOfCards(
        elements,
        type_of_content,
        paginationState.count -
          (paginationState.count % paginationState.page_size),
        paginationState.count
      );
      updatePagination(elements, type_of_content, {
        count: paginationState.count,
        from:
          paginationState.count -
          (paginationState.count % paginationState.page_size),
        to: paginationState.count,
        page_size: paginationState.page_size,
      });
    };
    nextBtn.disabled = false;
    lastBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
    lastBtn.disabled = true;
  }
  paginationNumberEl.textContent = `${Math.ceil(
    paginationState.to / paginationState.page_size
  )}/${Math.ceil(paginationState.count / paginationState.page_size)}`;
}
