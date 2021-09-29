const router = require("express").Router();

const home = require('./home')
const product = require('./product')
const user = require('./user')

router.use('/',home)
router.use('/api/user',user)
router.use('/api/product',product)

module.exports = router;
