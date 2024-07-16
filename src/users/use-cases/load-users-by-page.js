import { localhostUserToModel } from "../mappers/localhost-user.mappers";
import { User } from "../models/user";
/**
 *
 * @param {Number} page
 * @returns { Promise<User[]>}
 */

export const loadUsersByPage = async (page = 1) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
  const res = await fetch(url);
  const data = await res.json();

  const users = data.map((userLike) => localhostUserToModel(userLike));
  //Tambien podemos hacerlo de esta forma mas reducida
  // const users = body.data.map(localhostUserToModel(userLike));

  // console.log(users); // [user, user, user, xn]

  return users;
};
