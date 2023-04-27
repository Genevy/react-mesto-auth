import React from "react";
import avatar from "../images/avatar.jpg";

export const CurrentUserContext = React.createContext();

export const defaultCurrentUser = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь океана',
  avatar: avatar
};