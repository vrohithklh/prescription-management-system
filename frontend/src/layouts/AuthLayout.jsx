const AuthLayout = ({ title, subtitle, children }) => {

    return (

        <div className="min-h-screen bg-[#071028] text-white overflow-hidden relative">

            {/* Background Glow */}

            <div className="absolute top-[-120px] left-[-100px] w-[420px] h-[420px] bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>

            <div className="absolute bottom-[-140px] right-[-100px] w-[450px] h-[450px] bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>

            <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] bg-indigo-500/10 blur-3xl rounded-full"></div>

            {/* Navbar */}

            <nav className="relative z-10 flex justify-between items-center px-16 py-8 border-b border-white/10 backdrop-blur-xl bg-white/5">

                <div className="flex items-center gap-4">

                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 animate-pulse">

                        <h1 className="text-3xl font-black text-white">
                            M
                        </h1>

                    </div>

                    <div>

                        <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">

                            MediScript

                        </h1>

                        <p className="text-cyan-100 text-sm tracking-[6px] uppercase mt-1">

                            Healthcare SaaS

                        </p>

                    </div>

                </div>

            </nav>

            {/* Main Content */}

            <div className="relative z-10 flex items-center justify-center px-8 py-16">

                <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10">

                    {/* Left Side */}

                    <div className="relative p-16 flex flex-col justify-center overflow-hidden">

                        <div className="absolute top-[-80px] right-[-60px] w-[220px] h-[220px] bg-cyan-400/10 blur-3xl rounded-full"></div>

                        <div className="absolute bottom-[-100px] left-[-50px] w-[250px] h-[250px] bg-blue-500/10 blur-3xl rounded-full"></div>

                        <div className="relative z-10">

                            <h1 className="text-6xl font-black leading-tight">

                                Smart Healthcare
                                <br />

                                Prescription
                                <br />

                                Platform

                            </h1>

                            <p className="mt-8 text-blue-100 text-lg leading-9">

                                Modern healthcare SaaS platform for doctors,
                                patients, and healthcare administration.

                            </p>

                            <div className="mt-12 space-y-5 text-lg text-cyan-100">

                                <p>✔ Digital Prescription Workflow</p>

                                <p>✔ Role-Based Dashboard Access</p>

                                <p>✔ Medicine & Refill Tracking</p>

                                <p>✔ Secure Healthcare Management</p>

                            </div>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="bg-[#0B1736]/80 backdrop-blur-2xl p-16 flex flex-col justify-center">

                        <h2 className="text-5xl font-black text-cyan-300">
                            {title}
                        </h2>

                        <p className="text-blue-100 mt-4 text-lg">
                            {subtitle}
                        </p>

                        <div className="mt-10">
                            {children}
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AuthLayout;