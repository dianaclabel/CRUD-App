import usersStore from "../../store/users-store";
import { showModal } from "../render-modal/render-modal";
import "./render-table.css";

let table;

const createTable = () => {
  const table = document.createElement("table");
  const tableHeaders = document.createElement("thead");
  tableHeaders.innerHTML = `
    <tr>
      <th>#ID</th>
      <th>Balance</th>
      <th>FirstName</th>
      <th>LastName</th>
      <th>Active</th>
      <th>Actions</th>
    </tr>
  `;

  const tableBody = document.createElement("tbody");
  table.append(tableHeaders, tableBody);
  return table;
};

//En caso de que seleccione los botones se ejecuta este listener
/**
 *
 * @param {MouseEvent} event
 */
const tableSelectListener = (event) => {
  //closesr -> nos obtendremos el elemento .select-user o cercano
  const element = event.target.closest(".select-user");

  if (!element) return;

  //Obtiene el ID del elemento con getAttribute()
  const id = element.getAttribute("data-id");
  //Se llama la funcion con el ID
  showModal(id);
};

/**
 *
 * @param {HTMLDivElement} element
 */
export const renderTable = (element) => {
  const users = usersStore.getUsers();

  if (!table) {
    table = createTable();
    element.append(table);

    //TODO listeners a la table
    table.addEventListener("click", tableSelectListener);
  }

  let tableHTML = " ";
  users.forEach((user) => {
    tableHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.balance} </td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.isActive}</td>
        <td>
          <a href="#" class="select-user" data-id="${user.id}">Select</a>
          <a href="#" class="delete-user" data-id="${user.id}">Delete</a>
        </td>
      </tr>
    `;
  });

  table.querySelector("tbody").innerHTML = tableHTML;
};
