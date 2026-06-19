import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Input from "../ui/Input";
import Button from "../ui/Button";

import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {

            alert("Please fill all fields");

            return;

        }

        try {

            // Check Doctors

            const doctors = await axios.get(
                `http://localhost:3000/doctors?email=${email}&password=${password}`
            );

            if (doctors.data.length > 0) {

                const user = {
                    ...doctors.data[0],
                    role: "doctor"
                };

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

                localStorage.setItem(
                    "token",
                    "doctor-token"
                );

                alert("Doctor Login Successful 🚀");

                navigate("/doctor");

                return;

            }

            // Check Patients

            const patients = await axios.get(
                `http://localhost:3000/patients?email=${email}&password=${password}`
            );

            if (patients.data.length > 0) {

                const user = {
                    ...patients.data[0],
                    role: "patient"
                };

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

                localStorage.setItem(
                    "token",
                    "patient-token"
                );

                alert("Patient Login Successful 🚀");

                navigate("/patient");

                return;

            }

            // Admin Login

            if (
                email === "admin@mediscript.com" &&
                password === "admin123"
            ) {

                const user = {

                    id: 1,
                    name: "Admin",
                    email: "admin@mediscript.com",
                    role: "admin"

                };

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

                localStorage.setItem(
                    "token",
                    "admin-token"
                );

                alert("Admin Login Successful 🚀");

                navigate("/admin");

                return;

            }

            alert("Invalid Email or Password");

        }

        catch (error) {

            console.log(error);

            alert("Login Failed");

        }

    };

    return (

        <AuthLayout
            title="Login Portal"
            subtitle="Access your healthcare dashboard"
        >

            <div className="flex justify-end mb-6">

                <button
                    onClick={() => navigate("/")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                    ← Back to Home
                </button>

            </div>

            <form
                onSubmit={handleLogin}
                className="space-y-6"
            >

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <Button type="submit">

                    Login

                </Button>

            </form>

            <p className="text-center mt-8 text-gray-600">

                New user?

                <Link
                    to="/register"
                    className="text-blue-700 font-semibold ml-2"
                >
                    Create Account
                </Link>

            </p>

        </AuthLayout>

    );

};

export default Login;