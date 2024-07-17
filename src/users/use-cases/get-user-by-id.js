import { localhostUserToModel } from "../mappers/localhost-user.mappers";
import { User } from "../models/user";
/**
 *
 * @param {String|Number} id
 * @returns { Promise<User[]>}
 */

//Se realiza la petición según el ID del usuario seleccionado
export const getUserById = async (id) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  const user = localhostUserToModel(data);
  // console.log({ user });

  return user;
};
