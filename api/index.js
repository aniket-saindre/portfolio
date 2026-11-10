import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json({ limit: "10kb" }));

let connection;
async function connect() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set");
  if (!connection) connection = mongoose.connect(process.env.MONGODB_URI);
  await connection;
}

const Message =
  mongoose.models.Message ||
  mongoose.model(
    "Message",
    new mongoose.Schema({
      name: { type: String, required: true, trim: true, maxlength: 100 },
      email: { type: String, required: true, trim: true, maxlength: 150 },
      message: { type: String, required: true, trim: true, maxlength: 2000 },
      createdAt: { type: Date, default: Date.now }
    })
  );

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/contact", async (req, res) => {
  const { name, email, message, website } = req.body || {};
  if (website) return res.json({ ok: true }); // honeypot: bots fill this hidden field
  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email || ""))
    return res.status(400).json({ error: "Please enter your name, a valid email and a message." });
  try {
    await connect();
    await Message.create({ name, email, message });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save your message. Please email me directly." });
  }
});

export default app;
