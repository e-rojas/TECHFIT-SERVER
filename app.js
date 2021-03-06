const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { pool } = require("./config");
const dbHelpers = require("./helpers/dbHelpers")(pool);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mealsRouter = require("./routes/meals");
const workoutsRouter = require("./routes/workouts");
const userWorkoutsRouter = require("./routes/user-workouts");
const userMealsRouter = require("./routes/user-meals");
const userDrinksRouter = require("./routes/user-drinks");
const bodyParser = require("body-parser");

//comment
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/meals", mealsRouter(dbHelpers));
app.use("/api/users", usersRouter(dbHelpers))
app.use("/api/workouts", workoutsRouter(dbHelpers));
app.use("/api/user-workouts", userWorkoutsRouter(dbHelpers));
app.use("/api/user-meals", userMealsRouter(dbHelpers));
app.use("/api/user-drinks", userDrinksRouter(dbHelpers));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
