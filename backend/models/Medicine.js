const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },

    category: {
        type: String,
    },

    manufacturer: {
        type: String,
    },

    stock: {
        type: Number,
        default: 0,
    },

    price: {
        type: Number,
    },

    expiryDate: {
        type: Date,
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model(
    "Medicine",
    medicineSchema
);