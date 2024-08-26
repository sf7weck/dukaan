const express = require('express')

const router = express.Router();

router.get('/home', (req, res) => {
    res.status(200).send('<h1>Welcome to home page</h1>');
})

module.exports = router;