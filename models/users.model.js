const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
    {
        user_type: {
            type: Number,
            default: 2,
        },

        first_name: {
            type: String,
            required: [true, "Please enter a first name"],
            minlength: [2, "First name must be at least 2 characters long"],
            maxlength: [50, "First name cannot exceed 50 characters"],
            validate: {
                validator: function(v) {
                    return /^[A-Za-z]+$/.test(v);
                },
                message: props => `${props.value} is not a valid first name! Only alphabetic characters are allowed.`
            }
        },

        last_name: {
            type: String,
            required: false,
            minlength: [2, "Last name must be at least 2 characters long"],
            maxlength: [50, "Last name cannot exceed 50 characters"],
            validate: {
                validator: function(v) {
                    return /^[A-Za-z\s]+$/.test(v);
                },
                message: props => `${props.value} is not a valid last name! Only alphabetic characters and spaces are allowed.`
            }
        },

        mobile: {
            type: String,
            required: false,
            validate: {
                validator: function(v) {
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid mobile number!`
            },
        },

        email: {
            type: String,
            required: false,
            lowercase: true,
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            },
        },

        username: {
            type: String,
            required: [true, "Please enter a username"],
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [30, "Username cannot exceed 30 characters"],
            unique: true,
            validate: {
                validator: function(v) {
                    return /^[A-Za-z0-9]+$/.test(v);
                },
                message: props => `${props.value} is not a valid username! Only alphanumeric characters are allowed.`
            }
        },

        password: {
            type: String,
            required: [true, "Please enter a password"],
        },

        status: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
