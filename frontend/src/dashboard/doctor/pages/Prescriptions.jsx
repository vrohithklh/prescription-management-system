import Sidebar from "../../../components/DoctorSidebar";
import Topbar from "../../../components/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
const Prescriptions = () => {

    const [showForm, setShowForm] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        patient: "",
        medicine: "",
        dosage: "",
        duration: "",
        notes: "",
        status: "Pending"
    });

    const [editIndex, setEditIndex] = useState(null);
    useEffect(() => {

        fetchPrescriptions();

    }, []);

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
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSavePrescription = async () => {

        try {

            if (editIndex !== null) {

                await axios.put(
                    `http://localhost:3000/prescriptions/${prescriptions[editIndex].id}`,
                    {
                        ...prescriptions[editIndex],
                        patient: formData.patient,
                        medicineName: formData.medicine,
                        dosage: formData.dosage,
                        duration: formData.duration,
                        status: formData.status || "Pending"
                    }
                );

                setEditIndex(null);

            } else {

                await axios.post(
                    "http://localhost:3000/prescriptions",
                    {
                        id: Date.now(),
                        patient: formData.patient,
                        medicineName: formData.medicine,
                        dosage: formData.dosage,
                        duration: formData.duration,
                        notes: formData.notes,
                        doctor: "Dr. Smith",
                        date: new Date().toLocaleDateString(),
                        status: "Pending"
                    }
                );

            }

            fetchPrescriptions();

            setFormData({
                patient: "",
                medicine: "",
                dosage: "",
                duration: "",
                notes: "",
                status: "Pending"
            });

            setShowForm(false);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleDeletePrescription = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/prescriptions/${id}`
            );

            fetchPrescriptions();

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleEditPrescription = (item, index) => {

        setFormData({
            patient: item.patient,
            medicine: item.medicineName,
            dosage: item.dosage,
            duration: item.duration,
            status: item.status
        });

        setEditIndex(index);
        setShowForm(true);

    };

    return (

        <div className="flex bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10 overflow-y-auto">

                <Topbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <div className="mt-10">

                    <h1 className="text-5xl font-bold text-gray-800">
                        Prescription Management
                    </h1>

                    <p className="text-gray-500 text-lg mt-3">
                        Manage patient prescriptions and medicine workflows.
                    </p>

                </div>

                <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-xl p-8">

                    <div className="flex justify-between items-center mb-8">

                        <div>

                            <h2 className="text-3xl font-bold text-gray-800">
                                Active Prescriptions
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Create and manage prescriptions.
                            </p>

                        </div>

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-700 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 transition"
                        >

                            {
                                showForm
                                    ? "Close Form"
                                    : "+ Create Prescription"
                            }

                        </button>

                    </div>

                    {
                        showForm && (

                            <div className="mb-10 bg-blue-50 border border-blue-100 rounded-[30px] p-8">

                                <h2 className="text-3xl font-bold text-blue-700 mb-8">
                                    Create Prescription
                                </h2>

                                <div className="grid lg:grid-cols-2 gap-6">

                                    <input
                                        type="text"
                                        placeholder="Patient Name"
                                        name="patient"
                                        value={formData.patient}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-4 rounded-2xl outline-none"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Medicine Name"
                                        name="medicine"
                                        value={formData.medicine}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-4 rounded-2xl outline-none"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Dosage"
                                        name="dosage"
                                        value={formData.dosage}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-4 rounded-2xl outline-none"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Duration"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-4 rounded-2xl outline-none"
                                    />

                                </div>

                                <textarea
                                    placeholder="Prescription Notes..."
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full mt-6 border border-gray-300 p-4 rounded-2xl outline-none h-40 resize-none"
                                />

                                <button
                                    onClick={handleSavePrescription}
                                    className="mt-6 bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition"
                                >

                                    Save Prescription

                                </button>

                            </div>

                        )
                    }

                    <div className="overflow-x-auto">

                        <table className="w-full table-fixed">

                            <thead>

                                <thead>
                                    <tr className="border-b border-gray-200">

                                        <th className="w-24 text-left py-4 px-3">Patient ID</th>
                                        <th className="w-32 text-left py-4 px-3">Patient</th>
                                        <th className="w-32 text-left py-4 px-3">Doctor</th>
                                        <th className="w-32 text-left py-4 px-3">Medicine</th>
                                        <th className="w-32 text-left py-4 px-3">Dosage</th>
                                        <th className="w-28 text-left py-4 px-3">Duration</th>
                                        <th className="w-28 text-left py-4 px-3">Date</th>
                                        <th className="w-28 text-left py-4 px-3">Status</th>

                                        <th className="w-80 text-left py-4 px-3">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>
                            </thead>

                            <tbody>

                                {
                                    prescriptions
                                        .filter((item, index) => {

                                            const patientId =
                                                `PAT${String(index + 1).padStart(3, "0")}`;

                                            return (

                                                patientId
                                                    .toLowerCase()
                                                    .includes(searchTerm.toLowerCase()) ||

                                                item.patient
                                                    ?.toLowerCase()
                                                    .includes(searchTerm.toLowerCase()) ||

                                                item.medicineName
                                                    ?.toLowerCase()
                                                    .includes(searchTerm.toLowerCase())

                                            );

                                        })
                                        .map((item, index) => (

                                            <tr
                                                key={item.id}
                                                className="border-b border-gray-100"
                                            >

                                                <td className="py-6 px-3 whitespace-nowrap">
                                                    PAT{String(index + 1).padStart(3, "0")}
                                                </td>

                                                <td className="py-6 font-semibold px-3 whitespace-nowrap ">
                                                    {item.patient}
                                                </td>

                                                <td className="py-6 px-3 whitespace-nowrap">
                                                    Dr. Smith
                                                </td>

                                                <td className="py-6 px-3 whitespace-nowrap">
                                                    {item.medicineName}
                                                </td>

                                                <td className="py-6 px-3 whitespace-nowrap">
                                                    {item.dosage}
                                                </td>

                                                <td className="py-6 px-3 whitespace-nowrap">
                                                    {item.duration}
                                                </td>

                                                <td className="py-6 px-3 whitespace-nowrap">
                                                    {item.date || "03-06-2026"}
                                                </td>

                                                <td className="py-6 px-3 whitespace-nowrap">

                                                    <span
                                                        className={
                                                            item.status === "Completed"
                                                                ? "bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm"
                                                                : "bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm"
                                                        }
                                                    >
                                                        {item.status}
                                                    </span>

                                                </td>
                                                <td className="py-6 px-3">

                                                    <div className="flex flex-wrap gap-2">

                                                        View
                                                        Edit
                                                        Delete
                                                        PDF

                                                    </div>

                                                </td>
                                                <td className="py-6 px-3 whitespace-nowrap flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            alert(
                                                                `Patient : ${item.patient}
Medicine : ${item.medicineName}
Dosage : ${item.dosage}
Duration : ${item.duration}
Status : ${item.status}`
                                                            )
                                                        }
                                                        className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-xl"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleEditPrescription(item, index)
                                                        }
                                                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDeletePrescription(item.id)
                                                        }
                                                        className="bg-red-100 text-red-600 px-4 py-2 rounded-xl"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="bg-green-100 text-green-700 px-4 py-2 rounded-xl"
                                                        onClick={() =>
                                                            alert("PDF Download Coming Next")
                                                        }
                                                    >
                                                        PDF
                                                    </button>
                                                </td>

                                            </tr>
                                        ))
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div >

    );

};

export default Prescriptions;