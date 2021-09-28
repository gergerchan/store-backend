const router = require("express").Router();

const productController = require('../controller/product')

router.get("/", productController.index)
router.get("/:id", productController.detail)
router.post("/", productController.create)

module.exports = router;
