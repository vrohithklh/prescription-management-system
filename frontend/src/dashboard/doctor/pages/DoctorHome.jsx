import Sidebar from "../../../components/DoctorSidebar";

const DoctorHome = () => {

    return (

        <div className="flex min-h-screen bg-[#071028] text-white overflow-hidden relative">

            {/* Background Glow */}

            <div className="absolute top-[-120px] left-[-100px] w-[420px] h-[420px] bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>

            <div className="absolute bottom-[-140px] right-[-100px] w-[450px] h-[450px] bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>

            <Sidebar />

            <div className="relative z-10 flex-1 p-10 overflow-y-auto">

                {/* Premium Topbar */}

                <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] px-10 py-8 shadow-2xl shadow-cyan-500/10">

                    <div className="absolute top-[-120px] right-[-100px] w-[260px] h-[260px] bg-cyan-400/10 blur-3xl rounded-full"></div>

                    <div className="flex items-center justify-between">

                        {/* Left */}

                        <div>

                            <h1 className="text-5xl font-black text-white">

                                Welcome Back 👋

                            </h1>

                            <p className="text-blue-100 mt-3 text-lg">

                                Monitor healthcare activities and prescription workflows.

                            </p>

                        </div>

                        {/* Right */}

                        <div className="flex items-center gap-5">

                            {/* Search */}

                            <div className="bg-[#071028] border border-cyan-400/20 rounded-2xl px-6 py-4 shadow-lg">

                                <input
                                    type="text"
                                    placeholder="Search patients, medicines..."
                                    className="bg-transparent outline-none text-white placeholder:text-blue-200/40 w-[240px]"
                                />

                            </div>

                            {/* Notification */}

                            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer">

                                🔔

                            </div>

                            {/* Profile */}

                            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-4 hover:bg-white/15 transition-all duration-300">

                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-xl shadow-lg">

                                    A

                                </div>

                                <div>

                                    <h3 className="font-bold text-white">
                                        Admin User
                                    </h3>

                                    <p className="text-blue-100 text-sm">
                                        Healthcare Administrator
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Heading */}

                <div className="mt-12">

                    <h1 className="text-6xl font-black text-white">
                        Doctor Dashboard
                    </h1>

                    <p className="text-blue-100 text-xl mt-4">
                        Monitor prescriptions, patients, analytics, and healthcare workflows.
                    </p>

                </div>

                {/* Stats Cards */}

                <div className="grid lg:grid-cols-3 gap-8 mt-12">

                    {/* Patients */}

                    <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1736] to-[#10224F] border border-white/10 rounded-[32px] p-8 shadow-2xl shadow-cyan-500/10 hover:-translate-y-2 hover:shadow-cyan-400/20 transition-all duration-500">

                        <div className="absolute top-[-60px] right-[-40px] w-[180px] h-[180px] bg-cyan-400/10 blur-3xl rounded-full"></div>

                        <div className="text-5xl mb-6">
                            👨‍⚕️
                        </div>

                        <h2 className="text-blue-100 text-lg">
                            Total Patients
                        </h2>

                        <h1 className="text-6xl font-black text-cyan-300 mt-5">
                            210
                        </h1>

                    </div>

                    {/* Prescriptions */}

                    <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1736] to-[#10224F] border border-white/10 rounded-[32px] p-8 shadow-2xl shadow-blue-500/10 hover:-translate-y-2 hover:shadow-blue-400/20 transition-all duration-500">

                        <div className="absolute top-[-60px] right-[-40px] w-[180px] h-[180px] bg-blue-400/10 blur-3xl rounded-full"></div>

                        <div className="text-5xl mb-6">
                            📄
                        </div>

                        <h2 className="text-blue-100 text-lg">
                            Prescriptions
                        </h2>

                        <h1 className="text-6xl font-black text-green-400 mt-5">
                            540
                        </h1>

                    </div>

                    {/* Refills */}

                    <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1736] to-[#10224F] border border-white/10 rounded-[32px] p-8 shadow-2xl shadow-pink-500/10 hover:-translate-y-2 hover:shadow-pink-400/20 transition-all duration-500">

                        <div className="absolute top-[-60px] right-[-40px] w-[180px] h-[180px] bg-pink-400/10 blur-3xl rounded-full"></div>

                        <div className="text-5xl mb-6">
                            💊
                        </div>

                        <h2 className="text-blue-100 text-lg">
                            Pending Refills
                        </h2>

                        <h1 className="text-6xl font-black text-pink-400 mt-5">
                            32
                        </h1>

                    </div>

                </div>

                {/* Analytics Section */}

                <div className="grid lg:grid-cols-2 gap-8 mt-12">

                    {/* Growth Chart */}

                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl shadow-cyan-500/10">

                        <h2 className="text-3xl font-bold text-white">
                            Monthly Growth
                        </h2>

                        <p className="text-blue-100 mt-2">
                            Prescription analytics overview
                        </p>

                        <div className="mt-10 flex items-end gap-5 h-[220px]">

                            <div className="w-14 bg-cyan-400 rounded-t-3xl h-[40%] animate-pulse"></div>

                            <div className="w-14 bg-blue-500 rounded-t-3xl h-[65%] animate-pulse"></div>

                            <div className="w-14 bg-indigo-500 rounded-t-3xl h-[80%] animate-pulse"></div>

                            <div className="w-14 bg-cyan-300 rounded-t-3xl h-[55%] animate-pulse"></div>

                            <div className="w-14 bg-blue-400 rounded-t-3xl h-[90%] animate-pulse"></div>

                        </div>

                    </div>

                    {/* AI Insights */}

                    <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-2xl border border-cyan-400/20 rounded-[32px] p-8 shadow-2xl">

                        <div className="absolute top-[-80px] right-[-60px] w-[220px] h-[220px] bg-cyan-400/20 blur-3xl rounded-full"></div>

                        <h2 className="text-4xl font-black text-white">

                            Healthcare AI Insights

                        </h2>

                        <p className="mt-8 text-blue-100 leading-8 text-lg">

                            AI detected increased prescription demand
                            for Vitamin supplements and refill medicines
                            during this month.

                        </p>

                        <button className="mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold shadow-xl hover:scale-105 transition-all duration-300">

                            View Analytics

                        </button>

                    </div>

                </div>

                {/* Recent Activity */}

                <div className="relative overflow-hidden mt-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl shadow-cyan-500/10">

                    <div className="absolute top-[-60px] right-[-40px] w-[180px] h-[180px] bg-cyan-400/10 blur-3xl rounded-full"></div>

                    <h2 className="text-4xl font-black text-white">
                        Recent Activity
                    </h2>

                    <div className="mt-10 space-y-8">

                        <div className="flex justify-between items-center border-b border-white/10 pb-6">

                            <div>

                                <h3 className="font-bold text-xl text-white">
                                    Prescription Created
                                </h3>

                                <p className="text-blue-100 mt-2">
                                    Rahul Sharma - Paracetamol
                                </p>

                            </div>

                            <span className="text-sm text-cyan-300">
                                2 mins ago
                            </span>

                        </div>

                        <div className="flex justify-between items-center border-b border-white/10 pb-6">

                            <div>

                                <h3 className="font-bold text-xl text-white">
                                    Medicine Updated
                                </h3>

                                <p className="text-blue-100 mt-2">
                                    Vitamin D inventory updated
                                </p>

                            </div>

                            <span className="text-sm text-cyan-300">
                                15 mins ago
                            </span>

                        </div>

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="font-bold text-xl text-white">
                                    Patient Added
                                </h3>

                                <p className="text-blue-100 mt-2">
                                    New patient registered
                                </p>

                            </div>

                            <span className="text-sm text-cyan-300">
                                1 hour ago
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default DoctorHome;