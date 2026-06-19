const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Medicine = require("../models/Medicine");
const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");
const RefillRequest = require("../models/RefillRequest");

const getAnalytics = async (req, res) => {

    try {

        const totalDoctors =
            await Doctor.countDocuments();

        const totalPatients =
            await User.countDocuments({
                role: "patient",
            });

        const totalMedicines =
            await Medicine.countDocuments();

        const totalPrescriptions =
            await Prescription.countDocuments();

        const totalAppointments =
            await Appointment.countDocuments();

        const totalRefillRequests =
            await RefillRequest.countDocuments();

        res.status(200).json({

            totalDoctors,
            totalPatients,
            totalMedicines,
            totalPrescriptions,
            totalAppointments,
            totalRefillRequests,

        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    getAnalytics,
};