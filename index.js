require("dotenv").config();
const express = require("express");
const app = express();
const router = require('./router')
const passport = require('./lib/passport')
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const HttpError = require('./middlewares/http-error');
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize())

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use(router)

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});
//setup webserver port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
