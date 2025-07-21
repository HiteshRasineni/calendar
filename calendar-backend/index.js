const express = require("express");
const cors = require("cors");
const { syncEventsAndUsers } = require("./syncDelta");

app.get("/sync", async (req, res) => {
  try {
    await syncEventsAndUsers();
    res.status(200).send("✅ Sync completed");
  } catch (err) {
    console.error("❌ Sync failed:", err.message);
    res.status(500).send("❌ Sync failed");
  }
});

const app = express();

// Define allowed origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:3000",                       // Local dev
  "https://calendar-black-gamma.vercel.app"     // Deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/events", require("./routes/events"));

// Optional root route for testing
app.get("/", (req, res) => {
  res.send("API is running.");
});

app.listen(5000, () => console.log("Server running on port 5000"));

