const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = 3000;
const handlebars = require("express-handlebars");

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

// Đăng ký partials
const hbs = handlebars.create({
  extname: ".hbs",
  partialsDir: path.join(__dirname, "resources/views/partials"),
  helpers: {
    sum: (a, b) => a + b,
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// HTTP Logger
// app.use(morgan("combined"));

// Route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
