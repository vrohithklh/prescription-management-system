import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../../components/DoctorSidebar";
import Topbar from "../../../components/Topbar";

const Analytics = () => {

   const [analytics, setAnalytics] = useState({
    totalPatients: 0,
    totalMedicines: 0,
    totalPrescriptions: 0,
    totalAppointments: 0,
    approvedAppointments: 0,
    rejectedAppointments: 0,
});

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const fetchAnalytics = async () => {

        try {

            const prescriptions = await axios.get(
                "http://localhost:3000/prescriptions"
            );

            const patients = await axios.get(
                "http://localhost:3000/patients"
            );

            const medicines = await axios.get(
                "http://localhost:3000/medicines"
            );

            const appointments = await axios.get(
                "http://localhost:3000/appointments"
            );

setAnalytics({

    totalPrescriptions:
        prescriptions.data.length,

    totalPatients:
        patients.data.length,

    totalMedicines:
        medicines.data.length,

    totalAppointments:
        appointments.data.length,

    approvedAppointments:
        appointments.data.filter(
            item => item.status === "Approved"
        ).length,

    rejectedAppointments:
        appointments.data.filter(
            item => item.status === "Rejected"
        ).length,

});

        }

        catch (error) {

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
                        Healthcare Analytics
                    </h1>

                    <p className="text-gray-500 text-lg mt-3">
                        Monitor healthcare performance and prescription insights.
                    </p>

                </div>
<div className="grid md:grid-cols-2 gap-6 mt-6">

    <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white rounded-3xl p-8 shadow-xl">

        <h3 className="text-lg">
            Approved Appointments
        </h3>

        <h1 className="text-5xl font-bold mt-3">
            {analytics.approvedAppointments}
        </h1>

    </div>

    <div className="bg-gradient-to-r from-red-500 to-rose-700 text-white rounded-3xl p-8 shadow-xl">

        <h3 className="text-lg">
            Rejected Appointments
        </h3>

        <h1 className="text-5xl font-bold mt-3">
            {analytics.rejectedAppointments}
        </h1>

    </div>

</div>
                {/* Analytics Cards */}

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-3xl p-8 shadow-xl">

                        <h3 className="text-lg">
                            Prescriptions
                        </h3>

                        <h1 className="text-5xl font-bold mt-3">
                            {analytics.totalPrescriptions}
                        </h1>

                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-3xl p-8 shadow-xl">

                        <h3 className="text-lg">
                            Patients
                        </h3>

                        <h1 className="text-5xl font-bold mt-3">
                            {analytics.totalPatients}
                        </h1>

                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-3xl p-8 shadow-xl">

                        <h3 className="text-lg">
                            Appointments
                        </h3>

                        <h1 className="text-5xl font-bold mt-3">
                            {analytics.totalAppointments}
                        </h1>

                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-3xl p-8 shadow-xl">

                        <h3 className="text-lg">
                            Medicines
                        </h3>

                        <h1 className="text-5xl font-bold mt-3">
                            {analytics.totalMedicines}
                        </h1>

                    </div>

                </div>

                {/* Chart */}

                <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-xl p-8">

                    <h2 className="text-3xl font-bold text-gray-800">
                        Prescription Trends
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Monthly prescription activity overview.
                    </p>

                    <div className="mt-10 flex items-end justify-center gap-8 h-[320px]">

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-36 bg-blue-500 rounded-t-2xl"></div>
                            <span className="mt-3">Jan</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-56 bg-green-500 rounded-t-2xl"></div>
                            <span className="mt-3">Feb</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-44 bg-purple-500 rounded-t-2xl"></div>
                            <span className="mt-3">Mar</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-72 bg-red-500 rounded-t-2xl"></div>
                            <span className="mt-3">Apr</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-52 bg-yellow-500 rounded-t-2xl"></div>
                            <span className="mt-3">May</span>
                        </div>

                    </div>

                </div>

                {/* Recent Activity */}

                <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-xl p-8">

                    <h2 className="text-3xl font-bold text-gray-800">
                        Recent Activity
                    </h2>

                    <div className="mt-6 space-y-4">

                        <div className="bg-blue-50 p-4 rounded-2xl">
                            New prescription records updated.
                        </div>

                        <div className="bg-green-50 p-4 rounded-2xl">
                            Patient database synchronized.
                        </div>

                        <div className="bg-purple-50 p-4 rounded-2xl">
                            Medicine inventory reviewed.
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Analytics;