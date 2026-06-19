const User = require("../models/User");
const bcrypt = require("bcryptjs")
const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");
const RefillRequest = require("../models/RefillRequest");

const getPatientDashboard = async (req, res) => {

    try {

        const patientId = req.params.id;

        const prescriptions = await Prescription.find({
            patient: patientId,
        });

        const appointments = await Appointment.find({
            patient: patientId,
        });

        const refillRequests = await RefillRequest.find({
            patient: patientId,
        });

        res.status(200).json({

            prescriptions,

            appointments,

            refillRequests,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const createPatient = async (req, res) => {

    try {

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const patient = await User.create({

            ...req.body,

            password: hashedPassword,

            role: "patient",

            assignedDoctor:
                req.body.assignedDoctor || null,

        });

        res.status(201).json({

            message: "Patient created successfully",

            patient,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const getPatients = async (req, res) => {

    try {

        const patients = await User.find({
            role: "patient",
        });

        res.status(200).json(
            patients
        );

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const updatePatient = async (req, res) => {

    try {

        const patient = await User.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
            }

        );

        res.status(200).json({

            message: "Patient updated successfully",

            patient,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const deletePatient = async (req, res) => {

    try {

        await User.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            message: "Patient deleted successfully",

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {

    getPatientDashboard,

    createPatient,

    getPatients,

    updatePatient,

    deletePatient,

};