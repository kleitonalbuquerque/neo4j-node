const express = require("express");
import user from "./src/routes/person";
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", user);

app.listen(process.env.PORT);
