const router = require("express").Router();
const restrict = require('../middlewares/restrict')
const productController = require('../controller/product')

router.get("/",restrict, productController.index)
router.get("/:id", productController.detail)
router.post("/", productController.create)

module.exports = router;
