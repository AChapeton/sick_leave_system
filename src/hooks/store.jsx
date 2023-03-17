import { create } from "zustand";

const useLogin = create((set) => ({
  loggedUser: {},
  saveLoggedUser: (user) => {
    set((state) => {
      console.log("User zustand: ", user);
      return { loggedUser: user };
    });
  },
}));

const useSignin = create((set) => ({
  chooseRol: "",
  setRole: (role) => {
    set((state) => {
      console.log(role);
    });
  },
}));

export { useLogin };
