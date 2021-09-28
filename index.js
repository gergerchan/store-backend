require("dotenv").config();
const express = require("express");
const app = express();
const router = require('./router')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router)

//setup webserver port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
