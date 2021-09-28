const { Product } = require("../models");
const { nanoid } = require("nanoid");

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
  create: (req, res) => {
    const { title, description, stock } = req.body;
    Product.create({
      id: nanoid(),
      title: title,
      description: description,
      stock: stock,
    }).then(() => {
      res.status(201).json({
        status: "success",
        message: "Done Creating Data",
        data: { title: title, description: description, stock: stock },
      });
    });
  },
  detail:(req,res)=>{
      Product.findOne({where:{id:req.params.id}})
      .then(result => {
        if (result !== null) {
          res.status(200).json({
            status: "success",
            data: result
          })
        } else {
          res.status(200).json({
            status: "success",
            message: "Data not found!",
            data: result
          })
        }
      })
  }
};
