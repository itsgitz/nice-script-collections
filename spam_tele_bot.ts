import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendSameRequestMultipleTimes(
  endpoint: string,
  count: number,
  delayMs: number
) {
  for (let i = 0; i < count; i++) {
    try {
      const res = await axios.get(endpoint);
      console.log(`Response #${i + 1}:`, res.data);
    } catch (err) {
      console.error(`Request #${i + 1} failed:`, err.message);
    }

    // Wait for the specified delay before the next request, but not after the last one.
    if (i < count - 1) {
      await delay(delayMs);
    }
  }
}

// const gabungan = '𝗡𝗼.𝗛𝗮𝗻𝗱𝗽𝗵𝗼𝗻𝗲 %3A%0A' + user.value;

const token = "8054857711:AAE7GaU8Sf6A5tAsUT4QtlLdgMEf5yYOBns"; // Ganti dengan token bot yang kamu buat
const grup = "6942633617"; // Ganti dengan chat id dari bot yang kamu buat
const text = "Tobat bos jangan nipu mulu!";

// Example usage
const endpoint = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${text}&parse_mode=html`;
const times = 1_000_000;
const concurrency = 500; // send 500 at the same time

sendSameRequestMultipleTimes(endpoint, times, concurrency);
