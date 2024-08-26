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
            type: Float32Array,
            required: [true, 'Please provide product rate.'],
            validate: {
                validator: function(value){
                    return /^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(value.toString());
                },
                message: 'Rate must be a valid number.'
            }
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;