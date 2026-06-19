import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HospitalLogin = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {

            setError("Please fill all fields");
            return;

        }

        alert("Hospital Login Successful 🚀");

        navigate("/hospital/dashboard");

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 flex items-center justify-center px-6 relative overflow-hidden">

            {/* Background Glow */}

            <div className="absolute top-[-150px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

            <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-blue-600/20 blur-[140px] rounded-full"></div>

            <div className="w-full max-w-6xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.4)] grid lg:grid-cols-2">

                {/* Left Section */}

                <div className="p-14 text-white flex flex-col justify-center">

                    <div className="w-24 h-24 rounded-[30px] bg-gradient-to-br from-cyan-400 to-blue-700 flex items-center justify-center text-5xl font-black shadow-2xl">

                        H

                    </div>

                    <h1 className="text-6xl font-black mt-8 leading-tight">

                        Hospital
                        <br />
                        Portal

                    </h1>

                    <p className="mt-8 text-cyan-100 text-lg leading-8">

                        Access hospital management tools, doctors,
                        appointments, patients, prescriptions,
                        inventory and analytics from one platform.

                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-12">

                        <div className="bg-white/10 rounded-3xl p-5">

                            <h3 className="text-3xl font-black">
                                500+
                            </h3>

                            <p className="text-cyan-100 mt-2">
                                Doctors
                            </p>

                        </div>

                        <div className="bg-white/10 rounded-3xl p-5">

                            <h3 className="text-3xl font-black">
                                10K+
                            </h3>

                            <p className="text-cyan-100 mt-2">
                                Patients
                            </p>

                        </div>

                    </div>

                </div>

                {/* Right Section */}

                <div className="bg-white p-12 flex flex-col justify-center">

                    <h2 className="text-5xl font-black text-gray-900">

                        Welcome Back

                    </h2>

                    <p className="text-gray-500 mt-3 text-lg">

                        Login to your hospital account.

                    </p>

                    {error && (

                        <div className="mt-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl">

                            {error}

                        </div>

                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >

                        <input
                            type="email"
                            name="email"
                            placeholder="Hospital Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-5 rounded-2xl border border-gray-200 focus:border-cyan-500 outline-none"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-5 rounded-2xl border border-gray-200 focus:border-cyan-500 outline-none"
                        />

                        <div className="flex items-center justify-between">

                            <label className="flex items-center gap-2 text-gray-600">

                                <input type="checkbox" />

                                Remember Me

                            </label>

                            <button
                                type="button"
                                className="text-cyan-600 font-semibold"
                            >
                                Forgot Password?
                            </button>

                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white text-lg font-bold shadow-xl hover:scale-[1.02] transition"
                        >

                            Login Hospital

                        </button>

                    </form>

                    <div className="mt-8 flex justify-between items-center">

                        <Link
                            to="/"
                            className="text-gray-500 hover:text-cyan-600"
                        >
                            ← Back Home
                        </Link>

                        <Link
                            to="/hospital/register"
                            className="text-cyan-600 font-bold"
                        >
                            Register Hospital
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default HospitalLogin;