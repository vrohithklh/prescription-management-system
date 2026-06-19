const RefillRequest = require("../models/RefillRequest");

const createRefillRequest = async (req, res) => {

    try {

        const refillRequest = await RefillRequest.create(
            req.body
        );

        res.status(201).json({

            message: "Refill request created successfully",

            refillRequest,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const getRefillRequests = async (req, res) => {

    try {

        const refillRequests = await RefillRequest.find()

            .populate("patient")
            .populate("prescription");

        res.status(200).json(
            refillRequests
        );

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const updateRefillStatus = async (req, res) => {

    try {

        const refillRequest =
            await RefillRequest.findByIdAndUpdate(

                req.params.id,

                {
                    status: req.body.status,
                },

                {
                    new: true,
                }

            );

        res.status(200).json({

            message: "Refill request updated",

            refillRequest,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    createRefillRequest,
    getRefillRequests,
    updateRefillStatus,
};