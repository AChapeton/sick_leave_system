import { create } from "zustand";

const useLogin = create((set) => ({
  loggedUser: [],
  saveLoggedUser: (user) => {
    set((state) => {
      return { loggedUser: [...user] };
    });
  },
  loggedOut: () => {
    set((state) => {
      return { loggedUser: [] };
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

const useApplications = create((set) => ({
  applications: [],
  setApplications: (apps) => {
    set((state) => {
      return { applications: apps };
    });
  },
}));

export { useLogin, useSignin, useApplications };
