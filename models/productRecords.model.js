const mongoose = require('mongoose');
const Customer = require('../models/customer.model.js');


const ProductRecordsSchema = mongoose.Schema(
    {
        customer_id: {
            type: String,
            required: [true, 'Please provide a customer.'],
            validate: {
                validator: async function(value) {
                    // Check if the customer exists in the Customer collection
                    const customerExists = await Customer.exists({ _id: value });
                    return customerExists;
                },
                message: 'Customer does not exist.'
            }
        },

        type: {
            type: Number,
            required: [true, 'Please provide a Product type.'],
            validate: {
                validator: function(value){
                    return Number.isInteger(value) && value >= 0 && value <= 255;
                },
                message: 'Please provide a valid type.'
            }
        },

        carton: {
            type: Number,
            default: 1,
            validate: {
                validator: function(value){
                    return Number.isInteger(value);
                },
                message: 'Please provide a valid carton.'
            }
        },

        quantity: {
            type: Number,
            default: 0,
            validate: {
                validator: function(value){
                    return Number.isInteger(value);
                },
                message: 'Please provide a valid quantity.'
            }
        },

        quantity_short: {
            type: Number,
            default: 0,
            validate: {
                validator: function(value){
                    return Number.isInteger(value);
                },
                message: 'Please provide a valid qauntity short.'
            }
        },

        rate: {
            type: Number,
            required: [true, 'Please provide a rate.'],
            validate: {
                validator: function(value){
                    return /^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(value.toString());
                },
                message: 'Please provide a valid rate.'
            }
        },

        amount: {
            type: Number,
            default: 0,
            validate: {
                validator: function(value){
                    return Number.isInteger(value);
                },
                message: 'Please provide a valid amount.'
            }
        },

        status: {
            type: Number,
            default: 0,
            validate: {
                validator: function(value){
                    return Number.isInteger(value) && value >= 0 && value <= 255;
                },
                message: 'Please provide a valid status.'
            }
        },
    },
    {
        timestamps: true,
    }
);


const ProductRecord = mongoose.model("product_record", ProductRecordsSchema);

module.exports = ProductRecord;