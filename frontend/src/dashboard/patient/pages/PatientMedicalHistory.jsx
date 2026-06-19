import PatientLayout from "../layouts/PatientLayout";
import { useEffect, useState } from "react";
import axios from "axios";
const PatientMedicalHistory = () => {

const [history, setHistory] = useState([]);
const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        fetchHistory();

    }, []);

 const fetchHistory = async () => {

    try {

        const prescriptionsRes = await axios.get(
            "http://localhost:3000/prescriptions"
        );

        const appointmentsRes = await axios.get(
            "http://localhost:3000/appointments"
        );

        setHistory(prescriptionsRes.data);
        setAppointments(appointmentsRes.data);

    } catch (error) {

        console.log(error);

    }

};



    return (

        <PatientLayout>

            {/* Header */}

            <div className="mb-10">

                <h1 className="text-5xl font-black text-gray-900">
                    Medical History
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Complete record of appointments, prescriptions and medicines.
                </p>

            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                <div className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white p-8 rounded-[30px] shadow-xl">

                    <h3 className="font-semibold">
                        Appointments
                    </h3>

                    <p className="text-5xl font-black mt-4">
                        {appointments.length}
                    </p>

                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white p-8 rounded-[30px] shadow-xl">

                    <h3 className="font-semibold">
                        Prescriptions
                    </h3>

                    <p className="text-5xl font-black mt-4">
                        {history.length}
                    </p>

                </div>

                <div className="bg-gradient-to-r from-purple-500 to-indigo-700 text-white p-8 rounded-[30px] shadow-xl">

                    <h3 className="font-semibold">
                        Doctors Consulted
                    </h3>

                    <p className="text-5xl font-black mt-4">
                        {
new Set(
history.map(item => item.doctor)
).size
}
                    </p>

                </div>

                <div className="bg-gradient-to-r from-pink-500 to-rose-700 text-white p-8 rounded-[30px] shadow-xl">

                    <h3 className="font-semibold">
                        Active Medicines
                    </h3>

                    <p className="text-5xl font-black mt-4">
                        {
    history.filter(
        item => item.status === "Issued"
    ).length
}
                    </p>

                </div>

            </div>
<div className="bg-white rounded-[35px] shadow-xl border border-gray-100 overflow-hidden mb-10">

    <div className="p-8 border-b">

        <h2 className="text-3xl font-black text-gray-900">
            Appointment History
        </h2>

    </div>

    <div className="overflow-x-auto">

        <table className="w-full">

            <thead>

                <tr className="bg-gray-50">

                    <th className="p-5 text-left">Date</th>
                    <th className="p-5 text-left">Doctor</th>
                    <th className="p-5 text-left">Reason</th>
                    <th className="p-5 text-left">Status</th>

                </tr>

            </thead>

            <tbody>

                {appointments.map((item) => (

                    <tr
                        key={item.id}
                        className="border-t hover:bg-cyan-50"
                    >

                        <td className="p-5">
                            {item.date}
                        </td>

                        <td className="p-5">
                            {item.doctor}
                        </td>

                        <td className="p-5">
                            {item.reason}
                        </td>

                        <td className="p-5">

                            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                                {item.status}
                            </span>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>

</div>
            {/* Table */}

            <div className="bg-white rounded-[35px] shadow-xl border border-gray-100 overflow-hidden">

                <div className="p-8 border-b">

                    <h2 className="text-3xl font-black text-gray-900">
                        Treatment Records
                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="bg-gray-50">

                                <th className="p-5 text-left">
                                    Date
                                </th>

                                <th className="p-5 text-left">
                                    Doctor
                                </th>

                                <th className="p-5 text-left">
                                    Prescription
                                </th>

                                <th className="p-5 text-left">
                                    Medicine
                                </th>

                                <th className="p-5 text-left">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {history.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-cyan-50 transition"
                                >

                                    <td className="p-5 font-medium">
                                        {item.date}
                                    </td>

                                    <td className="p-5">
                                        {item.doctor}
                                    </td>

                                    <td className="p-5">
                                        RX-{item.id}
                                    </td>

                                    <td className="p-5">
                                        {item.medicineName}
                                    </td>

                                    <td className="p-5">

                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-bold ${item.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Bottom Summary */}

            <div className="mt-10 bg-gradient-to-r from-cyan-500 to-blue-700 text-white rounded-[35px] p-10 shadow-xl">

                <h2 className="text-4xl font-black">
                    Healthcare Journey
                </h2>

                <p className="mt-4 text-cyan-100 text-lg">
                    All your medical records, prescriptions, appointments,
                    medicines and consultations are securely maintained in one place.
                </p>

            </div>

        </PatientLayout>

    );

};

export default PatientMedicalHistory;