const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const logger = require("./utils/logger");
const config = require("./configs");

const indexRouter = require("./routes/v1/index");
const usersRouter = require("./routes/v1/users");

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  credentials: true,
  origin: true,
}

app.use('*', cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/v1/users", usersRouter);

mongoose.connect(config.mongoose.url).then(() => {
  logger.info("Connected to MongoDB");
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});

module.exports = app;
