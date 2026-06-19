import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };
    const [analytics, setAnalytics] = useState({});
const [activities, setActivities] = useState([]);
    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const doctors = await axios.get("http://localhost:3000/doctors");
                const patients = await axios.get("http://localhost:3000/patients");
                const prescriptions = await axios.get("http://localhost:3000/prescriptions");
                const medicines = await axios.get("http://localhost:3000/medicines");
                const appointments = await axios.get("http://localhost:3000/appointments");
                const refills = await axios.get("http://localhost:3000/refills");
const activitiesRes = await axios.get(
    "http://localhost:3000/activities"
);
                setAnalytics({
                    totalDoctors: doctors.data.length,
                    totalPatients: patients.data.length,
                    totalPrescriptions: prescriptions.data.length,
                    totalMedicines: medicines.data.length,
                    totalAppointments: appointments.data.length,
                    totalRefillRequests: refills.data.length,
                });
setActivities(activitiesRes.data);
            } catch (error) {

                console.log(error);

            }

        };

        fetchAnalytics(); // 🔥 THIS LINE IS MISSING

    }, []);
    return (

        <AdminLayout>

            <div className="flex items-center justify-between mb-12 flex-wrap gap-8">

                <div>

                    <h1 className="text-6xl font-black text-gray-900">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-500 mt-4 text-lg">
                        Monitor healthcare operations, analytics, and management systems.
                    </p>

                    <button
                        onClick={handleLogout}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold"
                    >
                        Logout
                    </button>

                </div>
                <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-700 px-8 py-5 rounded-[32px] text-white shadow-2xl shadow-cyan-500/20">

                    <p className="text-cyan-100 text-sm">

                        System Access

                    </p>

                    <h2 className="text-3xl font-black mt-2">

                        Super Admin

                    </h2>

                </div>

            </div>

            <div className="grid lg:grid-cols-4 gap-8">

                <div className="rounded-[36px] p-8 bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-700 text-white shadow-2xl">

                    <p className="text-cyan-100 text-lg">

                        Doctors

                    </p>

                    <h1 className="text-7xl font-black mt-6">

                        {analytics.totalDoctors || 0}

                    </h1>

                    <div className="mt-8">

                        <span className="text-cyan-100 text-sm">

                            Active Staff

                        </span>

                    </div>

                </div>

                <div className="rounded-[36px] p-8 bg-gradient-to-br from-emerald-500 via-green-500 to-green-700 text-white shadow-2xl">

                    <p className="text-green-100 text-lg">

                        Patients

                    </p>

                    <h1 className="text-7xl font-black mt-6">

                        {analytics.totalPatients || 0}

                    </h1>

                    <div className="mt-8">

                        <span className="text-green-100 text-sm">

                            Registered Users

                        </span>

                    </div>

                </div>

                <div className="rounded-[36px] p-8 bg-gradient-to-br from-pink-500 via-rose-500 to-rose-700 text-white shadow-2xl">

                    <p className="text-pink-100 text-lg">

                        Prescriptions

                    </p>

                    <h1 className="text-7xl font-black mt-6">

                        {analytics.totalPrescriptions || 0}

                    </h1>

                    <div className="mt-8">

                        <span className="text-pink-100 text-sm">

                            Total Records

                        </span>

                    </div>

                </div>

                <div className="rounded-[36px] p-8 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white shadow-2xl">

                    <p className="text-yellow-100 text-lg">

                        Medicines

                    </p>

                    <h1 className="text-6xl font-black mt-6">

                        {analytics.totalMedicines || 0}

                    </h1>

                    <div className="mt-8">

                        <span className="text-yellow-100 text-sm">

                            Available Inventory

                        </span>

                    </div>

                </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-10 mt-14">

                <div className="bg-gradient-to-br from-white to-cyan-50 border border-cyan-100 rounded-[40px] p-10 shadow-2xl">

                    <h2 className="text-4xl font-black text-gray-900">

                        System Activity

                    </h2>

                    <p className="text-gray-500 mt-3">

                        Real-time healthcare management overview.

                    </p>

                    <div className="mt-10 space-y-6">

                        <div className="flex justify-between">

                            <span>Active Doctors</span>

                            <span className="font-black text-cyan-600">

                                {analytics.totalDoctors || 0}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Pending Refills</span>

                            <span className="font-black text-orange-500">

                                {analytics.totalRefillRequests || 0}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Appointments</span>

                            <span className="font-black text-green-600">

                                {analytics.totalAppointments || 0}

                            </span>

                        </div>

                    </div>

                </div>

                <div className="rounded-[40px] p-10 bg-gradient-to-r from-blue-700 via-cyan-500 to-cyan-400 text-white shadow-2xl">

                    <h2 className="text-5xl font-black">

                        Healthcare Analytics

                    </h2>

                    <p className="mt-5 text-cyan-100 text-lg">

                        Live statistics fetched from Healthcare Database.

                    </p>

                    <div className="mt-8 space-y-4 text-xl font-bold">

                        <p>Doctors : {analytics.totalDoctors || 0}</p>

                        <p>Patients : {analytics.totalPatients || 0}</p>

                        <p>Medicines : {analytics.totalMedicines || 0}</p>

                        <p>Prescriptions : {analytics.totalPrescriptions || 0}</p>

                        <p>Appointments : {analytics.totalAppointments || 0}</p>

                    </div>

                </div>

            </div>
{/* Recent Activity */}

<div className="mt-14 bg-white rounded-[40px] p-10 shadow-2xl">

    <h2 className="text-4xl font-black text-gray-900">
        Recent Activity
    </h2>

    <p className="text-gray-500 mt-3">
        Latest healthcare system actions.
    </p>

    <div className="overflow-x-auto mt-8">

        <table className="w-full">

            <thead>

                <tr className="border-b">

                    <th className="text-left py-4">
                        Activity
                    </th>

                    <th className="text-left py-4">
                        Status
                    </th>

                    <th className="text-left py-4">
                        Time
                    </th>

                </tr>

            </thead>

           <tbody>

    {activities.map((item) => (

        <tr
            key={item.id}
            className="border-b"
        >

            <td className="py-4">
                {item.action}
            </td>

            <td>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                    {item.status || "Success"}

                </span>

            </td>

            <td>
                {item.time}
            </td>

        </tr>

    ))}

</tbody>

        </table>

    </div>

</div>
        </AdminLayout>

    );

};

export default AdminDashboard;