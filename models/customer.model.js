const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema(
    {
        customer_type: {
            type: String,
            required: [true, "Please enter a customer type"],
        },

        first_name: {
            type: String,
            required: [true, "Please enter a firstname"],
        },
        middle_name: {
            type: String,
            required: false,
        },

        last_name: {
            type: String,
            required: false,
        },

        shop_name: {
            type: String,
            required: [true, "Please enter a shop name"],
        },

        marka: {
            type: String,
            required: false,
        },

        balance: {
            type: String,
            default: 0,
        },

        status: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;