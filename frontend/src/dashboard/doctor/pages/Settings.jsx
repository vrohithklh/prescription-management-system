import Sidebar from "../../../components/DoctorSidebar";
import Topbar from "../../../components/Topbar";
import { useNavigate } from "react-router-dom";

const Settings = () => {

    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <div className="flex bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10 overflow-y-auto">

                <Topbar />

                {/* Heading */}

                <div className="mt-10">

                    <h1 className="text-5xl font-bold text-gray-800">
                        Account Settings
                    </h1>

                    <p className="text-gray-500 text-lg mt-3">
                        Manage your doctor profile and account settings.
                    </p>

                </div>

                {/* Profile Card */}

                <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-xl p-10">

                    <div className="flex items-center gap-6">

                        <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center text-white text-4xl font-bold">

                            D

                        </div>

                        <div>

                            <h2 className="text-3xl font-bold text-gray-800">
                                Doctor Profile
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Healthcare Specialist
                            </p>

                        </div>

                    </div>

                    {/* Details */}

                    <div className="grid lg:grid-cols-2 gap-8 mt-10">

                        <div>

                            <label className="block text-gray-500 mb-2">
                                Doctor ID
                            </label>

                            <input
                                type="text"
                                value={user?.id || "DOC001"}
                                readOnly
                                className="w-full border border-gray-300 p-4 rounded-2xl bg-gray-100"
                            />

                        </div>

                        <div>

                            <label className="block text-gray-500 mb-2">
                                Email Address
                            </label>

                            <input
                                type="text"
                                value={user?.email || "doctor@mediscript.com"}
                                readOnly
                                className="w-full border border-gray-300 p-4 rounded-2xl bg-gray-100"
                            />

                        </div>

                        <div>

                            <label className="block text-gray-500 mb-2">
                                Role
                            </label>

                            <input
                                type="text"
                                value="Doctor"
                                readOnly
                                className="w-full border border-gray-300 p-4 rounded-2xl bg-gray-100"
                            />

                        </div>

                        <div>

                            <label className="block text-gray-500 mb-2">
                                Hospital
                            </label>

                            <input
                                type="text"
                                value="MediScript Hospital"
                                readOnly
                                className="w-full border border-gray-300 p-4 rounded-2xl bg-gray-100"
                            />

                        </div>

                    </div>

                </div>

                {/* Change Password */}

                <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-xl p-10">

                    <h2 className="text-3xl font-bold text-gray-800">
                        Security Settings
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Update account security information.
                    </p>

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <input
                            type="password"
                            placeholder="Current Password"
                            className="border border-gray-300 p-4 rounded-2xl"
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            className="border border-gray-300 p-4 rounded-2xl"
                        />

                    </div>

                    <button
                        className="mt-6 bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition"
                    >
                        Update Password
                    </button>

                </div>

                {/* Account Information */}

                <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-xl p-10">

                    <h2 className="text-3xl font-bold text-gray-800">
                        Account Information
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        <div className="bg-blue-50 rounded-2xl p-6">

                            <h3 className="font-bold text-lg">
                                Account Type
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Doctor
                            </p>

                        </div>

                        <div className="bg-green-50 rounded-2xl p-6">

                            <h3 className="font-bold text-lg">
                                Status
                            </h3>

                            <p className="mt-2 text-green-600 font-semibold">
                                Active
                            </p>

                        </div>

                        <div className="bg-purple-50 rounded-2xl p-6">

                            <h3 className="font-bold text-lg">
                                Access Level
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Healthcare Specialist
                            </p>

                        </div>

                    </div>

                </div>

                {/* Logout */}

                <div className="mt-10">

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-8 py-4 rounded-2xl hover:bg-red-600 transition shadow-lg"
                    >

                        Logout

                    </button>

                </div>

            </div>

        </div>

    );

};

export default Settings;