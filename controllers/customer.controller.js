const { validationResult } = require('express-validator');
const Customer = require('../models/customer.model.js');
const Payment = require('../models/payment.model.js');
const ProductRecord = require('../models/productRecords.model.js');
const CONSTANTS = require('../constants.js');

exports.addCustomer = async (req, res) => {
    let postData = req.body;
    if(!postData || postData == '' || postData == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // let postData = req.body;
        const insertData = {
            customer_type: postData.type,
            first_name: postData.firstname,
            middle_name: postData.middlename,
            last_name: postData.lastname,
            shop_name: postData.shopname,
            marka: postData.marka,
            status: CONSTANTS.ACTIVE,
        };

        const addCustomer = await Customer.create(insertData);
        res.status(200).json(addCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCustomerList = async (req, res) => {
    try{
        let filter = req.params;
        const list = await Customer.find({
            $and: [                     // Using $and for multiple conditions
                { customer_type: filter.type ?? CONSTANTS.DEBIT },  // Condition 1
                { shop_name: { $ne: '' } }  // Condition 2: shop_name not equal to an empty string
            ],
            // $or: [                     // Using $or to include alternative conditions
            //     { status: 1 },        // Condition 1 for $or
            //     { status: 2 }         // Condition 2 for $or
            // ]
        }, '_id shop_name marka');
        res.status(200).json(list);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};

exports.getCustomerProductRecords = async (req, res) => {
    const customerId = req.params.customer_id;
    if(!customerId){
        res.status(400).json({message: "Invalid Customer!!!"})
    }

    try{
        let list = await ProductRecord.find({
            $and: [
                { customer_id: customerId },
                { status: CONSTANTS.ACTIVE }
            ]
        }, 'type carton quantity quantity_short rate amount createdAt');
        res.status(200).json(list);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getCustomerPaymentRecords = async (req, res) => {
    const customerId = req.params.customer_id;
    if(!customerId){
        res.status(400).json({message: "Invalid Customer!!!"})
    }

    try{
        let list = await Payment.find({
            $and: [
                { customer_id: customerId },
                { status: CONSTANTS.ACTIVE }
            ]
        }, 'type amount createdAt');
        res.status(200).json(list);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};
