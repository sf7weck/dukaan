require('dotenv').config();
const Users = require('../models/users.model.js');
const CONSTANTS = require('../constants.js');
const Helper = require('../helper.js');
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    let postData = req.body;
    if(!postData || postData == '' || postData == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    }

    // Check for validation errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    try {
        let response = {
            code: 200,
            message: '',
            access_token: ''
        }
        let userExists = await Users.findOne({
            $and: [
                { username: postData.username },
                { status: CONSTANTS.ACTIVE }
            ]
        }, '_id user_type first_name last_name username password');
        if(userExists){
            let verifyPassword = await Helper.verifyPassword(postData.password, userExists.password);
            if(verifyPassword){
                let tokenData = {
                    id: userExists._id,
                    firsname: userExists.first_name,
                    lastname: userExists.last_name,
                    type: userExists.user_type
                }
                let token = jwt.sign(tokenData, process.env.JWT_ACCESS_TOKEN_KEY)
                response.access_token = token
                response.code = 200;
                response.message = "Successfull";
            } else{
                response.code = 401;
                response.message = "Invalid Credentials";
            }
        }
        res.status(response.code).json({ access_token: response.access_token, message: response.message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    let postData = req.body;
    if(!postData || postData == '' || postData == undefined){
        res.status(400).json({message: 'Please provide valid data.'});
    }

    try {
        let hashedPassword = await Helper.hashPassword(postData.password);
        // res.status(200).json({ message: postData });
        const insertData = {
            first_name: postData.firstname,
            last_name: postData.lastname,
            mobile: postData?.mobile,
            email: postData?.email,
            username: postData.username,
            password: hashedPassword,
            status: CONSTANTS.ACTIVE,
        };

        const addUser = await Users.create(insertData);
        res.status(200).json({ message: "User registered successfully!!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}