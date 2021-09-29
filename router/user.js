const router = require("express").Router();

const user = require('../controller/user')

router.post("/", user.login)

module.exports = router;
