const Appointment = require("../models/Appointment");

const createAppointment = async (req, res) => {

    try {

        const appointment = await Appointment.create(
            req.body
        );

        res.status(201).json({

            message: "Appointment booked successfully",

            appointment,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const getAppointments = async (req, res) => {

    try {

        const appointments = await Appointment.find()

            .populate("doctor")
            .populate("patient");

        res.status(200).json(
            appointments
        );

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const updateAppointmentStatus = async (req, res) => {

    try {

        const appointment =
            await Appointment.findByIdAndUpdate(

                req.params.id,

                {
                    status: req.body.status,
                },

                {
                    new: true,
                }

            );

        res.status(200).json({

            message: "Appointment updated",

            appointment,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
};