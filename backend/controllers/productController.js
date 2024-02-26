const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//Create Product -- Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  //Stores the userId of the person who creates the product
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ 
    success: true,
    product
  });
});

//Get All Products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productsCount
  });
});

//Get Product Details
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    };

    res.status(200).json({
        success: true,
        product
    });
});

//Update Product -- Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    };

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true,
      product
    });
});

//Delete Product
const deleteProduct = catchAsyncErrors(async (req, res, next) =>{
        const product = await Product.findById(req.params.id);

        if (!product) {
          return next(new ErrorHandler("Product not found", 404));
        };
        
        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
});

//Create new review or update the review
const createProductReview = catchAsyncErrors(async(req, res, next) => {
  const {rating, comment, productId} = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  const product = await Product.findById(productId);

  //rev.user gives the id of the users that have reviewed and req.user._id gives the id of the current user who is going to give a review. So this checks if both are same meaning the person has reviewed before else it creates a new review
  const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

  if(isReviewed){ 
    product.reviews.forEach((rev) => {
      //if the review containing the user id matches the user that is currently logged in then change the rating and comment of that review
      if(rev.user.toString() === req.user._id.toString()){
        rev.rating = rating,
        rev.comment = comment
      }    
    });
  }
  else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //Calculating the average rating of the product
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Product reviewed or updated successfully"
  })
});

//Get all reviews
const getProductReviews = catchAsyncErrors(async(req, res, next) => {
  const product = await Product.findById(req.query.id);

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
});

//Delete a review
const deleteReview = catchAsyncErrors(async(req, res, next) => {
  const product = await Product.findById(req.query.productId);

  //productId- id of the product
  //id - id of the review

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, 
    {
      reviews,
      ratings, 
      numOfReviews
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  );

  res.status(200).json({
    success: true
  })
});

module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview
};
