require("dotenv/config");

const fs = require("fs");
const SerpApi = require("google-search-results-nodejs");

const search = new SerpApi.SerpApiSearch(process.env.SERP_API_KEY);

const searches = [
  "6135da8d303eb12a74129074", // Page 1 (0-19)
  "6135daaac7ad41ffe00c3da7", // Page 2 (20-39)
  "6135dabd14b245e0b1a4cf58", // Page 3 (40-59)
  "6135dac6d036a72afdbced77", // Page 4 (60-79)
  "6135dacdad7fa90b6d5e65a4", // Page 5 (80-99)
  "6135dad5224db191c7ce5917", // Page 6 (100-119)
  "6135dade359e99382d3da68f", // Page 7 (120-139)
  "6135daedaa6c9572f358ec75", // Page 8 (140-159)
  "6135daf537b24aa69acbb641", // Page 9 (160-179)
  "6135dc441d986e8221507db8", // Page 10 (180-199)
  "6135dc4bf26ac687e0e8bcae", // Page 11 (200-219)
  "6135dc518cd8781ce52198e9", // Page 12 (220-239)
  "6135dc56edb034d5955aeb5e", // Page 13 (240-259)
  "6135dd04359e99382d3da6df", // Page 14 (260-261)
];

const results = [];

(async () => {
  for (let i = 0; i < searches.length; i += 1) {
    const searchId = searches[i];
    const searchResults = await new Promise((res) => {
      search.search_archive(searchId, res);
    });
    results.push(
      ...searchResults.organic_results.map((r) => ({
        ...r,
        position: r.position + 20 * i,
      }))
    );
  }

  fs.writeFileSync("results.json", JSON.stringify(results, null, 2));
})();
