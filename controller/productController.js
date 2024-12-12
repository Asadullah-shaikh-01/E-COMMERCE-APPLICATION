import slugify from "slugify";
import ProductsModel from "../models/ProductsModel.js";
import CategoryModel from "../models/CategoryModel.js"
//import OrderModel from "../models/OrderModel.js";
import fs from "fs";
// import braintree from 'braintree '
// import dotenv from 'dotenv'

// dotenv.config();

// Payment getway
// var gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_Merchant_ID,
//   publicKey: process.env.BRAINTREE_Public_Key,
//   privateKey: process.env.BRAINTREE_Private_Key,
// });

// Create product
export const createProductsControllers = async (req, res) => {
  try {
    const {
      Name,
      Brand,
      slug,
      Description,
      Price,
      Category,
      Quantity,
      Shipping,
    } = req.fields;
    const { Photo } = req.files;
    // Validations
    switch (true) {
      case !Name:
        return res.status(500).send({ error: "Name is required" });
      case !Brand:
        return res.status(500).send({ error: "Brand is required" });
      case !Description:
        return res.status(500).send({ error: "Description is required" });
      case !Price:
        return res.status(500).send({ error: "Price is required" });
      case !Category:
        return res.status(500).send({ error: "Category is required" });
      case !Quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case Photo && Photo.size>5000000:
        return res.status(500).send({ error: "Photo is required and Should be less then 5MB" });
    }

    const products = new ProductsModel({...req.fields,slug:slugify(Name)});
    if (Photo) {
      products.Photo.data =fs.readFileSync(Photo.path);
      products.Photo.contentType=Photo.type;
    }await products.save();
       res.status(201).send({
        success: true,
        message: "Products Create Successfully",
        products, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating products",
    });
  }
};
//get all products
export const getProductController = async (req, res) => {
    try {
      const products = await ProductsModel
        .find({})
        .populate("Category")
        .select("-Photo")
        .limit(16)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        Totalcoun: products.length,
        message: "All Products ",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };
  // get single product
  export const getSingleProductController = async (req, res) => {
    try {
      const product = await ProductsModel
        .findOne({ slug: req.params.slug })
        .select("-Photo")
        .populate("Category");
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
        error,
      });
    }
  };
  
  // get Photo
  export const productPhotoController = async (req, res) => {
    try {
      const product = await ProductsModel.findById(req.params.pid).select("Photo");
      if (product.Photo.data) {
        res.set("Content-type", product.Photo.contentType);
        return res.status(200).send(product.Photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting Photo",
        error,
      });
    }
  };
  
  //delete controller
  export const deleteProductController = async (req, res) => {
    try {
      await ProductsModel.findByIdAndDelete(req.params.pid).select("-Photo");
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };
  
  //upate producta
  export const updateProductController = async (req, res) => {
    try {
      const {   Name,
        Brand,
        slug,
        Description,
        Price,
        Category,
        Quantity,
        Shipping,} =
        req.fields;
      const { Photo } = req.files;
      //alidation
      switch (true) {
        case !Name:
          return res.status(500).send({ error: "Name is Required" });
          case !Brand:
          return res.status(500).send({ error: "Brand is Required" });
        case !Description:
          return res.status(500).send({ error: "Description is Required" });
        case !Price:
          return res.status(500).send({ error: "Price is Required" });
        case !Category:
          return res.status(500).send({ error: "Category is Required" });
        case !Quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case Photo && Photo.size > 5000000:
          return res
            .status(500)
            .send({ error: "Photo is Required and should be less then 5MB" });
      }
  
      const products = await ProductsModel.findByIdAndUpdate(
        req.params.id,
        { ...req.fields, slug: slugify(Name) },
        { new: true }
      );
      if (Photo) {
        products.Photo.data = fs.readFileSync(Photo.path);
        products.Photo.contentType = Photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };
  
  //category filters 
  export const productFiltersController = async (req, res) => {
    try {
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.Category = checked;
      if (radio.length) args.Prices = { $gte: radio[0], $lte: radio[1] };
      const products = await ProductsModel.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Filtering Products",
        error,
      });
    }
  };
  
  // product count
  export const productCountController = async (req, res) => {
    try {
      const total = await ProductsModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };
  
  // product list base on page
  export const productListController = async (req, res) => {
    try {
      const perPage = 5;
      const page = req.params.page ? req.params.page : 1;
      const products = await ProductsModel
        .find({})
        .select("-Photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };
  
  // search product
  export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await ProductsModel
        .find({
          $or: [
            { Name: { $regex: keyword, $options: "i" } },
            { Description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-Photo");
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };
  
  // similar products
  export const realtedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const products = await ProductsModel
        .find({
          Category: cid,
          _id: { $ne: pid },
        })
        .select("-Photo")
        .limit(3)
        .populate("Category");
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error while geting related product",
        error,
      });
    }
  };
  
  // get products by catgory
  export const productCategoryController = async (req, res) => {
    try {
      const category = await CategoryModel.findOne({ slug: req.params.slug });
      const products = await ProductsModel.find({ category }).populate("Category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };
  
  // //payment gateway api
  // //token
  // export const braintreeTokenController = async (req, res) => {
  //   try {
  //     gateway.clientToken.generate({}, function (err, response) {
  //       if (err) {
  //         res.status(500).send(err);
  //       } else {
  //         res.send(response);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  // //payment
  // export const brainTreePaymentController = async (req, res) => {
  //   try {
  //     const { nonce, cart } = req.body;
  //     let total = 0;
  //     cart.map((i) => {
  //       total += i.Price;
  //     });
  //     let newTransaction = gateway.transaction.sale(
  //       {
  //         amount: total,
  //         paymentMethodNonce: nonce,
  //         options: {
  //           submitForSettlement: true,
  //         },
  //       },
  //       function (error, result) {
  //         if (result) {
  //           const order = new OrderModel({
  //             products: cart,
  //             payment: result,
  //             buyer: req.user._id,
  //           }).save();
  //           res.json({ ok: true });
  //         } else {
  //           res.status(500).send(error);
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };