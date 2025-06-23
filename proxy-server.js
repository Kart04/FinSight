const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path"); // Add this line

const app = express();
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Your API route
app.get("/api/stock/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// The "catchall" handler: for any request not handled above, send back React's index.html
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
