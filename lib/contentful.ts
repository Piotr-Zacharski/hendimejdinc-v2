import { createClient } from "contentful";

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_KEY) {
  throw new Error(
    "Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_KEY environment variables"
  );
}

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});
