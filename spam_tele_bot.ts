import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendRequestsInfinitely(endpoint: string, delayMs: number) {
  let i = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    i++;
    try {
      const res = await axios.get(endpoint);
      console.log(`Response #${i}:`, res.data);
    } catch (err) {
      console.error(`Request #${i} failed:`, err.message);
    }

    await delay(delayMs);
  }
}

// const gabungan = '𝗡𝗼.𝗛𝗮𝗻𝗱𝗽𝗵𝗼𝗻𝗲 %3A%0A' + user.value;

const token = "8054857711:AAE7GaU8Sf6A5tAsUT4QtlLdgMEf5yYOBns"; // Ganti dengan token bot yang kamu buat
const grup = "6942633617"; // Ganti dengan chat id dari bot yang kamu buat
const text = "Tobat bos jangan nipu mulu!";

// Example usage
const endpoint = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${text}&parse_mode=html`;
const delayBetweenRequestsMs = 500;

sendRequestsInfinitely(endpoint, delayBetweenRequestsMs);
