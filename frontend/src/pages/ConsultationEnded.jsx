import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const ConsultationEnded = () => {

    const navigate = useNavigate();
    const { state } = useLocation();

    const appointmentId = state?.appointmentId;

    const [prescription, setPrescription] = useState(null);

    useEffect(() => {

        fetchPrescription();

    }, []);

    const fetchPrescription = async () => {

        try {

            const { data } = await axios.get(
                `http://localhost:3000/prescriptions?appointmentId=${appointmentId}`
            );

            if (data.length > 0) {

                setPrescription(data[0]);

            }

        } catch (error) {

            console.log(error);

        }

    };

    const downloadPrescription = () => {

        if (!prescription) {

            alert("Prescription not found");
            return;

        }

        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Prescription Management System", 20, 20);

        doc.setFontSize(14);

        doc.text(
            `Appointment ID: ${appointmentId}`,
            20,
            40
        );

        doc.text(
            `Patient: ${prescription.patient}`,
            20,
            55
        );

        doc.text(
            `Doctor: ${prescription.doctor}`,
            20,
            70
        );

let y = 85;

doc.text("Medicines:", 20, y);

y += 10;

prescription.medicines?.forEach((med, index) => {

    doc.text(
        `${index + 1}. ${med.medicineName}`,
        20,
        y
    );

    y += 10;

    doc.text(
        `Dosage: ${med.dosage}`,
        30,
        y
    );

    y += 10;

    doc.text(
        `Duration: ${med.duration}`,
        30,
        y
    );

    y += 15;

});

doc.text(
    `Status: ${prescription.status}`,
    20,
    y
);

y += 15;

doc.text(
    `Notes: ${prescription.notes || "N/A"}`,
    20,
    y
);

        doc.save(
            `Prescription-${appointmentId}.pdf`
        );

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-100">

            <div className="bg-white p-10 rounded-[30px] shadow-2xl w-[600px] text-center">

                <div className="text-7xl mb-4">
                    ✅
                </div>

                <h1 className="text-4xl font-black text-gray-800">
                    Consultation Completed
                </h1>

                <p className="text-gray-500 mt-4">
                    Your consultation has ended successfully.
                </p>

                <div className="flex flex-col gap-4 mt-10">

                    <button
                        onClick={() =>
                            navigate("/view-prescription", {
                                state: {
                                    appointmentId,
                                },
                            })
                        }
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold"
                    >
                        View Prescription
                    </button>

                    <button
                        onClick={downloadPrescription}
                        className="bg-green-600 text-white py-4 rounded-2xl font-bold"
                    >
                        Download Prescription
                    </button>

                    <button
                        onClick={() =>
                            navigate("/patient/appointments")
                        }
                        className="bg-gray-700 text-white py-4 rounded-2xl font-bold"
                    >
                        Back To Appointments
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ConsultationEnded;