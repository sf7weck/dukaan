const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide product name.'],
            validate: {
                validator: function(value){
                    return typeof value === 'string' && /^[a-zA-Z\s]+$/.test(value);
                },
                message: 'Please provide a valid product name.'
            }
        },

        quantity: {
            type: Number,
            required: [true, 'Please provide product quantity.'],
            validate: {
                validator: function(value){
                    return Number.isInteger(value);
                },
                message: 'Please provide a valid product quantity.'
            }
        },

        rate: {
            type: Number,  // Use Number instead of Float32Array
            required: [true, 'Please provide product rate.'],
            validate: {
                validator: function(value) {
                    return /^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(value.toString());
                },
                message: 'Rate must be a valid number.'
            }
        },
        
        available: {
            type: Number,
            required: [true, 'Please provide available stock.'],
            validate: {
                validator: function(value){
                    return Number.isInteger(value);
                },
                message: 'Please provide a valid available stock.'
            }
        },

        status: {
            type: Number,
            required: [true, "Please provide status."],
            validate: {
                validator: function(value) {
                    return Number.isInteger(value) && value >= 0 && value <= 255; // Example for unsigned tinyInteger
                },
                message: props => `${props.value} is not a valid status.`
            }
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;