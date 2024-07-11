import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderTable } from "./presentation/render-table/render-table";
import { renderModal } from "./presentation/render-modal/render-modal";
import usersStore from "./store/users-store";

/**
 *
 * @param {HTMLDivElement} element
 */

export const UserApp = async (element) => {
  element.innerHTML = "Loading...";
  await usersStore.loadNextPage();
  element.innerHTML = " ";

  // console.log(usersStore.getUsers());

  renderTable(element);
  renderButtons(element);
  renderAddButton(element);
  renderModal(element);
};
