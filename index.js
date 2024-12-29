const express = require("express");
const dbConnect = require("./config/dbConnection");
require("dotenv").config();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend Working ON Port 3000");
});
dbConnect();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
