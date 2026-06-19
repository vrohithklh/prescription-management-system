import PatientLayout from "../layouts/PatientLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const PatientProfile = () => {

    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/login");

    };
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSave = async () => {

        console.log("SAVE CLICKED");
        console.log("USER =", user);
        console.log("FORM =", formData);

        try {

            const response = await axios.patch(
                `http://localhost:3000/patients/${user.id}`,
                formData
            );

            console.log("SUCCESS =", response.data);

            const updatedUser = {
                ...user,
                ...formData,
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            alert("Profile Updated Successfully");

            setIsEditing(false);

        } catch (error) {

            console.log("ERROR =", error);

        }

    };
    return (

        <PatientLayout>

            {/* Header */}

            <div className="mb-10">

                <h1 className="text-5xl font-black text-gray-900">
                    My Profile
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Manage your healthcare account and personal information.
                </p>

            </div>

            {/* Main Profile Card */}

            <div className="relative overflow-hidden bg-white rounded-[40px] border border-gray-100 shadow-2xl p-10">

                {/* Background Glow */}

                <div className="absolute top-[-80px] right-[-80px] w-[250px] h-[250px] bg-cyan-400/10 blur-3xl rounded-full"></div>

                <div className="absolute bottom-[-80px] left-[-80px] w-[250px] h-[250px] bg-blue-500/10 blur-3xl rounded-full"></div>

                {/* Top Section */}

                <div className="relative z-10 flex flex-wrap items-center justify-between gap-8">

                    <div className="flex items-center gap-8">

                        {/* Avatar */}

                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 flex items-center justify-center text-white text-5xl font-black shadow-xl">

                            {user?.name?.charAt(0) || "P"}

                        </div>

                        {/* User Info */}

                        <div>

                            <h2 className="text-4xl font-black text-gray-900">
                                {user?.name || "Patient"}
                            </h2>

                            <p className="text-gray-500 mt-2 text-lg">
                                Healthcare Portal User
                            </p>

                            <div className="mt-4 flex items-center gap-3">

                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

                                <span className="text-green-600 font-semibold">
                                    Account Active
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Badge */}

                    <div className="bg-gradient-to-r from-cyan-500 to-blue-700 px-6 py-4 rounded-3xl shadow-xl">

                        <p className="text-cyan-100 text-sm">
                            Patient Access
                        </p>

                        <h3 className="text-white text-2xl font-black mt-1">
                            Premium User
                        </h3>

                    </div>

                </div>

                {/* Stats Cards */}

                <div className="grid md:grid-cols-3 gap-6 mt-12">

                    <div className="bg-cyan-50 rounded-3xl p-6 border border-cyan-100">

                        <p className="text-gray-500 text-sm">
                            Patient ID
                        </p>

                        <h3 className="text-2xl font-black text-gray-900 mt-2">
                            PAT{user?.id || "001"}
                        </h3>

                    </div>

                    <div className="bg-green-50 rounded-3xl p-6 border border-green-100">

                        <p className="text-gray-500 text-sm">
                            Role
                        </p>

                        <h3 className="text-2xl font-black text-gray-900 mt-2">
                            {user?.role || "Patient"}
                        </h3>

                    </div>

                    <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">

                        <p className="text-gray-500 text-sm">
                            Status
                        </p>

                        <h3 className="text-2xl font-black text-green-600 mt-2">
                            Active
                        </h3>

                    </div>

                </div>

                {/* Details */}

                <div className="grid lg:grid-cols-2 gap-8 mt-10">

                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-md">

                        <p className="text-gray-500 text-sm">
                            Full Name
                        </p>
                        {
                            isEditing ? (

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded-xl mt-2"
                                />

                            ) : (

                                <h3 className="text-xl font-bold text-gray-900 mt-2">
                                    {user?.name || "Not Available"}
                                </h3>

                            )
                        }

                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-md">

                        <p className="text-gray-500 text-sm">
                            Email Address
                        </p>

                        {
                            isEditing ? (

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded-xl mt-2"
                                />

                            ) : (

                                <h3 className="text-xl font-bold text-gray-900 mt-2 break-all">
                                    {user?.email || "Not Available"}
                                </h3>

                            )
                        }

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex flex-wrap gap-5 mt-12">

                    {
                        isEditing ? (

                            <button
                                onClick={handleSave}
                                className="px-8 py-4 rounded-2xl bg-green-600 text-white font-bold"
                            >
                                Save Profile
                            </button>

                        ) : (

                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold shadow-lg hover:scale-105 transition"
                            >
                                Edit Profile
                            </button>

                        )
                    }

                    <button
                        onClick={handleLogout}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold shadow-lg hover:scale-105 transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </PatientLayout>

    );

};

export default PatientProfile;