const mongoose = require('mongoose');

// Define the schema
const PaymentSchema = mongoose.Schema(
    {
        type: {
            type: Number,
            required: [true, "Please enter a customer type."],
            validate: {
                validator: function(value) {
                    return Number.isInteger(value) && value >= 0 && value <= 255; // Example for unsigned tinyInteger
                },
                message: props => `${props.value} is not a valid customer type.`
            }
        },

        customer_id: {
            type: String,
            required: [true, "Please enter a customer name."],
            trim: true,
            validate: {
                validator: function(value) {
                    // Ensure the customer_id is a string and does not contain scripts
                    return typeof value === 'string' && /^[a-zA-Z0-9\s]+$/.test(value);
                },
                message: 'Customer name must be a string and cannot contain special characters or scripts.'
            }
        },

        amount: {
            type: Number, // Define it as an array of numbers
            required: [true, "Please enter an amount."],
            validate: {
                validator: function(value) {
                    // Ensure all values are within the Int32 range
                    return value => Number.isInteger(value) && value >= -2147483648 && value <= 2147483647;
                },
                message: 'Please enter a valid amount.'
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
        timestamps: true
    }
);

// Create and export the model
const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
