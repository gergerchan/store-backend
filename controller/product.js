const { Product } = require("../models");
const { nanoid } = require("nanoid");
const { validationResult } = require("express-validator");
const HttpError = require("../middlewares/http-error");

module.exports = {
  index: (req, res) => {
    Product.findAll().then((product) => {
      if (product.length > 0) {
        res.status(200).json({
          status: "success",
          message: "Data Available",
          data: product,
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "There is No Data",
          data: "No Data",
        });
      }
    });
  },
  create: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check your data.", 422)
      );
    }

    const { title, description, stock } = req.body;
    let imagename = null;
    req.files.forEach((data) => {
      if (imagename) {
        imagename = imagename + "&&&" + data.path;
      } else {
        imagename = data.path;
      }
    });

    Product.create({
      id: nanoid(),
      title: title,
      description: description,
      stock: stock,
      image: imagename,
    }).then(() => {
      res.status(201).json({
        status: "success",
        message: "Done Creating Data",
        data: {
          title: title,
          description: description,
          stock: stock,
          image: imagename,
        },
      });
    });
  },
  detail: (req, res) => {
    Product.findOne({ where: { id: req.params.id } }).then((result) => {
      if (result !== null) {
        res.status(200).json({
          status: "success",
          data: result,
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Data not found!",
          data: result,
        });
      }
    });
  },
};
