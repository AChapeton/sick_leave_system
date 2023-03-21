import { createClient } from "contentful-management";

//CONTENTFUL variables
const ENVIRONMENT = "master";
const SPACE_ID = "5cx8i8w9ige3";
const ACCESS_TOKEN = "CFPAT-Ci_G875FAGKlt5pxQETLsvLB8KBB9Ym8NQkFH_AuBkI";
const DEFAULT_LNG = "en-US";

//Create cliente
const client = createClient({
  accessToken: ACCESS_TOKEN,
});

//Login - Receives an array that contains user's data
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

//Get all employees
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
      return arrayFetchTransformer(response.items);
    });
};

//Get application by user
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

//Create new application
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

//Delete application
const deleteApplication = async (sysId) => {
  try {
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

//Function to convert contentful objects structure to use them easily
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
