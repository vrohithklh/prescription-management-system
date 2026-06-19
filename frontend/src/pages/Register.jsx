import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Input from "../ui/Input";
import Button from "../ui/Button";

import axios from "axios";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.password
        ) {

            alert("Please fill all fields");
            return;

        }

        if (formData.password.length < 6) {

            alert("Password must be at least 6 characters");
            return;

        }

        try {

            const existingUser = await axios.get(
                `http://localhost:3000/patients?email=${formData.email}`
            );

            if (existingUser.data.length > 0) {

                alert("Email already registered");
                return;

            }

            const newPatient = {

                id: Date.now(),

                name: formData.name,

                email: formData.email,

                password: formData.password,

                role: "patient",

            };

            await axios.post(
                "http://localhost:3000/patients",
                newPatient
            );

            alert("Registration Successful 🚀");

            navigate("/login");

        }

        catch (error) {

            console.log(error);

            alert("Registration Failed");

        }

    };

    return (

        <AuthLayout
            title="Create Patient Account"
            subtitle="Register your healthcare account"
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
                onSubmit={handleRegister}
                className="space-y-6"
            >

                <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Button type="submit">

                    Register

                </Button>

            </form>

            <p className="text-center mt-8 text-gray-600">

                Already have an account?

                <Link
                    to="/login"
                    className="text-blue-700 font-semibold ml-2"
                >
                    Login
                </Link>

            </p>

        </AuthLayout>

    );

};

export default Register;