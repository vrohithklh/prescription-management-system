const Prescription = require("../models/Prescription");

const createPrescription = async (req, res) => {

    try {

        const prescription = await Prescription.create(
            req.body
        );

        res.status(201).json({

            message: "Prescription created successfully",

            prescription,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const getPrescriptions = async (req, res) => {

    try {

        const prescriptions = await Prescription.find()

            .populate("doctor")

            .populate("patient");

        res.status(200).json(
            prescriptions
        );

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};
const updatePrescription = async (req, res) => {

    try {

        const prescription = await Prescription.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({

            message: "Prescription updated successfully",

            prescription,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const deletePrescription = async (req, res) => {

    try {

        await Prescription.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            message: "Prescription deleted successfully",

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};
module.exports = {
    createPrescription,
    getPrescriptions,
    updatePrescription,
    deletePrescription,
};