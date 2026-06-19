import PatientSidebar from "../../components/PatientSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const PatientDashboard = () => {

   const user = JSON.parse(localStorage.getItem("user"));

const [prescriptions, setPrescriptions] = useState([]);
const [refills, setRefills] = useState([]);
const [appointments, setAppointments] = useState([]);

useEffect(() => {

    fetchDashboardData();

}, []);

const fetchDashboardData = async () => {

    try {

        const prescriptionsRes = await axios.get(
            "http://localhost:3000/prescriptions"
        );

        const refillsRes = await axios.get(
            "http://localhost:3000/refills"
        );

        const appointmentsRes = await axios.get(
            "http://localhost:3000/appointments"
        );

        setPrescriptions(prescriptionsRes.data);
        setRefills(refillsRes.data);
        setAppointments(appointmentsRes.data);

    } catch (error) {

        console.log(error);

    }

};
const nextAppointment = appointments.find(
    (item) => item.status === "Approved"
);
    return (

        <div className="flex bg-white min-h-screen overflow-hidden relative">

            {/* Floating Background Glow */}
            <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-cyan-400/10 blur-3xl rounded-full animate-pulse"></div>

            <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>

            <PatientSidebar />

            <div className="relative z-10 flex-1 p-10 overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-12">

                    <div>

                        <h1 className="text-5xl font-black text-gray-900">
                            Patient Dashboard
                        </h1>

                        <p className="text-gray-500 mt-4 text-lg">
                            Welcome back, manage your healthcare activities easily.
                        </p>

                    </div>

                    {/* Patient Badge */}
                    <div className="flex items-center gap-4 bg-gradient-to-r from-cyan-500 to-blue-700 px-6 py-4 rounded-3xl shadow-2xl shadow-cyan-500/20">

                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white font-black text-2xl">

                            {user?.name?.charAt(0) || "P"}

                        </div>

                        <div>

                            <p className="text-cyan-100 text-sm">
                                Patient ID
                            </p>

                            <h3 className="text-white font-black text-xl">
                                PAT001
                            </h3>

                        </div>

                    </div>

                </div>

                {/* Analytics Cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

                    {/* Card 1 */}
                    <div className="group relative overflow-hidden rounded-[36px] p-8 bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-700 text-white shadow-2xl hover:-translate-y-2 transition-all">

                        <p className="text-cyan-100 text-lg">
                            Active Medicines
                        </p>

                        <h1 className="text-7xl font-black mt-6">
                            {
prescriptions.filter(
(item) => item.status === "Issued"
).length
}
                        </h1>

                        <div className="mt-8 flex items-center gap-3">

                            <div className="w-3 h-3 rounded-full bg-green-300"></div>

                            <span className="text-cyan-100 text-sm">
                                Currently Active
                            </span>

                        </div>

                    </div>

                    {/* Card 2 */}
                    <div className="group relative overflow-hidden rounded-[36px] p-8 bg-gradient-to-br from-emerald-500 via-green-500 to-green-700 text-white shadow-2xl hover:-translate-y-2 transition-all">

                        <p className="text-green-100 text-lg">
                            Upcoming Refills
                        </p>

                        <h1 className="text-7xl font-black mt-6">
                            {
refills.filter(
(item) => item.status === "Pending"
).length
}
                        </h1>

                        <div className="mt-8 flex items-center gap-3">

                            <div className="w-3 h-3 rounded-full bg-yellow-300"></div>

                            <span className="text-green-100 text-sm">
                                Pending Requests
                            </span>

                        </div>

                    </div>

                    {/* Card 3 */}
                    <div className="group relative overflow-hidden rounded-[36px] p-8 bg-gradient-to-br from-pink-500 via-rose-500 to-rose-700 text-white shadow-2xl hover:-translate-y-2 transition-all">

                        <p className="text-pink-100 text-lg">
                            Prescriptions
                        </p>

                        <h1 className="text-7xl font-black mt-6">
                          {prescriptions.length}
                        </h1>

                        <div className="mt-8 flex items-center gap-3">

                            <div className="w-3 h-3 rounded-full bg-cyan-300"></div>

                            <span className="text-pink-100 text-sm">
                                Total Records
                            </span>

                        </div>

                    </div>

                </div>

                {/* Bottom Widgets */}
                <div className="grid lg:grid-cols-2 gap-10 mt-12">

                    {/* Health Progress */}
                    <div className="bg-gradient-to-br from-white to-cyan-50 border border-cyan-100 rounded-[36px] p-8 shadow-xl">

                        <h2 className="text-4xl font-black text-gray-900">
                            Health Progress
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Daily medicine adherence and health tracking.
                        </p>

                        <div className="mt-10">

                            <div className="flex justify-between mb-3">

                                <span className="text-gray-500">
                                    Medication Completion
                                </span>

                                <span className="font-bold text-cyan-600">
                                    78%
                                </span>

                            </div>

                            <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">

                                <div className="w-[78%] h-full bg-gradient-to-r from-cyan-500 to-blue-700 rounded-full"></div>

                            </div>

                        </div>

                    </div>

                    {/* Appointment */}
                    <div className="rounded-[36px] p-8 bg-gradient-to-br from-blue-700 to-cyan-500 text-white shadow-2xl">

                        <h2 className="text-4xl font-black">
                            Upcoming Appointment
                        </h2>

                        <p className="mt-3 text-cyan-100">
                            Doctor consultation schedule.
                        </p>

                        <div className="mt-10 space-y-6">

                            <div>

                                <p className="text-cyan-100">
                                    Doctor
                                </p>

                                <h3 className="text-2xl font-bold">
                                    {nextAppointment?.doctor || "No Appointment"}
                                </h3>

                            </div>

                            <div>

                                <p className="text-cyan-100">
                                    Date
                                </p>

                                <h3 className="text-2xl font-bold">
                                    {nextAppointment?.date || "-"}
                                </h3>

                            </div>

                            <div>

                                <p className="text-cyan-100">
                                    Time
                                </p>

                                <h3 className="text-2xl font-bold">
                                   {nextAppointment?.time || "-"}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default PatientDashboard;