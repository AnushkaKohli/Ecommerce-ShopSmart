const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create new order
const newOrder = catchAsyncErrors(async(req, res, next) => {
    const {
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        message:"Order created successfully!",
        order
    });
});

//Get single order - Admin
const getSingleOrder = catchAsyncErrors(async(req, res, next) => {
    //By using the populate function, we use the id of the user stored in "user" and find its respective name and email
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

//Get logged in user orders
const myOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success: true,
        orders
    });
});

//Get all orders
const getAllOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount = totalAmount + order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount: totalAmount,
        orders
    });
});

//Update Order Status - Admin
const updateOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("This order has already been delivered", 404));
    }
    //Updating the stock
    //order is the object present in orderItems array
    order.orderItems.forEach(async (ob) => {
        await updateStock(ob.product, ob.quantity);
    })

    order.orderStatus = req.body.status;

    //Previous on to check the order status already present. This is to check the order status after updation
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: `Order status updated successfully: ${order.orderStatus}`
    });
});

async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.Stock = product.Stock - quantity;
    await product.save({ validateBeforeSave: false });
}

//Delete order - Admin
const deleteOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    });
});

module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
}