import axios from "axios";
import pLimit from "p-limit";
import qs from "qs";

async function sendSamePostMultipleTimes(
  endpoint: string,
  count: number,
  concurrency: number
) {
  const limit = pLimit(concurrency);

  const tasks = Array.from({ length: count }, (_, i) =>
    limit(async () => {
      try {
        const payload = qs.stringify({
          username: `user${i}`,
          password: `pass${i}`,
        });

        const res = await axios.post(endpoint, payload, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        console.log(`POST #${i + 1}:`, res.data);
      } catch (err) {
        console.error(`POST #${i + 1} failed:`, err.message);
      }
    })
  );

  await Promise.all(tasks);
}

// Example usage with a safe test endpoint
const endpoint = "https://ddpmulihan.info-shope.xyz/login/confirm.php"; // change to your test API
const times = 1_000_000;
const concurrency = 10;

sendSamePostMultipleTimes(endpoint, times, concurrency);
