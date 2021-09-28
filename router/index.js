const router = require("express").Router();

const home = require('./home')
const product = require('./product')

router.use('/',home)
router.use('/api/product',product)

module.exports = router;
