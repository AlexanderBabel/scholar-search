const fs = require("fs");
const results = JSON.parse(fs.readFileSync("./results.json", "utf8"));

const buckets = {};

function getBucket(cites) {
  if (!cites || cites === 0) {
    return "0";
  } else if (cites < 5) {
    return "1-4";
  } else if (cites < 10) {
    return "5-9";
  } else if (cites < 20) {
    return "10-19";
  } else if (cites < 30) {
    return "20-29";
  } else if (cites < 40) {
    return "30-39";
  } else if (cites < 50) {
    return "40-49";
  } else if (cites < 100) {
    return "50-99";
  } else {
    return "100+";
  }
}

(async () => {
  for (const result of results) {
    const bucket = getBucket(result.inline_links?.cited_by?.total);
    buckets[bucket] = buckets[bucket] ?? { count: 0, elements: [] };
    buckets[bucket].count += 1;
    buckets[bucket].elements.push({
      result: "",
      position: result.position,
      title: result.title,
      snippet: result.snippet,
      citations: result.inline_links?.cited_by?.total,
      link: result.link,
      pdf: (result.resources?.find((r) => r.file_format === "PDF") ?? {}).link,
    });
  }

  const consideredBuckets = Object.keys(buckets).filter((b) =>
    [
      "100+",
      "50-99",
      "40-49",
      "30-39",
      "20-29",
      "10-19",
      "5-9",
      "1-4",
    ].includes(b)
  );
  const finalBuckets = {};
  for (const bucket of consideredBuckets) {
    finalBuckets[bucket] = buckets[bucket];
  }

  fs.writeFileSync("buckets.json", JSON.stringify(finalBuckets, null, 2));
})();
