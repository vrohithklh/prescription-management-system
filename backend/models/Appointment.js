const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },

    appointmentDate: {
        type: Date,
        required: true,
    },

    reason: {
        type: String,
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Completed"],
        default: "Pending",
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model(
    "Appointment",
    appointmentSchema
);