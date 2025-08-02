const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

// Example endpoint
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Set the port to the environment variable Render provides
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

