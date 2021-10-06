const router = require("express").Router();
const restrict = require('../middlewares/restrict')
const productController = require('../controller/product')
const { check } = require('express-validator');
const fileUpload = require('../middlewares/file-upload');

router.get("/", productController.index)
router.get("/:id", productController.detail)
router.post("/",fileUpload.array('image'),[
    check('title')
      .not()
      .isEmpty(),
    check('description')
    .not()
    .isEmpty(),
  ], productController.create)

module.exports = router;
