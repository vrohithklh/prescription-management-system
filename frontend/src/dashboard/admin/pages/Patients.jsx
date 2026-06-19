import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../layouts/AdminLayout";
const Patients = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState([]);

    useEffect(() => {

        const fetchPatients = async () => {

            try {

                const { data } = await axios.get(
                    "http://localhost:3000/patients"
                );

                setPatients(data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchPatients();

    }, []);

    const deletePatientHandler = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/patients/${id}`
            );

            setPatients(
                patients.filter(
                    (patient) => patient.id !== id
                )
            );

            alert("Patient removed successfully");

        }

        catch (error) {

            console.log(error);

            alert("Delete failed");

        }

    };
    const viewPatientHandler = (patient) => {

        alert(`
Patient ID : PAT${String(patient.id).padStart(3, "0")}

Name : ${patient.name}

Email : ${patient.email}

Assigned Doctor : ${patient.assignedDoctor || "Not Assigned"}

Problem : ${patient.problem || "Not Available"}

Total Bill : ₹${patient.totalBill || 0}

Paid Amount : ₹${patient.paidAmount || 0}

Remaining Amount : ₹${patient.remainingAmount || 0}
`);

    };
    return (

        <AdminLayout>

            <div className="flex items-center justify-between mb-12 flex-wrap gap-6">

                <div>

                    <h1 className="text-6xl font-black text-gray-900">

                        Patient Management

                    </h1>

                    <p className="text-gray-500 mt-4 text-lg">

                        Monitor patient records, treatments, and healthcare activities.

                    </p>

                </div>
                <div className="px-8 py-4 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold">
                    Total Patients : {patients.length}
                </div>
            </div>

            <div className="mb-10">

                <input
                    type="text"
                    placeholder="Search by Patient ID or Name..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="w-full lg:w-[420px] bg-white border border-cyan-100 rounded-3xl px-6 py-5 outline-none shadow-lg"
                />

            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">

                <div className="bg-gradient-to-br from-cyan-500 to-blue-700 rounded-[32px] p-8 text-white shadow-2xl">

                    <p className="text-cyan-100">

                        Total Patients

                    </p>

                    <h1 className="text-6xl font-black mt-5">

                        {patients.length}

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-[32px] p-8 text-white shadow-2xl">

                    <p className="text-green-100">

                        Active Cases

                    </p>

                    <h1 className="text-6xl font-black mt-5">

                        {patients.length}

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-pink-500 to-rose-700 rounded-[32px] p-8 text-white shadow-2xl">

                    <p className="text-pink-100">

                        Critical Cases

                    </p>

                    <h1 className="text-6xl font-black mt-5">

                        0

                    </h1>

                </div>

            </div>

            <div className="relative overflow-hidden bg-white border border-cyan-100 rounded-[40px] shadow-2xl p-8">

                <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-cyan-400/10 blur-3xl rounded-full"></div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-200 text-left">

                                <th className="pb-6 text-gray-500 text-lg">

                                    Patient ID

                                </th>

                                <th className="pb-6 text-gray-500 text-lg">

                                    Name

                                </th>

                                <th className="pb-6 text-gray-500 text-lg">

                                    Email

                                </th>

                                <th className="pb-6 text-gray-500 text-lg">

                                    Status

                                </th>

                                <th className="pb-6 text-gray-500 text-lg">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {patients
                                .filter((patient) =>
                                    patient.name
                                        ?.toLowerCase()
                                        .includes(searchTerm.toLowerCase()) ||

                                    `PAT${String(patient.id).padStart(3, "0")}`
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((patient) => (

                                    <tr
                                        key={patient.id}
                                        className="border-b border-gray-100 hover:bg-cyan-50 transition-all duration-300"
                                    >

                                        <td className="py-6 font-bold text-cyan-600">

                                            PAT{String(patient.id).padStart(3, "0")}

                                        </td>

                                        <td className="py-6 font-semibold text-gray-800">

                                            {patient.name}

                                        </td>

                                        <td className="py-6 text-gray-600">

                                            {patient.email}

                                        </td>

                                        <td className="py-6">

                                            <span className="px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-600">

                                                Active

                                            </span>

                                        </td>

                                        <td className="py-6 flex gap-4">

                                            <button
                                                onClick={() => viewPatientHandler(patient)}
                                                className="px-5 py-2 rounded-2xl bg-blue-100 text-blue-700 font-bold"
                                            >

                                                View

                                            </button>

                                            <button
                                                onClick={() => deletePatientHandler(patient.id)}
                                                className="px-5 py-2 rounded-2xl bg-red-100 text-red-600 font-bold"
                                            >

                                                Remove

                                            </button>

                                        </td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

};

export default Patients;