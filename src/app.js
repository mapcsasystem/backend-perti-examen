require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongoDB");
const app = express();
app.use(cors);
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app run port ${port}`);
});
dbConnect();
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Desde get",
  });
});
