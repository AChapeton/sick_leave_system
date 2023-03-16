import { createClient } from "contentful";
import { create } from "zustand";

const ENVIRONMENT = "master";
const SPACE_ID = "5cx8i8w9ige3";
const ACCESS_TOKEN = "EzHRK7tx8Wji8frFFw7htWK7-K7cpBgzhZQ_jLI43sM";

const useContentful = () => {
  const client = createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
    host: "cdn.contentful.com",
  });

  const getAllEmployees = async () => {
    try {
      const employees = await client.getEntries({
        content_type: "employee",
        select: "fields",
      });
      return employees;
    } catch (error) {
      console.log("Error fetching employees: ", error);
    }
  };

  return { getAllEmployees };
};

export { useContentful };
