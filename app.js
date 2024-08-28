require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to the database.")
    app.listen(3000);
}).catch(()=>{
    console.log("Connection failed.")
})
const adminRoutes = require('../dukaan/routes/admin');
const usersRoutes = require('../dukaan/routes/users');

app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/users', usersRoutes);

app.use((req, res) => {
    res.status(404).send("<h1>Page not found</h1>");
});
