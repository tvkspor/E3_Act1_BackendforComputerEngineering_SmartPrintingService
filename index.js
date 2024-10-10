const express = require("express");
const routes = require("./routes");
const dotenv = require("dotenv");
const db = require("./database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
// Middleware để phân tích body JSON
app.use(express.json());
// Middleware để phân tích form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

dotenv.config();

const port = 3000;
routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
