const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    medicines: [
        {
            medicineName: String,
            dosage: String,
            frequency: String,
            duration: String,
        },
    ],

    diagnosis: {
        type: String,
    },

    notes: {
        type: String,
    },

    status: {
        type: String,
        default: "Active",
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model(
    "Prescription",
    prescriptionSchema
);