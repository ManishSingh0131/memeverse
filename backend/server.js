const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path"); // Import path module
const WebSocket = require("ws"); // Import the WebSocket library
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Multer configuration for handling file uploads
const upload = multer({ dest: "uploads/" });

// Dummy endpoint for getting memes
app.get("/api/memes", (req, res) => {
  res.json([
    { id: 1, title: "Meme 1", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, title: "Meme 2", imageUrl: "https://via.placeholder.com/150" },
  ]);
});

// Endpoint for uploading memes
app.post("/api/upload", upload.single("image"), (req, res) => {
  console.log("File uploaded:", req.file);
  res.json({ message: "Meme uploaded successfully!" });
});

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  // Set the static folder to the 'build' directory of React
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  // All other routes should be handled by React (to handle client-side routing)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

// WebSocket server setup
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("A new client connected");

  // Send a welcome message to the client
  ws.send("Welcome to WebSocket server!");

  // Handle messages from the client
  ws.on("message", (message) => {
    console.log("Received message: ", message);
    // Echo the message back to the client
    ws.send(`Echo: ${message}`);
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("A client disconnected");
  });

  // Handle errors
  ws.on("error", (error) => {
    console.log("WebSocket error:", error);
  });
});
