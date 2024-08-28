const Product = require('../models/product.model.js');
const ProductRecord = require('../models/productRecords.model.js');
const Helper = require('../helper.js');
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
            available: CONSTANTS.INACTIVE,
        }
        const addProduct = await Product.create(inserData);
        res.status(200).json({ message: 'New Product added successfully!!!'})
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.productList = async (req, res) => {
    try{
        let list = await Product.find({
            $and: [
                { status: CONSTANTS.ACTIVE },
            ]
        }, "_id name quantity available").sort({ createdAt: -1 });
        res.status(200).json({ data: list, message: 'Successfully!!!'})
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.editProduct = async (req, res) => {
    const productId = req.params.product_id;
    let postData = req.body;
    if(!productId || postData == '' || postData == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    }  

    try{
        let editData = {
            name: postData.name,
            quantity: postData.quantity,
            rate: postData.rate,
            status: CONSTANTS.ACTIVE
        }
        const editProduct = await ProductRecord.findByIdAndUpdate({_id: productId}, editData, {new:true});
        if(!editProduct) return res.status(404).json({ message: 'Product record not found' });
        res.status(200).json({ message: 'Product edited successfully!!!'})
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    const productId = req.params.product_id;
    if(!productId || productId == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    } 

    try{
        const deleteProduct = await Product.findByIdAndUpdate({ _id: productId }, { status: CONSTANTS.DELETE }, {new:true});
        if(!deleteProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully!!!'})
    } catch(error){
        res.status(500).json({ message: error.message });
    }

}

exports.productHistory = async (req, res) => {
    const filter = req.params;

    if(!filter.product_id){
        res.status(400).json({message: "Invalid Data!!!"});
    }

    try{
        let dates = await Helper.formatInputDate(filter, 30);
        if(!dates.success){ res.status(400).json({ data: {}, message: dates.message }); }
        let history = await ProductRecord.find({        // need to add relation and get shop name from where product has been credited/debited and pass to frontend
            $and: [
                { product_id: filter.product_id },
                { status: CONSTANTS.ACTIVE },
                { createdAt:{ $gte: dates.start_date } },
                { createdAt:{ $lte: dates.end_date } },
            ]
        }, "customer_id product_id type carton quantity quantity_short rate amount").sort({ createdAt: -1 });

        res.status(200).json({ data: history, message: "Successfull!!" });
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.dailyProductsEntry = async (req, res) => {
    let postData = req.body;
    if(postData == '' || postData == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    }  

    try{
        let inserData = {
            customer_id: postData.customerId,
            product_id: postData.productId,
            type: postData.type,
            carton: postData.carton ?? 1,
            quantity: postData.quantity ?? 1,
            quantity_short: postData.quantityShort ?? 0,
            rate: postData.rate ?? 0,
            amount: '',
            status: CONSTANTS.ACTIVE
        }
        inserData.amount = inserData.carton * (inserData.quantity + inserData.quantity_short) * inserData.rate;
        const creditProduct = await ProductRecord.create(inserData);
        res.status(200).json({ message: 'Product added successfully!!!'})
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.editProductEntry = async (req, res) => {
    const entryId = req.params.entry_id;
    let postData = req.body;
    if(!entryId || postData == '' || postData == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    }  

    try{
        let editData = {
            type: postData.type,
            product_id: postData.productId,
            carton: postData.carton ?? 1,
            quantity: postData.quantity ?? 1,
            quantity_short: postData.quantityShort ?? 0,
            rate: postData.rate,
            status: CONSTANTS.ACTIVE
        }
        editData.amount = editData.carton * (editData.quantity + editData.quantity_short) * editData.rate;
        const editProduct = await ProductRecord.findByIdAndUpdate({_id: entryId}, editData, {new:true});
        if(!editProduct) return res.status(404).json({ message: 'Product record not found' });
        res.status(200).json({ message: 'Product edited successfully!!!'})
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProductEntry = async (req, res) => {
    const entryId = req.params.entry_id;

    if(!entryId){
        res.status(400).json({message: "Invalid Data!!!"});
    }

    try{
        const deleteProduct = await ProductRecord.findByIdAndUpdate({_id: entryId}, { status: CONSTANTS.DELETE }, {new:true})
        if(!deleteProduct) return res.status(404).json({ message: 'Product record not found' });
        res.status(200).json({ message: 'Product deleted successfully!!' });
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

