import HospitalSidebar from "../../../components/HospitalSidebar";

const HospitalLayout = ({ children }) => {

    return (

        <div className="flex min-h-screen bg-slate-100">

            {/* Sidebar */}

            <HospitalSidebar />

            {/* Main Content */}

            <div className="flex-1 relative overflow-hidden">

                {/* Background Effects */}

                <div className="absolute top-[-150px] right-[-150px] w-[350px] h-[350px] bg-cyan-400/10 rounded-full blur-3xl"></div>

                <div className="absolute bottom-[-150px] left-[20%] w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl"></div>

                {/* Header */}

                <div className="relative z-10 flex justify-between items-center px-10 py-8 border-b border-gray-200 bg-white/80 backdrop-blur-xl">

                    <div>

                        <h1 className="text-4xl font-black text-slate-900">

                            Hospital Management System

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Manage healthcare operations efficiently.

                        </p>

                    </div>

                    <div className="flex items-center gap-4">

                        <div className="text-right">

                            <p className="text-sm text-gray-500">

                                Logged In As

                            </p>

                            <h3 className="font-black text-slate-900">

                                Hospital Admin

                            </h3>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white text-xl font-black shadow-xl">

                            H

                        </div>

                    </div>

                </div>

                {/* Page Content */}

                <div className="relative z-10 p-10">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default HospitalLayout;