// controllers/authController.js
const { User } = require("../models");

const format = (user) => {
  const { id, username } = user;
  return {
    id,
    username,
    accessToken: user.generateToken(),
  };
};

module.exports = {
  /*... kode untuk fungsi register yang seperti sebelumnya ...*/
  login: (req, res) => {
    User.authenticate(req.body).then((user) => {
      res.json(format(user));
    });
  },
};
