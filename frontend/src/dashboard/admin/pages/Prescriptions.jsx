import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../layouts/AdminLayout";

const Prescriptions = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {

        const fetchPrescriptions = async () => {

            try {

                const { data } = await axios.get(
                    "http://localhost:3000/prescriptions"
                );

                setPrescriptions(data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchPrescriptions();

    }, []);
    const deletePrescriptionHandler = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/prescriptions/${id}`
            );

            setPrescriptions(
                prescriptions.filter(
                    (item) => item.id !== id
                )
            );

            alert("Prescription deleted successfully");

        }

        catch (error) {

            console.log(error);

            alert("Delete failed");

        }

    };
    return (

        <AdminLayout>

            <div className="flex items-center justify-between mb-12 flex-wrap gap-6">

                <div>

                    <h1 className="text-6xl font-black text-gray-900">

                        Prescription Monitoring

                    </h1>

                    <p className="text-gray-500 mt-4 text-lg">

                        Monitor prescriptions, medicines, and healthcare activities.

                    </p>

                </div>

                <div className="px-8 py-4 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold">
                    Total Prescriptions : {prescriptions.length}
                </div>

            </div>

            <div className="mb-10">
                <input
                    type="text"
                    placeholder="Search by Prescription ID or Patient Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full lg:w-[420px] bg-white border border-cyan-100 rounded-3xl px-6 py-5 outline-none"
                />

            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">

                <div className="bg-gradient-to-br from-cyan-500 to-blue-700 rounded-[32px] p-8 text-white">

                    <p>Total Prescriptions</p>

                    <h1 className="text-6xl font-black mt-5">

                        {prescriptions.length}

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-[32px] p-8 text-white">

                    <p>Active Records</p>

                    <h1 className="text-6xl font-black mt-5">

                        {
                            prescriptions.filter(
                                (item) => item.status === "Active"
                            ).length
                        }

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-pink-500 to-rose-700 rounded-[32px] p-8 text-white">

                    <p>Pending Reviews</p>

                    <h1 className="text-6xl font-black mt-5">

                        {
                            prescriptions.filter(
                                (item) => item.status === "Pending"
                            ).length
                        }

                    </h1>

                </div>

            </div>

            <div className="relative overflow-hidden bg-white border border-cyan-100 rounded-[40px] shadow-2xl p-8">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-200 text-left">

                                <th className="pb-6">Prescription ID</th>
                                <th className="pb-6">Patient</th>
                                <th className="pb-6">Doctor</th>
                                <th className="pb-6">Medicine</th>
                                <th className="pb-6">Status</th>
                                <th className="pb-6">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {prescriptions
                                .filter((item) =>
                                    item.patient
                                        ?.toLowerCase()
                                        .includes(searchTerm.toLowerCase()) ||

                                    `PRS${String(item.id).padStart(3, "0")}`
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-100 hover:bg-cyan-50"
                                    >

                                        <td className="py-6 font-bold text-cyan-600">

                                            PRS{String(item.id).padStart(3, "0")}

                                        </td>

                                        <td className="py-6">

                                            {item.patient?.name || item.patient}

                                        </td>

                                        <td className="py-6">

                                            {item.doctor?.name || item.doctor}

                                        </td>

                                        <td className="py-6">

                                            {item.medicine || item.medicineName}

                                        </td>

                                        <td className="py-6">

                                            <span
                                                className={`px-4 py-2 rounded-full text-sm font-bold ${item.status === "Active"
                                                    ? "bg-green-100 text-green-600"
                                                    : item.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >

                                                {item.status}

                                            </span>

                                        </td>

                                        <td className="py-6 flex gap-4">
                                            <button
                                                onClick={() =>
                                                    alert(`
Prescription ID : PRS${String(item.id).padStart(3, "0")}

Patient : ${item.patient}

Doctor : ${item.doctor}

Diagnosis : ${item.diagnosis || "Not Available"}

Medicine : ${item.medicine || item.medicineName}

Dosage : ${item.dosage}

Duration : ${item.duration}

Instructions : ${item.instructions || "Not Available"}

Follow Up : ${item.followUpDate || "Not Available"}
`)

                                                }
                                                className="px-5 py-2 rounded-2xl bg-blue-100 text-blue-700"
                                            >

                                                View

                                            </button>
                                            <button
                                                onClick={() => deletePrescriptionHandler(item.id)}
                                                className="px-5 py-2 rounded-2xl bg-red-100 text-red-600"
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

        </AdminLayout >

    );

};

export default Prescriptions;