const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

// GET all events for a logged-in user
router.get("/", auth, async (req, res) => {
  const [rows] = await db.execute(
    "SELECT * FROM events WHERE user_id = ?",
    [req.userId]
  );
  res.json(rows);
});

// POST a new event
router.post("/", auth, async (req, res) => {
  const { event_text, event_date } = req.body;
  await db.execute(
    "INSERT INTO events (user_id, event_text, event_date) VALUES (?, ?, ?)",
    [req.userId, event_text, event_date]
  );
  res.json({ message: "Event added" });
});

// DELETE an event
router.delete("/:id", auth, async (req, res) => {
  await db.execute(
    "DELETE FROM events WHERE id = ? AND user_id = ?",
    [req.params.id, req.userId]
  );
  res.json({ message: "Deleted" });
});

// ✅ PUT (Edit) an event
router.put("/:id", auth, async (req, res) => {
  const { event_text } = req.body;
  const eventId = req.params.id;

  await db.execute(
    "UPDATE events SET event_text = ? WHERE id = ? AND user_id = ?",
    [event_text, eventId, req.userId]
  );

  res.json({ message: "Updated" });
});

// ✅ PATCH (Mark event as complete/incomplete)
router.patch("/:id/complete", auth, async (req, res) => {
  const { completed } = req.body;
  await db.execute(
    "UPDATE events SET completed = ? WHERE id = ? AND user_id = ?",
    [completed, req.params.id, req.userId]
  );
  res.json({ message: "Status updated" });
});

module.exports = router;

