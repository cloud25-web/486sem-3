import express from "express";
import fs from "fs";

const app = express();

const PORT = 3000;

app.use(express.static("public"));

const notes = JSON.parse(
    fs.readFileSync("./notes.json", "utf-8")
);

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("/api/notes/search", (req, res) => {

    const query = req.query.q.toLowerCase();

    const result = notes.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.subject.toLowerCase().includes(query)
    );

    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});