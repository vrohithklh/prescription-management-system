import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../layouts/AdminLayout";

const Doctors = () => {

    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [doctorForm, setDoctorForm] = useState({
        name: "",
        email: "",
        password: "",
        specialization: "",
        experience: "",
    });

    const [showForm, setShowForm] = useState(false);

    const [editingDoctor, setEditingDoctor] = useState(null);
    const deleteDoctorHandler = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/doctors/${id}`
            );

            setDoctors(
                doctors.filter(
                    (doctor) => doctor.id !== id
                )
            );

            alert("Doctor deleted successfully");

        } catch (error) {

            console.log(error);

            alert("Delete failed");

        }

    };
    const addDoctorHandler = async () => {

        try {

            const doctorData = {

                name: `Doctor ${Date.now()}`,
                email: `doctor${Date.now()}@gmail.com`,
                specialization: "General Physician",
                experience: 1,
                password: "123456"

            };

            const { data } = await axios.post(
                "http://localhost:3000/doctors",
                doctorData
            );

            setDoctors([...doctors, data]);

            alert("Doctor added successfully");

        } catch (error) {

            console.log(error);

            alert("Add doctor failed");

        }

    };

    const editDoctorHandler = async (doctor) => {

        try {

            const updatedDoctor = {
                ...doctor,
                experience: (doctor.experience || 0) + 1
            };

            const { data } = await axios.put(
                `http://localhost:3000/doctors/${doctor.id}`,
                updatedDoctor
            );

            setDoctors(
                doctors.map((d) =>
                    d.id === doctor.id
                        ? data
                        : d
                )
            );

            alert("Doctor updated successfully");

        } catch (error) {

            console.log(error);

            alert("Update failed");

        }

    };
    const saveDoctorHandler = async () => {

        const nameRegex = /^[A-Za-z\s]+$/;

        if (!doctorForm.name.trim()) {
            alert("Doctor Name is required");
            return;
        }

        if (doctorForm.name.trim().length < 4) {
            alert("Doctor Name must be at least 4 characters");
            return;
        }
        if (!nameRegex.test(doctorForm.name)) {
            alert("Doctor Name can contain only letters");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(doctorForm.email)) {
            alert("Enter a valid email address");
            return;
        }

        if (doctorForm.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        if (!doctorForm.specialization.trim()) {
            alert("Specialization is required");
            return;
        }

        if (doctorForm.specialization.trim().length < 3) {
            alert("Specialization must be at least 3 characters");
            return;
        }

        if (
            doctorForm.experience === "" ||
            isNaN(doctorForm.experience) ||
            Number(doctorForm.experience) < 0
        ) {
            alert("Enter valid experience");
            return;
        }
        try {

            if (editingDoctor) {

                const { data } = await axios.put(
                    `http://localhost:3000/doctors/${editingDoctor.id}`,
                    {
                        ...editingDoctor,
                        ...doctorForm,
                    }
                );

                setDoctors(
                    doctors.map((doctor) =>
                        doctor.id === editingDoctor.id
                            ? data
                            : doctor
                    )
                );

            } else {

                const { data } = await axios.post(
                    "http://localhost:3000/doctors",
                    doctorForm
                );

                setDoctors([...doctors, data]);

            }

            setShowForm(false);

        } catch (error) {

            console.log(error);

        }

    };
    useEffect(() => {

        const fetchDoctors = async () => {

            try {

                const { data } = await axios.get(
                    "http://localhost:3000/doctors"
                );

                setDoctors(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchDoctors();

    }, []);

    return (

        <AdminLayout>

            {/* Header */}

            <div className="flex items-center justify-between mb-12 flex-wrap gap-6">

                <div>

                    <h1 className="text-6xl font-black text-gray-900">

                        Doctor Management

                    </h1>

                    <p className="text-gray-500 mt-4 text-lg">

                        Manage doctor records, healthcare staff, and system access.

                    </p>

                </div>
                <button
                    onClick={() => {
                        setEditingDoctor(null);

                        setDoctorForm({
                            name: "",
                            specialization: "",
                            experience: "",
                        });

                        setShowForm(true);
                    }}
                    className="px-8 py-4 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold shadow-2xl shadow-cyan-500/20 hover:scale-[1.03] transition-all duration-300"
                >

                    + Add Doctor

                </button>

            </div>

            {/* Search */}

            <div className="mb-10">

                <input
                    type="text"
                    placeholder="Search by Doctor ID or Name..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="w-full lg:w-[420px] bg-white border border-cyan-100 rounded-3xl px-6 py-5 outline-none shadow-lg"
                />

            </div>

            {/* Stats */}

            <div className="grid lg:grid-cols-3 gap-8 mb-12">

                <div className="bg-gradient-to-br from-cyan-500 to-blue-700 rounded-[32px] p-8 text-white shadow-2xl">

                    <p className="text-cyan-100">

                        Total Doctors

                    </p>

                    <h1 className="text-6xl font-black mt-5">

                        {doctors.length}

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-[32px] p-8 text-white shadow-2xl">

                    <p className="text-green-100">

                        Active Doctors

                    </p>

                    <h1 className="text-6xl font-black mt-5">

                        {doctors.length}

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-pink-500 to-rose-700 rounded-[32px] p-8 text-white shadow-2xl">

                    <p className="text-pink-100">

                        Specialists

                    </p>

                    <h1 className="text-6xl font-black mt-5">

                        {
                            new Set(
                                doctors.map(
                                    doctor => doctor.specialization
                                )
                            ).size
                        }

                    </h1>

                </div>

            </div>

            {/* Table */}

            <div className="relative overflow-hidden bg-white border border-cyan-100 rounded-[40px] shadow-2xl p-8">

                <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-cyan-400/10 blur-3xl rounded-full"></div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-200 text-left">

                                <th className="pb-6 text-gray-500 text-lg">

                                    Doctor ID

                                </th>

                                <th className="pb-6 text-gray-500 text-lg">

                                    Name

                                </th>

                                <th className="pb-6 text-gray-500 text-lg">

                                    Specialization

                                </th>

                                <th className="pb-6 text-gray-500 text-lg">

                                    Experience

                                </th>

                                <th className="pb-6 text-gray-500 text-lg">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {doctors
                                .filter((doctor) =>
                                    doctor.name
                                        ?.toLowerCase()
                                        .includes(searchTerm.toLowerCase()) ||

                                    `DOC${String(doctor.id).padStart(3, "0")}`
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((doctor) => (

                                    <tr
                                        key={doctor.id}
                                        className="border-b border-gray-100 hover:bg-cyan-50 transition-all duration-300"
                                    >

                                        <td className="py-6 font-bold text-cyan-600">

                                            DOC{String(doctor.id).padStart(3, "0")}

                                        </td>

                                        <td className="py-6 font-semibold text-gray-800">

                                            {doctor.name}

                                        </td>

                                        <td className="py-6 text-gray-600">

                                            {doctor.specialization}

                                        </td>

                                        <td className="py-6 text-gray-600">

                                            {doctor.experience} Years

                                        </td>

                                        <td className="py-6 flex gap-4">
                                            <button
                                                onClick={() => {

                                                    setEditingDoctor(doctor);

                                                    setDoctorForm({
                                                        name: doctor.name || "",
                                                        email: doctor.email || "",
                                                        password: doctor.password || "",
                                                        specialization: doctor.specialization || "",
                                                        experience: doctor.experience || "",
                                                    });

                                                    setShowForm(true);

                                                }}
                                                className="px-5 py-2 rounded-2xl bg-blue-100 text-blue-700 font-bold"
                                            >

                                                Edit

                                            </button>

                                            <button
                                                onClick={() => deleteDoctorHandler(doctor.id)}
                                                className="px-5 py-2 rounded-2xl bg-red-100 text-red-600 font-bold"
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                </div>

            </div>
            {showForm && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white p-8 rounded-3xl w-[450px]">

                        <h2 className="text-3xl font-bold mb-6">

                            {editingDoctor
                                ? "Edit Doctor"
                                : "Add Doctor"}

                        </h2>

                        <input
                            type="text"
                            placeholder="Doctor Name"
                            value={doctorForm.name}
                            onChange={(e) =>
                                setDoctorForm({
                                    ...doctorForm,
                                    name: e.target.value,
                                })
                            }
                            className="w-full border p-3 rounded-xl mb-4"
                        />
                        <input
                            type="email"
                            placeholder="Doctor Email"
                            value={doctorForm.email}
                            onChange={(e) =>
                                setDoctorForm({
                                    ...doctorForm,
                                    email: e.target.value,
                                })
                            }
                            className="w-full border p-3 rounded-xl mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={doctorForm.password}
                            onChange={(e) =>
                                setDoctorForm({
                                    ...doctorForm,
                                    password: e.target.value,
                                })
                            }
                            className="w-full border p-3 rounded-xl mb-4"
                        />
                        <select
                            value={doctorForm.specialization}
                            onChange={(e) =>
                                setDoctorForm({
                                    ...doctorForm,
                                    specialization: e.target.value,
                                })
                            }
                            className="w-full border p-3 rounded-xl mb-4"
                        >
                            <option value="">Select Specialization</option>
                            <option>Cardiology</option>
                            <option>Neurology</option>
                            <option>Orthopedics</option>
                            <option>Dermatology</option>
                            <option>Pediatrics</option>
                            <option>General Physician</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Experience"
                            value={doctorForm.experience}
                            onChange={(e) =>
                                setDoctorForm({
                                    ...doctorForm,
                                    experience: e.target.value,
                                })
                            }
                            className="w-full border p-3 rounded-xl mb-6"
                        />

                        <div className="flex gap-4">

                            <button
                                onClick={saveDoctorHandler}
                                className="bg-green-600 text-white px-5 py-3 rounded-xl"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setShowForm(false)}
                                className="bg-gray-400 text-white px-5 py-3 rounded-xl"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}
        </AdminLayout>

    );

};

export default Doctors;