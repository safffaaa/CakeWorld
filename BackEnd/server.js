const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.use(express.json());
const cors = require("cors");
const userRouter = require('./Routes/user')
const cakeRouter = require('./Routes/cake')

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.static("public"));

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/", userRouter);
app.use("/cakes",cakeRouter);

app.listen(PORT, (err) => {
  console.log(`port is running ${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT}`);
});
