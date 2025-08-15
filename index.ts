import axios from "axios";
import pLimit from "p-limit";

async function sendSameRequestMultipleTimes(
  endpoint: string,
  count: number,
  concurrency: number
) {
  const limit = pLimit(concurrency);

  const tasks = Array.from({ length: count }, (_, i) =>
    limit(async () => {
      try {
        const res = await axios.get(endpoint);
        console.log(`Response #${i + 1}:`, res.data);
      } catch (err) {
        console.error(`Request #${i + 1} failed:`, err.message);
      }
    })
  );

  await Promise.all(tasks);
}

// Example usage
const endpoint = "https://ddpmulihan.info-shope.xyz/";
const times = 1_000_000;
const concurrency = 500; // send 500 at the same time

sendSameRequestMultipleTimes(endpoint, times, concurrency);
