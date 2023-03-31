const express = require("express");
const cors = require("cors");
const compression = require("compression");
const app = express();
const movieRouter = require("./routes/movie");

//cors set up
app.use(cors());
app.use(express.json());
app.use(compression());
//movie router
app.use("/api/movies", movieRouter);
//endpoint error
app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(5500);
