import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../../components/DoctorSidebar";
import Topbar from "../../../components/Topbar";
import { useNavigate } from "react-router-dom";
const DoctorAppointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        fetchAppointments();

    }, []);

    const fetchAppointments = async () => {

        try {

            const { data } = await axios.get(
                "http://localhost:3000/appointments"
            );

            setAppointments(data);

        }

        catch (error) {

            console.log(error);

        }

    };

   const updateStatus = async (id, status) => {

    try {

        await axios.patch(
            `http://localhost:3000/appointments/${id}`,
            { status }
        );

        const appointment = appointments.find(
            (item) => item.id === id
        );

        if (status === "Approved") {

            await axios.post(
                "http://localhost:3000/notifications",
                {
                    title: "Appointment Approved",
                    message: `Dr. ${appointment.doctor} approved your appointment.`,
                    time: "Just Now",
                    status: "New",
                    icon: "✅",
                    color: "from-green-500 to-emerald-700"
                }
            );

        }

        if (status === "Rejected") {

            await axios.post(
                "http://localhost:3000/notifications",
                {
                    title: "Appointment Rejected",
                    message: `Dr. ${appointment.doctor} rejected your appointment.`,
                    time: "Just Now",
                    status: "New",
                    icon: "❌",
                    color: "from-red-500 to-rose-700"
                }
            );

        }

        fetchAppointments();

    }

    catch (error) {

        console.log(error);

    }

};
    const canStartConsultation = (appointmentDate, appointmentTime) => {

        const appointmentDateTime = new Date(
            `${appointmentDate} ${appointmentTime}`
        );

        return new Date() >= appointmentDateTime;

    };

    return (

        <div className="flex bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10 overflow-y-auto">

                <Topbar />

                <div className="mt-10">

                    <h1 className="text-5xl font-bold text-gray-800">
                        Appointments Management
                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">
                        Manage patient appointments and consultation schedules.
                    </p>

                </div>

                {/* Cards */}

                <div className="grid md:grid-cols-4 gap-6 mt-8">

                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-[30px] shadow-2xl hover:scale-105 transition">

                        <h3>Total Appointments</h3>

                        <p className="text-5xl font-bold mt-3">
                            {appointments.length}
                        </p>

                    </div>

                    <div className="bg-green-600 text-white p-6 rounded-3xl">

                        <h3>Approved</h3>

                        <p className="text-5xl font-bold mt-3">
                            {
                                appointments.filter(
                                    (a) => a.status === "Approved"
                                ).length
                            }
                        </p>

                    </div>

                    <div className="bg-red-600 text-white p-6 rounded-3xl">

                        <h3>Rejected</h3>

                        <p className="text-5xl font-bold mt-3">
                            {
                                appointments.filter(
                                    (a) => a.status === "Rejected"
                                ).length
                            }
                        </p>

                    </div>

                    <div className="bg-orange-500 text-white p-6 rounded-3xl">

                        <h3>Pending</h3>

                        <p className="text-5xl font-bold mt-3">
                            {
                                appointments.filter(
                                    (a) => a.status === "Pending"
                                ).length
                            }
                        </p>

                    </div>

                </div>

                {/* Search */}

                <div className="mt-8">

                    <input
                        type="text"
                        placeholder="Search Appointment ID or Patient..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="bg-white/80 backdrop-blur-xl border border-white/50 px-6 py-4 rounded-3xl w-[420px] shadow-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Table */}

                <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-2xl p-8 overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-200 text-gray-600 uppercase text-sm">

                                <th className="text-left py-4">
                                    Appointment ID
                                </th>

                                <th className="text-left py-4">
                                    Patient
                                </th>

                                <th className="text-left py-4">
                                    Doctor
                                </th>

                                <th className="text-left py-4">
                                    Date
                                </th>

                                <th className="text-left py-4">
                                    Time
                                </th>

                                <th className="text-left py-4">
                                    Status
                                </th>

                                <th className="text-left py-4">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                appointments

                                    .filter(

                                        (item) =>

                                            (`APT${String(item.id).padStart(3, "0")}`)
                                                .toLowerCase()
                                                .includes(searchTerm.toLowerCase())

                                            ||

                                            item.patient
                                                .toLowerCase()
                                                .includes(searchTerm.toLowerCase())

                                    )

                                    .map((item) => (

                                        <tr
                                            key={item.id}
                                            className="border-b border-gray-100 hover:bg-blue-50 transition"
                                        >

                                            <td className="py-5 font-semibold">
                                                APT{String(item.id).padStart(3, "0")}
                                            </td>

                                            <td className="py-5">
                                                {item.patient}
                                            </td>

                                            <td className="py-5">
                                                {item.doctor}
                                            </td>

                                            <td className="py-5">
                                                {item.date}
                                            </td>

                                            <td className="py-5">
                                                {item.time}
                                            </td>

                                            <td className="py-5">

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold
                                                    ${item.status === "Approved"
                                                            ? "bg-green-100 text-green-700"
                                                            : item.status === "Rejected"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >

                                                    {item.status}

                                                </span>

                                            </td>
                                            <td className="py-5">

                                                <div className="flex gap-2 flex-wrap">

                                                    {item.status === "Pending" && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    updateStatus(item.id, "Approved")
                                                                }
                                                                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition"
                                                            >
                                                                Approve
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    updateStatus(item.id, "Rejected")
                                                                }
                                                                className="bg-gradient-to-r from-red-500 to-red-700 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}

                                                    {item.consultationCompleted ? (

                                                        <span className="text-green-600 font-bold">
                                                            ✅ Completed
                                                        </span>

                                                    ) : item.status === "Rejected" ? (

                                                        <span className="text-red-600 font-bold">
                                                            ❌ Rejected
                                                        </span>

                                                    ) : item.status === "Approved" ? (

                                                        canStartConsultation(
                                                            item.date,
                                                            item.time
                                                        ) ? (

                                                            <button
                                                                onClick={() =>
                                                                    navigate("/doctor/chat", {
                                                                        state: {
                                                                            appointmentId: item.id
                                                                        }
                                                                    })
                                                                }
                                                                className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white px-5 py-2 rounded-xl"
                                                            >
                                                                Join Chat
                                                            </button>

                                                        ) : (

                                                            <span className="text-orange-600 font-bold">
                                                                Starts at {item.time}
                                                            </span>

                                                        )

                                                    ) : null}

                                                </div>

                                            </td>
                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default DoctorAppointments;