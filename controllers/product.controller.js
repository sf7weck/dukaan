const Product = require('../models/product.model.js');
const ProductRecord = require('../models/productRecords.model.js');
const CONSTANTS = require('../constants.js');

exports.addNewProduct = async (req, res) => {
    let postData = req.body;
    if(postData == '' || postData == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    }

    try{
        let inserData = {
            name: postData.name,
            quantity: postData.quantity,
            rate: postData.rate,
        }
        const addProduct = Product.create(inserData);
        res.status(200).json({ message: 'New Product added successfully!!!'})
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.creditDailyProducts = async (req, res) => {
    let postData = req.body;
    if(postData == '' || postData == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    }  

    try{
        let inserData = {
            customer_id: postData.customerId,
            type: CONSTANTS.CREDIT,
            carton: postData.carton ?? 1,
            quantity: postData.quantity ?? 1,
            quantity_short: postData.quantityShort ?? 0,
            rate: postData.rate ?? 0,
            amount: '',
            status: CONSTANTS.ACTIVE
        }
        inserData.amount = inserData.carton * (inserData.quantity + inserData.quantity_short) * inserData.rate;
        const creditProduct = ProductRecord.create(inserData);
        res.status(200).json({ message: 'Daily Credit Product added successfully!!!'})
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.debitDailyProducts = async (req, res) => {
    let postData = req.body;
    if(postData == '' || postData == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    }  

    try{
        let inserData = {
            customer_id: postData.customerId,
            type: CONSTANTS.DEBIT,
            carton: postData.carton ?? 1,
            quantity: postData.quantity ?? 1,
            quantity_short: postData.quantityShort ?? 0,
            rate: postData.rate,
            status: CONSTANTS.ACTIVE
        }
        inserData.amount = inserData.carton * (inserData.quantity + inserData.quantity_short) * inserData.rate;
        const debitProduct = ProductRecord.create(inserData);
        res.status(200).json({ message: 'Daily Debit Product added successfully!!!'})
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

