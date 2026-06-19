import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#071028] text-white overflow-hidden relative">
{/* Animated Background */}

<div className="absolute top-[-120px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>

<div className="absolute bottom-[-150px] right-[-120px] w-[450px] h-[450px] bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>

<div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] bg-indigo-500/10 blur-3xl rounded-full"></div>
            {/* Navbar */}

            <nav className="relative z-10 flex justify-between items-center px-16 py-8 backdrop-blur-xl bg-white/5 border-b border-white/10">

                {/* Logo */}
<div className="flex items-center gap-4">

    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 animate-pulse">

        <h1 className="text-3xl font-black text-white">
            M
        </h1>

    </div>

    <div>

        <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-wide">

            MediScript

        </h1>

        <p className="text-cyan-100 text-sm tracking-[6px] uppercase mt-1">

            Healthcare SaaS

        </p>

    </div>

</div>

                {/* Nav Buttons */}

                <div className="flex items-center gap-5">

                    <Link
                        to="/login"
                        className="text-blue-700 font-semibold text-lg"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="bg-blue-700 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 transition"
                    >
                        Get Started
                    </Link>

                </div>

            </nav>

            {/* Hero Section */}

            <section className="grid lg:grid-cols-2 gap-16 items-center px-10 lg:px-20 py-20">

                {/* Left */}

                <div className="animate-[fadeIn_1.5s_ease]">

                    <p className="text-blue-700 font-semibold text-lg">
                        SMART HEALTHCARE PLATFORM
                    </p>

                    <h1 className="text-7xl leading-tight font-black text-white">

                        Digital Prescription
                        Management System

                    </h1>

                    <p className="mt-8 text-gray-600 text-xl leading-9 max-w-2xl">

                        A modern healthcare SaaS platform for doctors,
                        patients, and administrators to manage
                        prescriptions, medicine workflows, refill requests,
                        and healthcare analytics efficiently.

                    </p>

                    {/* Buttons */}

                    <div className="flex gap-5 mt-10">
                        <Link
                            to="/register"
                            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold shadow-2xl shadow-cyan-500/30 hover:scale-105 hover:shadow-cyan-400/40 transition-all duration-300"
                        >
                            Create Account
                        </Link>

                        <Link
                            to="/login"
                           className="px-10 py-5 rounded-2xl border border-cyan-400/30 text-cyan-200 hover:bg-cyan-400/10 hover:scale-105 transition-all duration-300"
                           > 
                           Login
                        </Link>

                    </div>

                </div>

                {/* Right */}

                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl shadow-cyan-500/10 overflow-hidden animate-[float_6s_ease-in-out_infinite]">
<div className="absolute top-[-80px] right-[-50px] w-[220px] h-[220px] bg-cyan-400/20 blur-3xl rounded-full"></div>

<div className="absolute bottom-[-100px] left-[-60px] w-[240px] h-[240px] bg-blue-500/20 blur-3xl rounded-full"></div>
                    <h2 className="text-3xl font-bold text-blue-700 mb-8">
                        System Highlights
                    </h2>

                    <div className="space-y-6">

                        <div className="bg-blue-50 p-6 rounded-2xl">

                            <h3 className="text-xl font-semibold text-gray-800">
                                Doctor Dashboard
                            </h3>

                            <p className="text-gray-600 mt-2 leading-7">

                                Create prescriptions, manage patients,
                                track dosage instructions, and monitor refills.

                            </p>

                        </div>

                        <div className="bg-blue-50 p-6 rounded-2xl">

                            <h3 className="text-xl font-semibold text-gray-800">
                                Patient Portal
                            </h3>

                            <p className="text-gray-600 mt-2 leading-7">

                                Access prescriptions, medicine schedules,
                                refill requests, and digital healthcare records.

                            </p>

                        </div>

                        <div className="bg-blue-50 p-6 rounded-2xl">

                            <h3 className="text-xl font-semibold text-gray-800">
                                Admin Analytics
                            </h3>

                            <p className="text-gray-600 mt-2 leading-7">

                                Monitor healthcare system performance,
                                medicine stock, users, and prescription reports.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Footer */}

            <footer className="px-10 lg:px-20 py-8 border-t border-gray-200">

                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

                    <h2 className="text-2xl font-bold text-blue-700">
                        MediScript
                    </h2>

                    <p className="text-gray-500">

                        © 2026 Prescription Management System

                    </p>

                </div>

            </footer>

        </div>
    );
};

export default Home;