import axios from "axios";
import pLimit from "p-limit";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendRequestsInBatches(
  endpoint: string,
  batchSize: number,
  concurrency: number,
  delayAfterBatchMs: number
) {
  const limit = pLimit(concurrency);
  let totalRequestsSent = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log(
      `--- Starting batch of ${batchSize} requests (concurrency: ${concurrency}) ---`
    );

    const tasks = Array.from({ length: batchSize }, () =>
      limit(async () => {
        const requestNumber = ++totalRequestsSent;
        try {
          const res = await axios.get(endpoint);
          console.log(`Response #${requestNumber}:`, res.data);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.error(
              `Request #${requestNumber} failed: ${err.message}`,
              err.response?.data
            );
          } else {
            console.error(`Request #${requestNumber} failed:`, err.message);
          }
        }
      })
    );

    await Promise.all(tasks);

    console.log(
      `--- Finished batch. Total requests sent: ${totalRequestsSent}. Pausing for ${delayAfterBatchMs}ms ---`
    );
    await delay(delayAfterBatchMs);
  }
}

// const gabungan = '𝗡𝗼.𝗛𝗮𝗻𝗱𝗽𝗵𝗼𝗻𝗲 %3A%0A' + user.value;

const token = "8054857711:AAE7GaU8Sf6A5tAsUT4QtlLdgMEf5yYOBns"; // Ganti dengan token bot yang kamu buat
const grup = "6942633617"; // Ganti dengan chat id dari bot yang kamu buat
const text = "Tobat bos jangan nipu mulu!";

// Example usage
const endpoint = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${text}&parse_mode=html`;
const requestsPerBatch = 50;
const delayAfterBatchMs = 3000;
const concurrency = 50; // Limit concurrent requests to avoid overwhelming the API

sendRequestsInBatches(
  endpoint,
  requestsPerBatch,
  concurrency,
  delayAfterBatchMs
);
