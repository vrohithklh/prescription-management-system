import PatientSidebar from "../../../components/PatientSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
const PatientDashboard = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const [dashboardData, setDashboardData] = useState({
        prescriptions: [],
        appointments: [],
        refillRequests: [],
    });
    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const { data } = await axios.get(
                    `http://localhost:5000/api/patients/dashboard/${user.id}`
                );

                setDashboardData(data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchDashboard();

    }, []);
    return (

        <div className="relative flex bg-white min-h-screen overflow-hidden">

            {/* Animated Background Glow */}

            <div className="absolute top-[-120px] right-[-100px] w-[320px] h-[320px] bg-cyan-400/10 blur-3xl rounded-full animate-pulse"></div>

            <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>

            {/* Floating Particles */}

            <div className="absolute top-[18%] left-[48%] w-4 h-4 bg-cyan-400 rounded-full opacity-20 animate-ping"></div>

            <div className="absolute top-[65%] left-[70%] w-3 h-3 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>

            <div className="absolute top-[80%] left-[45%] w-5 h-5 bg-cyan-300 rounded-full opacity-10 animate-bounce"></div>

            {/* Sidebar */}

            <PatientSidebar />

            {/* Main Content */}

            <div className="relative z-10 flex-1 p-10 overflow-y-auto">

                {/* Hero Section */}

                <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-700 p-10 shadow-2xl shadow-cyan-500/20 text-white">

                    {/* Glow */}

                    <div className="absolute top-[-60px] right-[-60px] w-[240px] h-[240px] bg-white/10 blur-3xl rounded-full"></div>

                    <div className="relative z-10 flex items-center justify-between flex-wrap gap-10">

                        {/* Left */}

                        <div>

                            <p className="text-cyan-100 text-lg font-semibold">

                                Welcome Back 👋

                            </p>

                            <h1 className="text-6xl font-black mt-5 leading-tight">

                                Patient
                                <br />
                                Dashboard

                            </h1>

                            <p className="mt-6 text-cyan-100 text-lg leading-8 max-w-2xl">

                                Manage prescriptions, refill requests, medicine schedules, and healthcare tracking with an immersive modern healthcare platform.

                            </p>

                            {/* CTA */}

                            <div className="mt-10 flex gap-5 flex-wrap">

                                <button className="px-8 py-4 rounded-3xl bg-white text-blue-700 font-black shadow-2xl hover:scale-[1.03] transition-all duration-500">

                                    View Prescriptions

                                </button>

                                <button className="px-8 py-4 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl text-white font-bold hover:bg-white/20 transition-all duration-500">

                                    Health Analytics

                                </button>

                            </div>

                        </div>

                        {/* Right Widget */}

                        <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-[36px] p-8 min-w-[320px] shadow-2xl">

                            <div className="flex items-center gap-5">

                                <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-4xl font-black">

                                    {user?.id?.charAt(0)}

                                </div>

                                <div>

                                    <p className="text-cyan-100">

                                        Patient ID

                                    </p>

                                    <h2 className="text-3xl font-black mt-2">

                                        {user?.id}

                                    </h2>

                                </div>

                            </div>

                            {/* Status */}

                            <div className="mt-8 flex items-center gap-3">

                                <div className="w-3 h-3 rounded-full bg-green-300 animate-pulse"></div>

                                <span className="text-green-200 font-semibold">

                                    Healthcare Monitoring Active

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Analytics Cards */}

                <div className="grid lg:grid-cols-3 gap-10 mt-12">

                    {/* Card 1 */}

                    <div className="group relative overflow-hidden rounded-[36px] p-8 bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-700 text-white shadow-2xl hover:-translate-y-3 hover:shadow-cyan-500/30 transition-all duration-500">

                        <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] bg-white/10 blur-3xl rounded-full"></div>

                        <p className="text-cyan-100 text-lg">

                            Active Medicines

                        </p>

                        <h1 className="text-7xl font-black mt-6">

                            {dashboardData.prescriptions.length}

                        </h1>

                        <div className="mt-8 flex items-center gap-3">

                            <div className="w-3 h-3 rounded-full bg-green-300 animate-pulse"></div>

                            <span className="text-cyan-100 text-sm">

                                Daily Monitoring Active

                            </span>

                        </div>

                    </div>

                    {/* Card 2 */}

                    <div className="group relative overflow-hidden rounded-[36px] p-8 bg-gradient-to-br from-emerald-500 via-green-500 to-green-700 text-white shadow-2xl hover:-translate-y-3 hover:shadow-green-500/30 transition-all duration-500">

                        <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] bg-white/10 blur-3xl rounded-full"></div>

                        <p className="text-green-100 text-lg">

                            Upcoming Refills

                        </p>

                        <h1 className="text-7xl font-black mt-6">

                            {dashboardData.refillRequests.length}

                        </h1>

                        <div className="mt-8 flex items-center gap-3">

                            <div className="w-3 h-3 rounded-full bg-yellow-300 animate-pulse"></div>

                            <span className="text-green-100 text-sm">

                                Pending Approval

                            </span>

                        </div>

                    </div>

                    {/* Card 3 */}

                    <div className="group relative overflow-hidden rounded-[36px] p-8 bg-gradient-to-br from-pink-500 via-rose-500 to-rose-700 text-white shadow-2xl hover:-translate-y-3 hover:shadow-pink-500/30 transition-all duration-500">

                        <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] bg-white/10 blur-3xl rounded-full"></div>

                        <p className="text-pink-100 text-lg">

                            Prescriptions

                        </p>

                        <h1 className="text-7xl font-black mt-6">

                            {dashboardData.prescriptions.length}

                        </h1>

                        <div className="mt-8 flex items-center gap-3">

                            <div className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse"></div>

                            <span className="text-pink-100 text-sm">

                                Total Healthcare Records

                            </span>

                        </div>

                    </div>

                </div>

                {/* Bottom Widgets */}

                <div className="grid lg:grid-cols-2 gap-10 mt-14">

                    {/* Health Progress */}

                    <div className="relative overflow-hidden bg-gradient-to-br from-white to-cyan-50 border border-cyan-100 rounded-[40px] p-10 shadow-2xl">

                        <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] bg-cyan-400/10 blur-3xl rounded-full"></div>

                        <h2 className="text-4xl font-black text-gray-900">

                            Health Progress

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Daily medicine adherence tracking.

                        </p>

                        {/* Progress */}

                        <div className="mt-10">

                            <div className="flex justify-between mb-3">

                                <span className="text-gray-500">

                                    Medication Completion

                                </span>

                                <span className="font-black text-cyan-600">

                                    78%

                                </span>

                            </div>

                            <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">

                                <div className="w-[78%] h-full bg-gradient-to-r from-cyan-500 to-blue-700 rounded-full"></div>

                            </div>

                        </div>

                    </div>

                    {/* Appointment */}

                    <div className="relative overflow-hidden rounded-[40px] p-10 bg-gradient-to-r from-blue-700 via-cyan-500 to-cyan-400 text-white shadow-2xl shadow-cyan-500/20">

                        <div className="absolute top-[-60px] right-[-60px] w-[240px] h-[240px] bg-white/10 blur-3xl rounded-full"></div>

                        <h2 className="text-5xl font-black leading-tight">

                            Upcoming
                            <br />
                            Appointment

                        </h2>

                        <p className="mt-5 text-cyan-100 text-lg">

                            Healthcare consultation tracking.

                        </p>

                        <div className="mt-10 space-y-6">

                            <div>

                                <p className="text-cyan-100">

                                    Doctor

                                </p>

                                <h3 className="text-3xl font-black mt-2">

                                    Dr. Sharma

                                </h3>

                            </div>

                            <div>

                                <p className="text-cyan-100">

                                    Date

                                </p>

                                <h3 className="text-3xl font-black mt-2">

                                    28 May 2026

                                </h3>

                            </div>

                            <div>

                                <p className="text-cyan-100">

                                    Time

                                </p>

                                <h3 className="text-3xl font-black mt-2">

                                    10:30 AM

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