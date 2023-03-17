import { create } from "zustand";

const useLogin = create((set) => ({
  loggedUser: [],
  saveLoggedUser: (user) => {
    set((state) => {
      return { loggedUser: [...user] };
    });
  },
}));

const useSignin = create((set) => ({
  chooseRol: "",
  setRole: (role) => {
    set((state) => {
      return { chooseRol: role };
    });
  },
}));

export { useLogin, useSignin };
