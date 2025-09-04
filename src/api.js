// This is a FAKE backend to save time.

// This pretends to create a short URL.
export const createShortUrl = async (longUrl) => {
  console.log("Pretending to shorten this URL:", longUrl);
  // Fake a network delay of 0.3 seconds
  await new Promise(resolve => setTimeout(resolve, 300)); 

  // Return a fake result
  return {
    shortLink: `http://sho.rt/${Math.random().toString(36).substring(7)}`,
  };
};

// This pretends to get the list of all URLs.
export const getAllLinks = async () => {
  // Fake a network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Return a fake list
  return [
    { shortLink: 'http://sho.rt/abcd1', clicks: 15 },
    { shortLink: 'http://sho.rt/efgh2', clicks: 8 },
    { shortLink: 'http://sho.rt/ijkl3', clicks: 22 },
  ];
};