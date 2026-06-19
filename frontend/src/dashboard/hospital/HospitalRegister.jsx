import { useState } from "react";

const HospitalRegister = () => {

    const [formData, setFormData] = useState({
        hospitalName: "",
        email: "",
        phone: "",
        address: "",
        registrationNumber: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !formData.hospitalName ||
            !formData.email ||
            !formData.phone ||
            !formData.address ||
            !formData.registrationNumber ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            alert("Please fill all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        alert("Hospital Registration Successful");

        setFormData({
            hospitalName: "",
            email: "",
            phone: "",
            address: "",
            registrationNumber: "",
            password: "",
            confirmPassword: "",
        });

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 flex items-center justify-center p-8">

            <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

                {/* Left Side */}

                <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-blue-800 p-12 text-white flex flex-col justify-center">

                    <h1 className="text-6xl font-black">
                        MediScript
                    </h1>

                    <h2 className="text-4xl font-black mt-8">
                        Hospital Registration
                    </h2>

                    <p className="mt-6 text-cyan-100 leading-8">
                        Register your hospital and manage doctors,
                        patients, prescriptions, appointments and
                        healthcare operations securely.
                    </p>

                </div>

                {/* Right Side */}

                <div className="p-10">

                    <h2 className="text-4xl font-black text-gray-900 mb-8">
                        Create Hospital Account
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <input
                            type="text"
                            name="hospitalName"
                            placeholder="Hospital Name"
                            value={formData.hospitalName}
                            onChange={handleChange}
                            className="w-full p-4 border rounded-2xl"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-4 border rounded-2xl"
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-4 border rounded-2xl"
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Hospital Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-4 border rounded-2xl"
                        />

                        <input
                            type="text"
                            name="registrationNumber"
                            placeholder="Hospital Registration Number"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            className="w-full p-4 border rounded-2xl"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-4 border rounded-2xl"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-4 border rounded-2xl"
                        />

                        <button
                            type="submit"
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold text-lg"
                        >
                            Register Hospital
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default HospitalRegister;