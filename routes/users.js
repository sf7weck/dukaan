const express = require('express')
// const bodyParser = require('body-parser');
// const Customer = require('../models/customer.model.js')

// const app = express();
const router = express.Router();
// app.use(bodyParser.urlencoded({extended: false}));

const customerController = require('../controllers/customer.controller.js')
const paymentController = require('../controllers/payment.controller.js')
const { addCustomerValidationRules } = require('../validations/customer.validation.js')

router.get('/home', (req, res) => {
    res.status(200).send('<h1>Welcome to users home page</h1>');
})

// user authentication routes

router.post('/login')
router.post('/sign-up')
router.post('/reset-password')

// products routes
router.post('/add-product', (req, res) => {

})

router.post('/edit-product', (req, res) => {

})

router.post('/delete-product', (req, res) => {

})

// payments routes
router.post('/add-payment', paymentController.addPayment);

router.post('/:payment_id/edit-payment', paymentController.editPayment);

router.post('/:payment_id/delete-payment', paymentController.deletePayment);

// stocks routes
router.get('/view-stocks', (req, res) => {

})


// customer accounts details routes
router.post('/add-customer', addCustomerValidationRules, customerController.addCustomer);
// router.post('/add-customer', async (req, res) => {
//     try{
//         let postData = req.body;
//         let inserData = {
//             customer_type: 1,
//             first_name: postData.firstname,
//             middle_name: postData.middlename,
//             last_name: postData.lastname,
//             shop_name: postData.shopname,
//             marka: postData.marka,
//         };
//         // console.log(postData)
//         // console.log(inserData)
//         const customer = await Customer.create(inserData);
//         res.status(200).json(customer)
//     } catch(error){
//         res.status(400).json({message: error.message})
//     }
// })

router.get('/customer-list', customerController.getCustomerList)

router.get('/:customer_id/customer-products-list', customerController.getCustomerProductRecords)

router.get('/:customer_id/customer-payments-list', customerController.getCustomerPaymentRecords)


module.exports = router;