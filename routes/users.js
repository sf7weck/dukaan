const express = require('express')

const router = express.Router();

const customerController = require('../controllers/customer.controller.js')
const paymentController = require('../controllers/payment.controller.js')
const productController = require('../controllers/product.controller.js')
const { addCustomerValidationRules } = require('../validations/customer.validation.js')

router.get('/home', (req, res) => {
    res.status(200).send('<h1>Welcome to users home page</h1>');
})

// user authentication routes

router.post('/login')
router.post('/sign-up')
router.post('/reset-password')

// products routes
router.post('/add-new-product', productController.addNewProduct);
router.post('/product-list', productController.productList);
router.post('/product-history', productController.productHistory);
router.post('/:product_id/edit-product', productController.editProduct);
router.post('/:product_id/delete-product', productController.deleteProduct);

router.post('/daily-product-entry', productController.dailyProductsEntry);
router.post('/:entry_id/edit-product-entry', productController.editProductEntry);
router.post('/:entry_id/delete-product-entry', productController.deleteProductEntry);

// payments routes
router.post('/add-payment', paymentController.addPayment);
router.post('/:payment_id/edit-payment', paymentController.editPayment);
router.post('/:payment_id/delete-payment', paymentController.deletePayment);

// stocks routes
router.get('/view-stocks', );


// customer accounts details routes
router.post('/add-customer', addCustomerValidationRules, customerController.addCustomer);
router.get('/customer-list', customerController.getCustomerList)
router.get('/:customer_id/customer-products-list', customerController.getCustomerProductRecords)
router.get('/:customer_id/customer-payments-list', customerController.getCustomerPaymentRecords)

module.exports = router;