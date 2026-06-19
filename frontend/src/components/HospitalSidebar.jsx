import { NavLink } from "react-router-dom";

const HospitalSidebar = () => {

    const navItems = [
        {
            name: "Dashboard",
            path: "/hospital/dashboard",
            icon: "🏥",
        },
        {
            name: "Doctors",
            path: "/hospital/doctors",
            icon: "👨‍⚕️",
        },
        {
            name: "Patients",
            path: "/hospital/patients",
            icon: "🧑‍🤝‍🧑",
        },
        {
            name: "Appointments",
            path: "/hospital/appointments",
            icon: "📅",
        },
        {
            name: "Prescriptions",
            path: "/hospital/prescriptions",
            icon: "📄",
        },
        {
            name: "Medicines",
            path: "/hospital/medicines",
            icon: "💊",
        },
        {
            name: "Analytics",
            path: "/hospital/analytics",
            icon: "📊",
        },
        {
            name: "Settings",
            path: "/hospital/settings",
            icon: "⚙️",
        },
    ];

    return (

        <div className="relative w-[320px] min-h-screen bg-[#050f25] border-r border-cyan-500/10 flex flex-col justify-between overflow-hidden p-8">

            {/* Background Glow */}

            <div className="absolute top-[-150px] left-[-100px] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="absolute bottom-[-150px] right-[-100px] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl"></div>

            {/* Top */}

            <div className="relative z-10">

                {/* Logo */}

                <div className="flex items-center gap-4 mb-14">

                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-700 flex items-center justify-center shadow-2xl shadow-cyan-500/30">

                        <span className="text-white text-3xl font-black">
                            H
                        </span>

                    </div>

                    <div>

                        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">

                            MediScript

                        </h1>

                        <p className="text-cyan-100 text-xs tracking-[5px]">

                            HOSPITAL PORTAL

                        </p>

                    </div>

                </div>

                {/* Navigation */}

                <div className="space-y-4">

                    {navItems.map((item, index) => (

                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center gap-5 px-6 py-5 rounded-3xl transition-all duration-300 font-bold text-lg ${isActive
                                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/20 text-cyan-300 shadow-lg shadow-cyan-500/20"
                                    : "text-blue-100 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >

                            <span className="text-2xl">
                                {item.icon}
                            </span>

                            <span>
                                {item.name}
                            </span>

                        </NavLink>

                    ))}

                </div>

            </div>

            {/* Bottom Card */}

            <div className="relative z-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 rounded-[36px] p-8 backdrop-blur-xl">

                <div className="absolute top-[-40px] right-[-40px] w-[150px] h-[150px] bg-cyan-400/10 rounded-full blur-3xl"></div>

                <h2 className="text-4xl font-black text-white leading-tight">

                    Hospital
                    <br />
                    Management

                </h2>

                <p className="text-blue-100 mt-5 leading-7">

                    Manage doctors, patients, appointments,
                    medicines and healthcare operations.

                </p>

                <div className="mt-8 flex items-center gap-3">

                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

                    <span className="text-green-300 font-semibold text-sm">

                        System Active

                    </span>

                </div>

            </div>

        </div>

    );

};

export default HospitalSidebar;