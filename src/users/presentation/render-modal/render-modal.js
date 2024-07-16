import modalHtml from "./render-modal.html?raw";
import "./render-modal.css";

let modal, form;

// TODO cargar usuario por id
export const showModal = () => {
  modal?.classList.remove("hide-modal");
};

export const hideModal = () => {
  modal?.classList.add("hide-modal");
  // reset -> resetea los campos
  form?.reset();
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
    const userLike = {};

    for (const [key, value] of formData) {
      if (key === "balance") {
        //value lo convertimos en numero con el signo +
        userLike[key] = +value;
        //Para que haga la siguiente iteración del ciclo
        continue;
      }

      if (key === "isActive") {
        userLike[key] = value === "on" ? true : false;
        continue;
      }

      userLike[key] = value;
    }

    // console.log(userLike);
    await callback(userLike);
    hideModal();
  });

  element.append(modal);
};
