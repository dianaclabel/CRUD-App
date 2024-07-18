import modalHtml from "./render-modal.html?raw";
import "./render-modal.css";
import { User } from "../../models/user";
import { getUserById } from "../../use-cases/get-user-by-id";

let modal, form;
let loadedUser = {};

// TODO: cargar usuario por id
/**
 *
 * @param {String|Number} id
 */
export const showModal = async (id) => {
  modal?.classList.remove("hide-modal");
  loadedUser = {};

  if (!id) return;
  //Obtenemos el usuario
  const user = await getUserById(id);
  setFormValues(user);
};

export const hideModal = () => {
  modal?.classList.add("hide-modal");
  // reset -> resetea los campos
  form?.reset();
};

//LLenamos los campos del form con los datos del usuario para que sean
// mostrado en el form.
/**
 *
 * @param {User} user
 */
const setFormValues = (user) => {
  form.querySelector('[name="firstName"]').value = user.firstName;
  form.querySelector('[name="lastName"]').value = user.lastName;
  form.querySelector('[name="balance"]').value = user.balance;
  form.querySelector('[name="isActive"]').checked = user.isActive;

  loadedUser = user;
};

/**
 * @param { HTMLDivElement } element
 * @param {(userLike)=> Promise<void>} callback
 */

export const renderModal = (element, callback) => {
  if (modal) return;

  modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  modal.className = "modal-container hide-modal";
  form = modal.querySelector("form");

  modal.addEventListener("click", (event) => {
    if (event.target.className == "modal-container") {
      hideModal();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    //formdata nos devuelve un objeto iterable
    const formData = new FormData(form);

    const userLike = { ...loadedUser };

    for (const [key, value] of formData) {
      if (key === "balance") {
        //value lo convertimos en numero con el signo +
        userLike[key] = +value;
        //Para que haga la siguiente iteración del ciclo
        continue;
      }

      userLike[key] = value;
    }

    userLike.isActive = formData.get("isActive") === "on";
    // userLike.balance = +formData.get("balance");

    console.log(userLike);
    await callback(userLike);
    hideModal();
  });

  element.append(modal);
};
