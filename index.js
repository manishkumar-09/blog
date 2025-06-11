require("dotenv").config();
require("./config/modelConfig");
const express = require("express");
const mainRouter = require("./routes/mainRouter");
const limiter = require("./middlewares/rateLimiter");
const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;

app.use(express.json());
app.use(limiter);
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`server is listening at ${HOST}:${PORT}`);
});

// git branch -M main
// git push -u origin main
