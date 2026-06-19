import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../../components/DoctorSidebar";
import Topbar from "../../../components/Topbar";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchPatients = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:3000/patients"
            );
            setPatients(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleDeletePatient = async (id) => {
        try {
            await axios.delete(
                `http://localhost:3000/patients/${id}`
            );
            fetchPatients();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-10 overflow-y-auto">
                <Topbar />

                <div className="mt-10">
                    <h1 className="text-5xl font-bold text-gray-800">
                        Patients Management
                    </h1>

                    <p className="text-gray-500 text-lg mt-3">
                        Monitor patient records and treatment statuses.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-blue-600 text-white p-6 rounded-3xl">
                        <h3>Total Patients</h3>
                        <p className="text-5xl font-bold mt-2">
                            {patients.length}
                        </p>
                    </div>

                    <div className="bg-green-600 text-white p-6 rounded-3xl">
                        <h3>Active Patients</h3>
                        <p className="text-5xl font-bold mt-2">
                            {patients.length}
                        </p>
                    </div>

                    <div className="bg-purple-600 text-white p-6 rounded-3xl">
                        <h3>Records</h3>
                        <p className="text-5xl font-bold mt-2">
                            {patients.length}
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <input
                        type="text"
                        placeholder="Search Patient ID or Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 px-5 py-3 rounded-2xl w-[350px]"
                    />
                </div>

                <div className="mt-10 bg-white rounded-3xl shadow-xl p-8 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-4">Patient ID</th>
                                <th className="text-left py-4">Name</th>
                                <th className="text-left py-4">Email</th>
                                <th className="text-left py-4">Role</th>
                                <th className="text-left py-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {patients
                                .filter(
                                    (patient, index) =>
                                        (`PAT${String(index + 1).padStart(3, "0")}`)
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase()) ||
                                        patient.name
                                            ?.toLowerCase()
                                            .includes(searchTerm.toLowerCase())
                                )
                                .map((patient, index) => (
                                    <tr key={patient.id} className="border-b">
                                        <td className="py-5">
                                            PAT{String(index + 1).padStart(3, "0")}
                                        </td>
                                        <td className="py-5 font-semibold">{patient.name}</td>
                                        <td className="py-5">{patient.email}</td>
                                        <td className="py-5">
                                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                                                {patient.role}
                                            </span>
                                        </td>
                                        <td className="py-5 flex gap-2">
                                            <button
                                                onClick={() =>
                                                    alert(
                                                        `Patient : ${patient.name}\nEmail : ${patient.email}\nRole : ${patient.role}`
                                                    )
                                                }
                                                className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-xl"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleDeletePatient(patient.id)}
                                                className="bg-red-100 text-red-600 px-4 py-2 rounded-xl"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Patients;
