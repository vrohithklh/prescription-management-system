import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const ViewPrescription = () => {

    const [prescriptions, setPrescriptions] = useState([]);
    const { state } = useLocation();

    const appointmentId = state?.appointmentId;
    console.log("View Prescription Appointment:", appointmentId);

    useEffect(() => {

        fetchPrescriptions();

    }, []);

    const fetchPrescriptions = async () => {
        const { data } = await axios.get(
            `http://localhost:3000/prescriptions?appointmentId=${appointmentId}`
        );

        console.log("Prescription Data:", data);

        setPrescriptions(data);
        try {

            const { data } = await axios.get(
                `http://localhost:3000/prescriptions?appointmentId=${appointmentId}`
            );

            setPrescriptions(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 p-10">

            <h1 className="text-5xl font-black text-gray-800 mb-10">
                My Prescriptions
            </h1>

            <div className="grid md:grid-cols-2 gap-8">

                {prescriptions.map((item) => (

                    <div
                        key={item.id}
                        className="bg-white rounded-[30px] shadow-xl p-8"
                    >

                        <div className="flex justify-between">

                          <h2 className="text-3xl font-black text-blue-700">
    Prescription
</h2>
                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                                {item.status}
                            </span>

                        </div>

                        <div className="grid grid-cols-2 gap-5 mt-8">
<div className="mt-6">

    <h3 className="font-bold text-lg mb-3">
        Medicines
    </h3>

    <div className="space-y-3">

        {item.medicines?.map((medicine, index) => (

            <div
                key={index}
                className="bg-blue-50 p-4 rounded-xl"
            >

                <p>
                    <strong>Medicine:</strong>{" "}
                    {medicine.medicineName}
                </p>

                <p>
                    <strong>Dosage:</strong>{" "}
                    {medicine.dosage}
                </p>

                <p>
                    <strong>Duration:</strong>{" "}
                    {medicine.duration}
                </p>

            </div>

        ))}

    </div>

</div>
                            <div>
                                <p className="text-gray-500">Patient</p>
                                <h3 className="font-bold">{item.patient}</h3>
                            </div>

                            <div>
                                <p className="text-gray-500">Doctor</p>
                                <h3 className="font-bold">{item.doctor}</h3>
                            </div>

                            <div>
                                <p className="text-gray-500">Dosage</p>
                                <h3 className="font-bold">{item.dosage}</h3>
                            </div>

                            <div>
                                <p className="text-gray-500">Duration</p>
                                <h3 className="font-bold">{item.duration}</h3>
                            </div>

                        </div>

                        <div className="mt-6">

                            <p className="text-gray-500">
                                Doctor Notes
                            </p>

                          <div className="bg-blue-50 p-4 rounded-2xl mt-2">
    {item.notes || "No notes provided by doctor"}
</div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default ViewPrescription;