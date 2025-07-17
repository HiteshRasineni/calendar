const express = require("express");
const cors = require("cors");

const app = express();

// Define allowed origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:3000",         // Local development
  "https://calendar-black-gamma.vercel.app/"   // Deployed frontend URL (update if needed)
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/events", require("./routes/events"));

app.listen(5000, () => console.log("Server running on port 5000"));

