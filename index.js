const express = require("express");
const dbConnect = require("./config/dbConnection");
const activityRoutes = require("./router/activity");
const salesRoutes = require("./router/sales");
const dashboard = require("./router/dashboard");
const userRouter = require("./router/auth");
const productRouter = require("./router/product");
require("dotenv").config();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend Working ON Port 3000");
});
dbConnect();
app.use("/api/auth", userRouter);
app.use("/api/product", productRouter);
app.use("/api/activity", activityRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/dashboard", dashboard);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
