import { useState } from "react";
import HospitalLayout from "../layouts/HospitalLayout";

const HospitalDoctors = () => {

    const [search, setSearch] = useState("");

    const doctors = [
        {
            id: "DOC001",
            name: "Dr. Sharma",
            specialization: "Cardiologist",
            experience: "12 Years",
            status: "Active",
        },
        {
            id: "DOC002",
            name: "Dr. Kumar",
            specialization: "Neurologist",
            experience: "9 Years",
            status: "Active",
        },
        {
            id: "DOC003",
            name: "Dr. Reddy",
            specialization: "General Physician",
            experience: "15 Years",
            status: "On Leave",
        },
        {
            id: "DOC004",
            name: "Dr. Smith",
            specialization: "Orthopedic",
            experience: "7 Years",
            status: "Active",
        },
    ];

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <HospitalLayout>

            {/* Header */}

            <div className="flex justify-between items-center flex-wrap gap-6 mb-10">

                <div>

                    <h1 className="text-6xl font-black text-slate-900">

                        Doctors Management

                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">

                        Manage hospital doctors and departments.

                    </p>

                </div>

                <button
                    className="px-8 py-4 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold shadow-xl hover:scale-105 transition"
                >
                    + Add Doctor
                </button>

            </div>

            {/* Analytics Cards */}

            <div className="grid lg:grid-cols-3 gap-8 mb-10">

                <div className="bg-gradient-to-r from-cyan-500 to-blue-700 rounded-[32px] p-8 text-white shadow-2xl">

                    <p className="text-cyan-100">

                        Total Doctors

                    </p>

                    <h2 className="text-6xl font-black mt-4">

                        128

                    </h2>

                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-700 rounded-[32px] p-8 text-white shadow-2xl">

                    <p className="text-green-100">

                        Active Doctors

                    </p>

                    <h2 className="text-6xl font-black mt-4">

                        119

                    </h2>

                </div>

                <div className="bg-gradient-to-r from-purple-500 to-indigo-700 rounded-[32px] p-8 text-white shadow-2xl">

                    <p className="text-purple-100">

                        Departments

                    </p>

                    <h2 className="text-6xl font-black mt-4">

                        16

                    </h2>

                </div>

            </div>

            {/* Search */}

            <div className="bg-white rounded-[32px] p-6 shadow-xl mb-10">

                <input
                    type="text"
                    placeholder="Search doctor by name or specialization..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-5 rounded-2xl border border-gray-200 outline-none focus:border-cyan-500"
                />

            </div>

            {/* Doctors Grid */}

            <div className="grid lg:grid-cols-2 gap-8">

                {filteredDoctors.length > 0 ? (

                    filteredDoctors.map((doctor) => (

                        <div
                            key={doctor.id}
                            className="relative overflow-hidden bg-white rounded-[36px] p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                        >

                            <div className="absolute top-[-40px] right-[-40px] w-[150px] h-[150px] bg-cyan-500/10 rounded-full blur-3xl"></div>

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="text-3xl font-black text-slate-900">

                                        {doctor.name}

                                    </h2>

                                    <p className="text-cyan-600 font-semibold mt-2">

                                        {doctor.specialization}

                                    </p>

                                </div>

                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-bold ${doctor.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {doctor.status}
                                </span>

                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-8">

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Doctor ID

                                    </p>

                                    <h3 className="font-black text-lg">

                                        {doctor.id}

                                    </h3>

                                </div>

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Experience

                                    </p>

                                    <h3 className="font-black text-lg">

                                        {doctor.experience}

                                    </h3>

                                </div>

                            </div>

                            <button
                                className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold shadow-lg hover:opacity-90"
                            >

                                View Profile

                            </button>

                        </div>

                    ))

                ) : (

                    <div className="col-span-2 bg-white rounded-[36px] p-12 text-center shadow-xl">

                        <h2 className="text-3xl font-black text-gray-800">

                            No Doctors Found

                        </h2>

                        <p className="text-gray-500 mt-4">

                            Try searching with another keyword.

                        </p>

                    </div>

                )}

            </div>

        </HospitalLayout>

    );

};

export default HospitalDoctors;