const Doctor = require("../models/Doctor");
const User = require("../models/User");

const bcrypt = require("bcryptjs");

const createDoctor = async (req, res) => {

    try {

        const {

            name,
            email,
            specialization,
            experience,
            password,

        } = req.body;

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Doctor already exists",
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const doctor = await Doctor.create({

            name,
            email,
            specialization,
            experience,
            password: hashedPassword,
            role: "doctor",

        });

        await User.create({

            name,
            email,
            password: hashedPassword,
            role: "doctor",

        });

        res.status(201).json({

            message: "Doctor created successfully",

            doctor,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};
const addDoctor = async (req, res) => {

    try {

        const {
            name,
            email,
            specialization,
            experience,
            password,
        } = req.body;

        const doctorExists = await Doctor.findOne({
            email,
        });

        if (doctorExists) {

            return res.status(400).json({
                message: "Doctor already exists",
            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const doctor = await Doctor.create({

            name,
            email,
            specialization,
            experience,
            password: hashedPassword,

        });

        res.status(201).json({

            message: "Doctor added successfully",

            doctor,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const getDoctors = async (req, res) => {

    try {

        const doctors = await Doctor.find();

        res.status(200).json(doctors);

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};
const updateDoctor = async (req, res) => {

    try {

        const updatedDoctor = await Doctor.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
            }

        );

        res.status(200).json({

            message: "Doctor updated successfully",

            updatedDoctor,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const deleteDoctor = async (req, res) => {

    try {

        await Doctor.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Doctor deleted successfully",
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const getDoctorPatients = async (req, res) => {

    try {

        const doctorId = req.params.id;

        const patients = await User.find({

            role: "patient",

            assignedDoctor: doctorId,

        });

        res.status(200).json(patients);

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};
module.exports = {

    createDoctor,

    getDoctors,

    updateDoctor,

    deleteDoctor,

    getDoctorPatients,

};