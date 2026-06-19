import { NavLink } from "react-router-dom";

const PatientSidebar = () => {

    const navItems = [

        {
            name: "Dashboard",
            path: "/patient",
            icon: "🏠",
        },

        {
            name: "My Prescriptions",
            path: "/patient/prescriptions",
            icon: "📄",
        },

        {
            name: "Medicine Schedule",
            path: "/patient/schedule",
            icon: "⏰",
        },

        {
            name: "Refill Request",
            path: "/patient/refill-request",
            icon: "📝",
        },

        {
            name: "Refill Tracking",
            path: "/patient/refills",
            icon: "🔄",
        },
        {
            name: "Appointments",
            path: "/patient/appointments",
            icon: "📅",
        },
        {
            name: "Notifications",
            path: "/patient/notifications",
            icon: "🔔",
        },
        {
            name: "Medical History",
            path: "/patient/history",
            icon: "📋",
        },
        {
            name: "My Profile",
            path: "/patient/profile",
            icon: "👤",
        },

    ];
    return (

        <div className="relative w-[290px] min-h-screen bg-[#071028] border-r border-cyan-500/10 p-8 flex flex-col justify-between overflow-hidden">

            {/* Animated Glow */}

            <div className="absolute top-[-120px] left-[-80px] w-[260px] h-[260px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute bottom-[-120px] right-[-80px] w-[260px] h-[260px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

            {/* Top Section */}

            <div className="relative z-10">

                {/* Logo */}

                <div className="flex items-center gap-4">

                    <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-cyan-500/30 animate-pulse">

                        <span className="text-black font-black text-3xl">

                            M

                        </span>

                    </div>

                    <div>

                        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">

                            MediScript

                        </h1>

                        <p className="text-cyan-100 text-xs tracking-[5px] mt-2">

                            PATIENT PORTAL

                        </p>

                    </div>

                </div>

                {/* Navigation */}

                <div className="mt-16 space-y-5">

                    {navItems.map((item, index) => (

                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `group relative flex items-center gap-5 px-6 py-5 rounded-3xl text-lg font-bold transition-all duration-500 overflow-hidden ${isActive
                                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                                    : "text-blue-100 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >

                            {/* Hover Glow */}

                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>

                            <span className="relative z-10 text-2xl group-hover:scale-125 transition-all duration-300">

                                {item.icon}

                            </span>

                            <span className="relative z-10">

                                {item.name}

                            </span>

                        </NavLink>

                    ))}

                </div>

            </div>

            {/* Bottom Card */}

            <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/20 rounded-[36px] p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">

                {/* Glow */}

                <div className="absolute top-[-50px] right-[-50px] w-[160px] h-[160px] bg-cyan-400/10 blur-3xl rounded-full"></div>

                <h2 className="text-5xl font-black text-white leading-tight">

                    Patient
                    <br />
                    Care

                </h2>

                <p className="text-blue-100 mt-6 leading-8 text-[15px]">

                    Manage medicines, prescriptions, and refill tracking securely.

                </p>

                {/* Status */}

                <div className="mt-8 flex items-center gap-3">

                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

                    <span className="text-green-300 text-sm font-semibold">

                        Healthcare System Active

                    </span>

                </div>

            </div>

        </div>

    );

};

export default PatientSidebar;