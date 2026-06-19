const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    specialization: {
        type: String,
        required: true,
    },

    experience: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: "doctor",
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model(
    "Doctor",
    doctorSchema
);