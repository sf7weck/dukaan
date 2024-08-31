const { validationResult } = require('express-validator');
const Customer = require('../models/customer.model.js');
const Payment = require('../models/payment.model.js');
const ProductRecord = require('../models/productRecords.model.js');
const CONSTANTS = require('../constants.js');
const Helper = require('../helper.js');

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
        const insertData = {
            customer_type: postData.customer_type,
            first_name: postData.firstname,
            middle_name: postData.middlename,
            last_name: postData.lastname,
            shop_name: postData.shopname,
            marka: postData.marka,
            status: CONSTANTS.ACTIVE,
        };

        const addCustomer = await Customer.create(insertData);
        res.status(200).json({ message: "Customer added successfully!!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCustomerList = async (req, res) => {
    try{
        let filter = req.params;
        const list = await Customer.find({
            $and: [
                { customer_type: filter.type ?? CONSTANTS.DEBIT },
                { shop_name: { $ne: '' } },
                { status: CONSTANTS.ACTIVE }
            ],
        }, '_id shop_name marka');

        for(let customer of list){
            let balance = await Helper.getBalance(customer._id);
            customer.balance = balance;
        }
        res.status(200).json({ data: list, message: "Successfull!!" });
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};

exports.getCustomerProductRecords = async (req, res) => {
    let filter = req.params;
    if(!filter.customer_id){
        res.status(400).json({message: "Invalid Customer!!!"})
    }

    try{
        let dates = await Helper.formatInputDate(filter, 30);
        if(!dates.success){ res.status(400).json({ data: {}, message: dates.message }); }
        let list = await ProductRecord.find({
            $and: [
                { customer_id: filter.customer_id },
                { status: CONSTANTS.ACTIVE },
                { createdAt: { $gte: dates.start_date } },
                { createdAt: { $lte: dates.end_date } }
            ]
        }, 'type carton quantity quantity_short rate amount createdAt').sort({ createdAt: -1 });
        res.status(200).json({ data: list, message: "Successfull!!"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getCustomerPaymentRecords = async (req, res) => {
    let filter = req.params;
    console.log(filter)
    if(!filter.customer_id){
        res.status(400).json({message: "Invalid Customer!!!"})
    }

    try{
        let dates = await Helper.formatInputDate(filter, 30);
        if(!dates.success){ res.status(400).json({ data: {}, message: dates.message }); }
        let list = await Payment.find({
            $and: [
                { customer_id: filter.customer_id },
                { status: CONSTANTS.ACTIVE },
                { createdAt: { $gte: dates.start_date } },
                { createdAt: { $lte: dates.end_date } }
            ]
        }, 'type customer_id amount createdAt').sort({ createdAt: -1 });
        res.status(200).json({ data: list, message: "Successfull!!" });
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.editCustomer = async (req, res) => {
    let customerId = req?.params?.customer_id;
    if(!customerId){
        res.status(400).json({ message: "Invalid data!!"});
    }

    let postData = req.body;
    if(!postData){
        res.status(400).json({message: 'Please provide valid data.'});
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        let editData = {
            first_name: postData.firstname,
            middle_name: postData.middlename,
            last_name: postData.lastname,
            shop_name: postData.shopname,
            marka: postData.marka,
        }
        const editResponse = await Customer.findByIdAndUpdate({ _id: customerId },editData, { new: true });
        if(!editResponse) return res.status(400).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer edited successfully!!!'})
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}
