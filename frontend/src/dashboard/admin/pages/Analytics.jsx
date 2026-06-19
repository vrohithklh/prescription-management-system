import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../layouts/AdminLayout";

const Analytics = () => {

    const [analytics, setAnalytics] = useState({});

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const [
                    doctors,
                    patients,
                    prescriptions,
                    medicines,
                    appointments,
                    refills,
                ] = await Promise.all([

                    axios.get("http://localhost:3000/doctors"),

                    axios.get("http://localhost:3000/patients"),

                    axios.get("http://localhost:3000/prescriptions"),

                    axios.get("http://localhost:3000/medicines"),

                    axios.get("http://localhost:3000/appointments"),

                    axios.get("http://localhost:3000/refills"),

                ]);

                setAnalytics({

                    totalDoctors: doctors.data.length,

                    totalPatients: patients.data.length,

                    totalPrescriptions: prescriptions.data.length,

                    totalMedicines: medicines.data.length,

                    totalAppointments: appointments.data.length,

                    totalRefills: refills.data.length,

                });

            } catch (error) {

                console.log(error);

            }

        };

        fetchAnalytics();

    }, []);
    return (

        <AdminLayout>

            <div className="flex items-center justify-between mb-12 flex-wrap gap-6">

                <div>

                    <h1 className="text-6xl font-black text-gray-900">

                        Healthcare Analytics

                    </h1>

                    <p className="text-gray-500 mt-4 text-lg">

                        Live statistics from JSON Server.

                    </p>

                </div>

            </div>

            <div className="grid lg:grid-cols-5 gap-8">

                <div className="bg-gradient-to-br from-cyan-500 to-blue-700 rounded-[32px] p-8 text-white">

                    <p>Doctors</p>

                    <h1 className="text-6xl font-black mt-5">

                        {analytics.totalDoctors || 0}

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-[32px] p-8 text-white">

                    <p>Patients</p>

                    <h1 className="text-6xl font-black mt-5">

                        {analytics.totalPatients || 0}

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-pink-500 to-rose-700 rounded-[32px] p-8 text-white">

                    <p>Prescriptions</p>

                    <h1 className="text-6xl font-black mt-5">

                        {analytics.totalPrescriptions || 0}

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-[32px] p-8 text-white">

                    <p>Medicines</p>

                    <h1 className="text-6xl font-black mt-5">

                        {analytics.totalMedicines || 0}

                    </h1>

                </div>
                <div className="bg-gradient-to-br from-violet-500 to-purple-700 rounded-[16px] p-8 text-white">

                    <p>Refills</p>

                    <h1 className="text-6xl font-black mt-5">

                        {analytics.totalRefills || 0}

                    </h1>

                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 mt-14">

                <div className="bg-white rounded-[40px] p-10 shadow-2xl">

                    <h2 className="text-4xl font-black">

                        System Activity

                    </h2>

                    <div className="mt-10 space-y-6">

                        <div className="flex justify-between">

                            <span>Doctors</span>

                            <span className="font-black text-cyan-600">

                                {analytics.totalDoctors || 0}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Patients</span>

                            <span className="font-black text-green-600">

                                {analytics.totalPatients || 0}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Prescriptions</span>

                            <span className="font-black text-pink-600">

                                {analytics.totalPrescriptions || 0}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Appointments</span>

                            <span className="font-black text-orange-600">

                                {analytics.totalAppointments || 0}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Refill Requests</span>

                            <span className="font-black text-blue-600">

                                {analytics.totalRefills || 0}

                            </span>

                        </div>

                    </div>

                </div>

                <div className="rounded-[40px] p-10 bg-gradient-to-r from-blue-700 via-cyan-500 to-cyan-400 text-white shadow-2xl">

                    <h2 className="text-5xl font-black">

                        Live Analytics

                    </h2>

                    <div className="mt-8 space-y-4 text-xl font-bold">

                        <p>Doctors : {analytics.totalDoctors || 0}</p>
                        <p>Patients : {analytics.totalPatients || 0}</p>
                        <p>Medicines : {analytics.totalMedicines || 0}</p>
                        <p>Prescriptions : {analytics.totalPrescriptions || 0}</p>
                        <p>Appointments : {analytics.totalAppointments || 0}</p>
                        <p>Refills : {analytics.totalRefills || 0}</p>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

};

export default Analytics;