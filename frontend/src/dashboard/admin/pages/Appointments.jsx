import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

const Appointments = () => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        const fetchAppointments = async () => {

            try {

                const { data } = await axios.get(
                    "http://localhost:3000/appointments"
                );

                setAppointments(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchAppointments();

    }, []);

    return (

        <AdminLayout>

            <h1 className="text-6xl font-black mb-10">

                Appointments

            </h1>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">

                <div className="bg-blue-600 text-white rounded-3xl p-8">

                    <p>Total Appointments</p>

                    <h1 className="text-6xl font-black">

                        {appointments.length}

                    </h1>

                </div>

                <div className="bg-green-600 text-white rounded-3xl p-8">

                    <p>Approved</p>

                    <h1 className="text-6xl font-black">

                        {
                            appointments.filter(
                                (a) => a.status === "Approved"
                            ).length
                        }

                    </h1>

                </div>

                <div className="bg-orange-500 text-white rounded-3xl p-8">

                    <p>Rejected</p>

                    <h1 className="text-6xl font-black">

                        {
                            appointments.filter(
                                (a) => a.status === "Rejected"
                            ).length
                        }

                    </h1>

                </div>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">

                <table className="w-full">

                    <thead>

                        <tr>
                            <th className="text-left pb-5">Appointment ID</th>
                            <th className="text-left pb-5">Patient</th>
                            <th className="text-left pb-5">Doctor</th>
                            <th className="text-left pb-5">Date</th>
                            <th className="text-left pb-5">Status</th>
                            <th className="text-left pb-5">Time</th>
                        </tr>

                    </thead>

                    <tbody>

                        {appointments.map((appointment) => (

                            <tr key={appointment.id}>

                                <td className="py-4 font-bold text-cyan-600">
                                    APT{String(appointment.id).padStart(3, "0")}
                                </td>

                                <td className="py-4">
                                    {appointment.patient?.name || appointment.patient}
                                </td>

                                <td className="py-4">
                                    {appointment.doctor?.name || appointment.doctor}
                                </td>

                                <td className="py-4">
                                    {appointment.date}
                                </td>

                                <td className="py-4">
                                    {appointment.status}
                                </td>

                                <td className="py-4">
                                    {appointment.time || "10:30 AM"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

};

export default Appointments;