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

export { useLogin };
