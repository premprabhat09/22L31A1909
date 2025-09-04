// logger.js
const API_URL = "http://20.244.56.144/evaluation-service/logs";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2ajkwMzIrdGVzdEBnbWFpbC5jb20iLCJleHAiOjE3NTY5NjUwMTMsImlhdCI6MTc1Njk2NDExMywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjA4MzQ4NTVjLTc4YzItNDhkOC05MmQzLTAzY2M1Y2QzYzQxMCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZlbmthdCBqYXlhbnRoIHllbGFtYW5jaGlsaSIsInN1YiI6Ijg5NjBkMDM2LWEwYTItNDY2MS04YmZlLWFkMGU0NDcxZTBhZSJ9LCJlbWFpbCI6InZqOTAzMit0ZXN0QGdtYWlsLmNvbSIsIm5hbWUiOiJ2ZW5rYXQgamF5YW50aCB5ZWxhbWFuY2hpbGkiLCJyb2xsTm8iOiIyMmwzMWExOTYwdGVzdCIsImFjY2Vzc0NvZGUiOiJZenVKZVUiLCJjbGllbnRJRCI6Ijg5NjBkMDM2LWEwYTItNDY2MS04YmZlLWFkMGU0NDcxZTBhZSIsImNsaWVudFNlY3JldCI6IktiVFBaelZrUk5yd21WcksifQ.kh_q-KtkLzLk2cSONvJjTYy0ljbItazUu35IVSipROs"; // from Postman

export async function log(stack, level, pkg, message) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
  } catch (err) {
    console.error("Failed to send log:", err);
  }
}
