import express from "express";
import mongoose from "mongoose";
import { Note } from "./models/note";
import dotenv from "dotenv";

dotenv.config();

const app = express();
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

app.use(express.json());

app.get("/", async (req, res) => {
  const allNotes = await Note.find();
  res.json(allNotes);
});

app.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({
    title,
    content,
  });
  await newNote.save();
  res.json({ message: "Note added" });
});

app.listen(8000);
