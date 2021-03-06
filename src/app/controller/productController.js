const Product = require("../model/Products");

exports.getProducts =
  ("/",
  async (req, res) => {
    try {
      const products = await Product.find();
      return res.send(products);
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ error: "Error loading products", details: err });
    }
  });

exports.getProduct =
  ("/:id",
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      return res.send(product);
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ error: "Error loading product", details: err });
    }
  });

exports.postProduct =
  ("/",
  async (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

      const { name, price } = req.body;

      const product = await Product.create({
        name,
        price,
      });

      await product.save();

      return res.send(product);
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ error: "Error creating new product", details: err });
    }
  });

exports.putProduct =
  ("/:id",
  async (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

      const { name, price } = req.body;

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price,
        },
        { new: true } //Retornar o registro atualizado
      );
      await product.save();

      return res.send(product);
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ error: "Error update product", details: err });
    }
  });

exports.deleteProduct =
  ("/:id",
  async (req, res) => {
    try {
      await Product.findByIdAndRemove(req.params.id);
      return res.send();
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ error: "Error remove product", details: err });
    }
  });
