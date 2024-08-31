const Payment = require('../models/payment.model.js');
const CONSTANTS = require('../constants.js');

exports.addPayment = async (req, res) => {
    let postData = req.body;
    if(!postData || postData == '' || postData == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    }
    try{
        let insertData = {
            type: postData.payment_type,    //credit => 1, debit => 0
            customer_id: postData.customer_id,
            amount: postData.amount,
            status: CONSTANTS.ACTIVE,
        }
        const addPayment = await Payment.create(insertData);
        res.status(200).json({ message: "Payment added successfully!!" });
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.editPayment = async (req, res) => {
    const paymentId = req.params.payment_id;
    let postData = req.body;

    if(!paymentId || !postData){
        res.status(400).json({message: "Invalid Data!!!"});
    }

    try{
        let updateData = {};
        if(postData.customerId) updateData.customer_id = postData.customerId;
        if(postData.amount !== undefined) updateData.amount = postData.amount;

        const updatePayment = await Payment.findByIdAndUpdate({_id: paymentId}, updateData, {new:true})

        if(!updatePayment) return res.status(404).json({ message: 'Payment record not found' });

        res.status(200).json({ message: 'Payment edited successfully!!' });
    } catch(error){
        res.status(500).json({message: error.message});
    }

}

exports.deletePayment = async (req, res) => {
    const paymentId = req.params.payment_id;

    if(!paymentId){
        res.status(400).json({message: "Invalid Data!!!"});
    }

    try{
        let updateData = {
            status: CONSTANTS.DELETE,
        };

        const updatePayment = await Payment.findByIdAndUpdate({_id: paymentId}, updateData, {new:true})

        if(!updatePayment) return res.status(404).json({ message: 'Payment record not found' });

        res.status(200).json({ message: 'Payment deleted successfully!!' });
    } catch(error){
        res.status(500).json({message: error.message});
    }
}