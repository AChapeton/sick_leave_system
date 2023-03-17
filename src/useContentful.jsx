// import { createClient } from "contentful";
// import contentful from "contentful-management";
import { createClient } from "contentful-management";
import { getEnvironment } from "contentful-management";
import { create } from "zustand";

const ENVIRONMENT = "master";
const SPACE_ID = "5cx8i8w9ige3";
const ACCESS_TOKEN = "CFPAT-Ci_G875FAGKlt5pxQETLsvLB8KBB9Ym8NQkFH_AuBkI";
const DEFAULT_LNG = "en-US";

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  // host: "cdn.contentful.com",
});

// client
//   .getSpace(SPACE_ID)
//   .then((space) => console.log(space))
//   .catch(console.error);

// const getAllUsers = async () => {
//   try {
//     const users = await client.getEntries({
//       content_type: "user",
//       select: "fields",
//     });
//     return users;
//   } catch (error) {
//     console.log("Error fetching users: ", error);
//   }
// };

const login = async (username, password) => {
  return await client
    .getSpace(SPACE_ID)
    .then((space) => space.getEnvironment(ENVIRONMENT))
    .then((environment) =>
      environment.getPublishedEntries({
        content_type: "user",
        "fields.username": username,
        "fields.password": password,
      })
    )
    .then((response) => userFetchTransformer(response.items));
};

const userFetchTransformer = (data) =>
  data.map((item) =>
    Object.keys(item.fields).reduce(
      (prev, key) => ({
        ...prev,
        [key]: item.fields[key][DEFAULT_LNG],
      }),
      { sysId: item.sys.id }
    )
  );

export { login };
