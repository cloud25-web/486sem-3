import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "requests.json");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Read requests from JSON file
function readRequests() {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

// Write requests to JSON file
function writeRequests(requests) {
    fs.writeFileSync(
        filePath,
        JSON.stringify(requests, null, 2)
    );
}


// GET /api/requests
app.get("/api/requests", (req, res) => {
    const requests = readRequests();

    res.json(requests);
});


// GET /api/requests/:id
app.get("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const id = Number(req.params.id);

    const request = requests.find((r) => r.id === id);

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.json(request);
});


// POST /api/requests
app.post("/api/requests", (req, res) => {
    const requests = readRequests();

    const newRequest = {
        id: Date.now(),
        studentName: req.body.studentName,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    requests.push(newRequest);

    writeRequests(requests);

    res.status(201).json(newRequest);
});


// PUT /api/requests/:id
app.put("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const id = Number(req.params.id);

    const index = requests.findIndex((r) => r.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    requests[index] = {
        id: id,
        studentName: req.body.studentName,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    writeRequests(requests);

    res.json(requests[index]);
});


// DELETE /api/requests/:id
app.delete("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const id = Number(req.params.id);

    const index = requests.findIndex((r) => r.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    const deletedRequest = requests.splice(index, 1)[0];

    writeRequests(requests);

    res.json({
        message: "Request deleted successfully",
        request: deletedRequest
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});