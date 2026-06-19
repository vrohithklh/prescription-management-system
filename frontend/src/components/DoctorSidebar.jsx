import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const navItems = [

        {
            name: "Dashboard",
            path: "/doctor",
            icon: "🏠",
        },

        {
            name: "Prescriptions",
            path: "/doctor/prescriptions",
            icon: "📄",
        },

        {
            name: "Patients",
            path: "/doctor/patients",
            icon: "🧑‍⚕️",
        },
        {
            name: "Appointments",
            path: "/doctor/appointments",
            icon: "📅",
        },
        {
            name: "Medicines",
            path: "/doctor/medicines",
            icon: "💊",
        },

        {
            name: "Analytics",
            path: "/doctor/analytics",
            icon: "📊",
        },

        {
            name: "Settings",
            path: "/doctor/settings",
            icon: "⚙️",
        },

    ];

    return (

        <div className="w-[320px] min-h-screen bg-[#08142F]/90 backdrop-blur-2xl border-r border-white/10 px-8 py-10 flex flex-col justify-between shadow-2xl shadow-cyan-500/10">

            {/* Top Branding */}

            <div>

                <div className="flex items-center gap-5">

                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl font-black shadow-2xl shadow-cyan-500/30 animate-pulse">

                        M

                    </div>

                    <div>

                        <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">

                            MediScript

                        </h1>

                        <p className="text-cyan-100 text-sm tracking-[5px] uppercase mt-1">

                            Healthcare SaaS

                        </p>

                    </div>

                </div>

                {/* Navigation */}

                <div className="mt-16 space-y-4">

                    {navItems.map((item, index) => (

                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>

                                `group flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-300 border ${isActive
                                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-400/30 shadow-xl shadow-cyan-500/20"
                                    : "border-transparent hover:bg-white/5 hover:border-white/10"
                                }`

                            }
                        >

                            <div className="text-2xl group-hover:scale-110 transition-all duration-300">

                                {item.icon}

                            </div>

                            <span className="text-lg font-semibold text-white">

                                {item.name}

                            </span>

                        </NavLink>

                    ))}

                </div>

            </div>

            {/* Bottom Card */}

            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/20 p-8 shadow-2xl">

                <div className="absolute top-[-50px] right-[-40px] w-[140px] h-[140px] bg-cyan-400/20 blur-3xl rounded-full"></div>

                <h2 className="text-3xl font-black text-white">

                    Healthcare AI

                </h2>

                <p className="text-blue-100 mt-4 leading-7">

                    Smart prescription tracking and patient healthcare management.

                </p>

                <button className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-white shadow-xl hover:scale-105 transition-all duration-300">

                    Explore AI

                </button>

            </div>

        </div>

    );

};

export default Sidebar;