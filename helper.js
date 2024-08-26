const ProductRecord = require('./models/productRecords.model.js');
const Customer = require('./models/customer.model.js');
const Payment = require('./models/payment.model.js');
const CONSTANTS = require('./constants.js');

const getTotalAmount = async (model, customerId, filter) => {
    try {
        const result = await model.aggregate([
            {
                $match: {
                    customer_id: customerId,
                    type: filter.type,
                    status: CONSTANTS.ACTIVE,
                    createdAt: {
                        $gte: filter.startDate,
                        $lte: filter.endDate
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalAmount: 1
                }
            }
        ]);

        return result.length > 0 ? result[0].totalAmount : 0;
    } catch (error) {
        console.error(`Error aggregating total amount: ${error.message}`);
        return 0;
    }
};

exports.getBalance = async (customerId, filter) => {
    try {
        const totalProductCredit = await getTotalAmount(ProductRecord, customerId, { type: CONSTANTS.CREDIT, ...filter });
        const totalProductDebit = await getTotalAmount(ProductRecord, customerId, { type: CONSTANTS.DEBIT, ...filter });

        const totalPaymentCredit = await getTotalAmount(Payment, customerId, { type: CONSTANTS.CREDIT, ...filter });
        const totalPaymentDebit = await getTotalAmount(Payment, customerId, { type: CONSTANTS.DEBIT, ...filter });

        const productBalance = totalProductCredit - totalProductDebit;
        const paymentBalance = totalPaymentCredit - totalPaymentDebit;
        const balance = productBalance - paymentBalance;

        return {
            "totalPaymentCredit": totalProductCredit,
            "totalPaymentDebit": totalProductDebit,
            "totalProductCredit": totalPaymentCredit,
            "totalProductDebit": totalPaymentDebit,
            "productBalance": productBalance,
            "paymentBalance": paymentBalance,
            "balance": balance,
        };
    } catch (error) {
        console.error(`Error calculating balance: ${error.message}`);
        return {"success": false, error: error.message};
    }
}
