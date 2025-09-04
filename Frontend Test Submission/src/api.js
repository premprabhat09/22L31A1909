// api.js
import { log } from "./logger";

// This pretends to create a short URL.
export const createShortUrl = async (longUrl) => {
  await log("shortener", "info", "frontend", `Pretending to shorten this URL: ${longUrl}`);
  await new Promise(resolve => setTimeout(resolve, 300));

  const shortLink = `http://sho.rt/${Math.random().toString(36).substring(7)}`;
  await log("shortener", "debug", "frontend", `Generated fake shortLink: ${shortLink}`);

  return { shortLink };
};

// This pretends to get the list of all URLs.
export const getAllLinks = async () => {
  await log("stats", "info", "frontend", "Fetching all fake links");
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { shortLink: "http://sho.rt/abcd1", clicks: 15 },
    { shortLink: "http://sho.rt/efgh2", clicks: 8 },
    { shortLink: "http://sho.rt/ijkl3", clicks: 22 },
  ];
};
