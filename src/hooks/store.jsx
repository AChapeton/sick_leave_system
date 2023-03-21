import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLogin = create(
  persist(
    (set) => ({
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
    }),
    { name: "LOGGED_DATA_V1" }
  )
);

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
