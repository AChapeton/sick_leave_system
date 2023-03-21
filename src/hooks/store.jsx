import { create } from "zustand";
import { persist } from "zustand/middleware";

//Zustand function to save user credentials after logged in
//Persist logged user data
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

export { useLogin };
