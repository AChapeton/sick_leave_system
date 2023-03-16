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

  const getAllUsers = async () => {
    try {
      const users = await client.getEntries({
        content_type: "user",
        select: "fields",
      });
      return users;
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };

  return { getAllUsers };
};

export { useContentful };
