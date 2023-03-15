import { create } from "zustand";

const useLogin = create((set) => ({
  // users: [
  //   {
  //     name: "Edith Romero",
  //     userId: "1",
  //     username: "Eddy",
  //     password: "eddy01",
  //     employeeId: "1",
  //     role: "hr_specialist",
  //   },
  //   {
  //     name: "Andres Chapeton",
  //     userId: "2",
  //     username: "Chape",
  //     password: "chape01",
  //     employeeId: "2",
  //     role: "employee",
  //   },
  // ],
  // checkLogin: (username, password) => {
  //   set((state) => {
  //     let findUser = false;
  //     state.users.some((user) => {
  //       if (user.username === username && user.password === password) {
  //         findUser = !findUser;
  //       }
  //     });
  //     if(findUser){
  //       return
  //     }
  //   });
  // },
}));

export { useLogin };
