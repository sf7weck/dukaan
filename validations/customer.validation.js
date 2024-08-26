const { body } = require('express-validator');

// Validation rules for adding a customer
const addCustomerValidationRules = [
    body('firstname')
        .notEmpty().withMessage('First name is required')
        .matches(/^[a-zA-Z\s]+$/).withMessage('First name can only contain letters and spaces')
        .trim()
        .escape(),  // This will sanitize input to prevent scripts
    
    body('middlename')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Middle name can only contain letters and spaces')
        .trim()
        .escape(),  // This will sanitize input to prevent scripts

    body('lastname')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Last name can only contain letters and spaces')
        .trim()
        .escape(),  // This will sanitize input to prevent scripts

    body('shopname')
        .notEmpty().withMessage('Shop name is required')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('Shop name can only contain letters and spaces')
        .trim()
        .escape(),  // This will sanitize input to prevent scripts

    body('marka')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('Marka name can only contain letters and spaces')
        .trim()
        .escape(),  // This will sanitize input to prevent scripts
];

module.exports = { addCustomerValidationRules };
