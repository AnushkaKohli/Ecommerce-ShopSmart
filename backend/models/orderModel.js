const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address: {
            type: String, 
            required: [true, "Please enter an address"]
        },
        city: {
            type: String, 
            required: [true, "Please enter a city"]
        },
        state: {
            type: String, 
            required: [true, "Please enter a state"]
        },
        country: {
            type: String, 
            required: true,
            default: "India"
        },
        pinCode: {
            type: Number, 
            required: [true, "Please enter your pincode"]
        },
        phoneNo: {
            type: Number, 
            required: [true, "Please enter your phone number"]
        }
    },
    orderItems: [
        {
            name: {
                type: String, 
                required: [true, "Please enter product name"]
            },
            price: {
                type: Number, 
                required: [true, "Please enter product price"]
            },
            quantity: {
                type: Number, 
                required: [true, "Please enter product quantity"]
            },
            image: {
                type: String, 
                required: [true, "Please enter product image"]
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product", 
                required: true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    paymentInfo: {
        id: {
            type: String, 
            required: [true, "Please enter payment ID"]
        },
        status: {
            type: String, 
            required: [true, "Please enter payment status"]
        }
    },
    paidAt: {
        type: Date, 
        required: [true, "Please enter payment date"]
    },
    itemsPrice: {
        type: Number, 
        default: 0,
        required: true
    },
    taxPrice: {
        type: Number, 
        default: 0,
        required: true
    },
    shippingPrice: {
        type: Number, 
        default: 0,
        required: true
    },
    totalPrice: {
        type: Number, 
        default: 0,
        required: true
    },
    orderStatus: {
        type: String, 
        default: "Processing",
        required: true
    },
    deliveredAt: {
        type: Date, 
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;