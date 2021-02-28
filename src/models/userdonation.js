const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email id!")
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    dbirr: {
        type: String,
        required: true,
        min: 10
    },
    bank: {
        type: String,
        required: true,
        minLength: 3
    },
    country: {
        type: String,
        required: true,
        minLength: 3
    },
    city: {
        type: String,
        required: true,
        minLength: 3
    },
    address: {
        type: String,
        required: true,
        minLength: 3
    },
    reason: {
        type: String,
        required: true,
        minLength: 3
    }
})

// create collection

const User = mongoose.model("User", userSchema);
module.experts = User;