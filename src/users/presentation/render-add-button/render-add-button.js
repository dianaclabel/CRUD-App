import "./render-add-button.css";

/**
 *
 * @param { HTMLDivElement } element
 * @param { () => void } callback
 */
export const renderAddButton = (element) => {
  const fabButton = document.createElement("button");
  fabButton.innerText = "+";
  fabButton.classList.add("fab-button");

  element.append(fabButton);

  fabButton.addEventListener("click", () => {
    throw Error("no implementado");
  });
};
