const mongoose = require("mongoose");

const refillRequestSchema = new mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription",
        required: true,
    },

    medicineName: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model(
    "RefillRequest",
    refillRequestSchema
);