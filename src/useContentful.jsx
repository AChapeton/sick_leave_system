// import { createClient } from "contentful";
// import contentful from "contentful-management";
import { createClient } from "contentful-management";
import { create } from "zustand";

const ENVIRONMENT = "master";
const SPACE_ID = "5cx8i8w9ige3";
const ACCESS_TOKEN = "CFPAT-Ci_G875FAGKlt5pxQETLsvLB8KBB9Ym8NQkFH_AuBkI";
const DEFAULT_LNG = "en-US";

const client = createClient({
  // space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  // host: "cdn.contentful.com",
});

let environment = null;

const startEnvironment = async () => {
  const space = await client.getSpace(SPACE_ID);
  const newEnvironment = await space.getEnvironment(ENVIRONMENT);

  environment = newEnvironment;
};

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
    .then((response) => {
      const transformedUser = arrayFetchTransformer(response.items);
      const transformedEmployee = arrayFetchTransformer(
        response.includes.Entry
      );

      return transformedUser.map((user, index) => ({
        ...user,
        employee: transformedEmployee.find(
          ({ sysId }) => sysId === user.employeeId.sys.id
        ),
      }));
    });
};

const getAllEmployees = async () => {
  return await client
    .getSpace(SPACE_ID)
    .then((space) => space.getEnvironment(ENVIRONMENT))
    .then((environment) =>
      environment.getPublishedEntries({
        content_type: "employee",
      })
    )
    .then((response) => {
      // console.log("use", response.items);
      // return response.items;
      // return response.items.map((item) => arrayFetchTransformer(item));
      return arrayFetchTransformer(response.items);
    });
};

const getApplicationsByUser = async (user) => {
  return await client
    .getSpace(SPACE_ID)
    .then((space) => space.getEnvironment(ENVIRONMENT))
    .then((environment) =>
      environment
        .getPublishedEntries({
          content_type: "application",
        })
        .then((response) => {
          const transformedApps = arrayFetchTransformer(response.items);
          const transformedEmployee = arrayFetchTransformer(
            response.includes.Entry
          );

          return transformedApps.map((app, index) => ({
            ...app,
            employee: transformedEmployee.find(
              ({ sysId }) => sysId === app.employeeId.sys.id
            ),
          }));
        })
    );
};

const createApplication = async (applicationData) => {
  const newApplication = await client
    .getSpace(SPACE_ID)
    .then((space) => space.getEnvironment(ENVIRONMENT))
    .then((environment) =>
      environment.createEntry("application", applicationData)
    );
  await newApplication.publish();
  return newApplication;
};

const deleteApplication = async (sysId) => {
  try {
    // console.log(sysId);
    const application = await client
      .getSpace(SPACE_ID)
      .then((space) => space.getEnvironment(ENVIRONMENT))
      .then((environment) => environment.getEntry(sysId));

    await application.unpublish();
    await application.delete();

    return application;
  } catch (err) {
    console.error("Error deleting application", err);

    return null;
  }
};

const arrayFetchTransformer = (data) =>
  data.map((item) =>
    Object.keys(item.fields).reduce(
      (prev, key) => ({
        ...prev,
        [key]: item.fields[key][DEFAULT_LNG],
      }),
      { sysId: item.sys.id }
    )
  );

export {
  login,
  getAllEmployees,
  getApplicationsByUser,
  createApplication,
  deleteApplication,
};
