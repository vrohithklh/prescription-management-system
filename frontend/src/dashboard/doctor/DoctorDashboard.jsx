import Sidebar from "../../components/DoctorSidebar";
import Topbar from "../../components/Topbar";

import axios from "axios";

import { useEffect, useState } from "react";
const DoctorDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const [analytics, setAnalytics] = useState({
        totalDoctors: 0,
        totalPatients: 0,
        totalMedicines: 0,
        totalPrescriptions: 0,
        totalAppointments: 0,
        totalRefillRequests: 0,
    });
    const [prescriptions, setPrescriptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({

        patient: "",
        medicine: "",
        dosage: "",
        duration: "",
        notes: "",
    });
    const [editIndex, setEditIndex] = useState(null);
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };
    const handleSavePrescription = () => {

        const newPrescription = {
            patient: formData.patient,
            medicine: formData.medicine,
            dosage: formData.dosage,
            duration: formData.duration,
            status: "Active",
        };

        if (editIndex !== null) {

            const updatedPrescriptions = [...prescriptions];

            updatedPrescriptions[editIndex] =
                newPrescription;

            setPrescriptions(updatedPrescriptions);

            setEditIndex(null);

        }

        else {

            setPrescriptions([
                ...prescriptions,
                newPrescription,
            ]);

        }

        setFormData({
            patient: "",
            medicine: "",
            dosage: "",
            duration: "",
            notes: "",
        });

        setShowForm(false);

    };
    const handleDeletePrescription = (indexToDelete) => {

        const updatedPrescriptions =
            prescriptions.filter(
                (_, index) => index !== indexToDelete
            );

        setPrescriptions(updatedPrescriptions);

    };
    const handleEditPrescription = (item, index) => {

        setFormData({
            patient: item.patient,
            medicine: item.medicine,
            dosage: item.dosage,
            duration: item.duration,
            notes: "",
        });

        setEditIndex(index);

        setShowForm(true);

    };
    const fetchPrescriptions = async () => {

        try {

            const { data } = await axios.get(
                "http://localhost:3000/prescriptions"
            );

            setPrescriptions(data);

        }

        catch (error) {

            console.log(error);

        }

    };
    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const prescriptionsRes = await axios.get(
                    "http://localhost:3000/prescriptions"
                );

                const appointmentsRes = await axios.get(
                    "http://localhost:3000/appointments"
                );

                const patientsRes = await axios.get(
                    "http://localhost:3000/patients"
                );

                const refillsRes = await axios.get(
                    "http://localhost:3000/refills"
                );

                setAnalytics({

                    totalPatients:
                        patientsRes.data.length,

                    totalPrescriptions:
                        prescriptionsRes.data.length,

                    totalAppointments:
                        appointmentsRes.data.length,

                    totalRefillRequests:
                        refillsRes.data.filter(
                            (item) => item.status === "Pending"
                        ).length

                });

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchAnalytics();
        fetchPrescriptions();

    }, []);
    return (

        <div className="flex bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10 overflow-y-auto">

                <Topbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {/* Heading */}

                <div className="mt-10">

                    <h1 className="text-5xl font-bold text-gray-800">
                        Doctor Dashboard
                    </h1>

                    <p className="text-gray-500 text-lg mt-3">
                        Manage prescriptions and patient medicine workflows.
                    </p>

                </div>

                {/* Doctor Info */}

                <div className="mt-8 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-xl p-8">

                    <h2 className="text-3xl font-bold text-blue-700">
                        Welcome Doctor 👨‍⚕️
                    </h2>

                    <p className="mt-4 text-lg text-gray-600">

                        Doctor ID:

                        <span className="font-bold text-gray-800 ml-2">
                            {user?.id}
                        </span>

                    </p>

                </div>


                <div className="grid md:grid-cols-4 gap-6 mt-8">

                    <div className="bg-blue-600 text-white p-6 rounded-3xl">
                        <h3 className="text-lg">Patients</h3>
                        <p className="text-5xl font-bold mt-3">
                            {analytics.totalPatients}
                        </p>
                    </div>

                    <div className="bg-green-600 text-white p-6 rounded-3xl">
                        <h3 className="text-lg">Prescriptions</h3>
                        <p className="text-5xl font-bold mt-3">
                            {analytics.totalPrescriptions}
                        </p>
                    </div>

                    <div className="bg-orange-500 text-white p-6 rounded-3xl">
                        <h3 className="text-lg">Appointments</h3>
                        <p className="text-5xl font-bold mt-3">
                            {analytics.totalAppointments}
                        </p>
                    </div>

                    <div className="bg-purple-600 text-white p-6 rounded-3xl">
                        <h3 className="text-lg">Refill Requests</h3>

                        <p className="text-5xl font-bold mt-3">
                            {analytics.totalRefillRequests}
                        </p>
                    </div>

                </div>

                {/* Prescription Table */}

                <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-xl p-8">

                    <div className="flex justify-between items-center mb-8">

                        <div>

                            <h2 className="text-3xl font-bold text-gray-800">
                                Active Prescriptions
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Manage current patient prescriptions.
                            </p>

                        </div>


                    </div>

                    {/* Table */}

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-gray-200 text-left">

                                    <th className="pb-5 text-gray-500 font-semibold">
                                        Patient
                                    </th>

                                    <th className="pb-5 text-gray-500 font-semibold">
                                        Medicine
                                    </th>

                                    <th className="pb-5 text-gray-500 font-semibold">
                                        Dosage
                                    </th>

                                    <th className="pb-5 text-gray-500 font-semibold">
                                        Duration
                                    </th>

                                    <th className="pb-5 text-gray-500 font-semibold">
                                        Status
                                    </th>

                                </tr>

                            </thead><tbody>

                                {
                                    prescriptions
                                        .filter(
                                            (item) =>
                                                item.patient
                                                    ?.toLowerCase()
                                                    .includes(
                                                        searchTerm.toLowerCase()
                                                    ) ||

                                                item.medicineName
                                                    ?.toLowerCase()
                                                    .includes(
                                                        searchTerm.toLowerCase()
                                                    )
                                        )
                                        .map((item, index) => (

                                            <tr
                                                key={index}
                                                className="border-b border-gray-100"
                                            >

                                                <td className="py-6">
                                                    {item.patient}
                                                </td>

                                                <td className="py-6">
                                                    {item.medicineName}
                                                </td>

                                                <td className="py-6">
                                                    {item.dosage}
                                                </td>

                                                <td className="py-6">
                                                    {item.duration}
                                                </td>

                                                <td className="py-6">
                                                    <span
                                                        className={`px-4 py-2 rounded-full text-sm font-semibold ${item.status === "Issued"
                                                                ? "bg-green-100 text-green-700"
                                                                : item.status === "Completed"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>

                                            </tr>

                                        ))
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );
}
export default DoctorDashboard;