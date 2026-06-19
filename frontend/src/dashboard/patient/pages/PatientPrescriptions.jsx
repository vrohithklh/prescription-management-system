import { useEffect, useState } from "react";
import axios from "axios";
import PatientLayout from "../layouts/PatientLayout";

const PatientPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:3000/prescriptions"
            );

            setPrescriptions(data || []);
        } catch (error) {
            console.log("Prescription Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

const currentUser =
    JSON.parse(localStorage.getItem("user"));

const patientPrescriptions =
    prescriptions.filter(
        (item) =>
            item.patient?.toLowerCase() ===
            currentUser?.name?.toLowerCase()
    );

const filteredData =
    patientPrescriptions.filter(
        (item) =>
            item.patient?.toLowerCase().includes(search.toLowerCase())
    );

    const totalPrescriptions = prescriptions.length;

const activePrescriptions =
prescriptions.filter(
(item) => item.status === "Active"
).length;

    const completedPrescriptions =
        prescriptions.filter(
            (item) => item.status === "Completed"
        ).length;
const updateStatus = async (id, status) => {

    try {

        await axios.patch(
            `http://localhost:3000/prescriptions/${id}`,
            {
                status
            }
        );

        fetchPrescriptions();

    } catch (error) {

        console.log(error);

    }

};
    return (
        <PatientLayout>

            {/* Header */}

            <div className="mb-10">

                <h1 className="text-5xl font-black text-gray-900">
                    My Prescriptions
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Manage medicines, dosage schedules and prescription history.
                </p>

            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-3 gap-8 mb-10">

                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-[30px] p-8 shadow-xl">
                    <p className="text-blue-100">
                        Total Prescriptions
                    </p>
                    <h2 className="text-5xl font-black mt-3">
                        {totalPrescriptions}
                    </h2>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-[30px] p-8 shadow-xl">
                    <p className="text-green-100">
                        Active Prescriptions
                    </p>
                    <h2 className="text-5xl font-black mt-3">
                        {activePrescriptions}
                    </h2>
                </div>

                <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[30px] p-8 shadow-xl">
                    <p className="text-pink-100">
                        Completed
                    </p>
                    <h2 className="text-5xl font-black mt-3">
                        {completedPrescriptions}
                    </h2>
                </div>

            </div>

            {/* Search */}

            <div className="mb-10">

                <input
                    type="text"
                    placeholder="Search medicine or patient..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full lg:w-[450px] border border-gray-200 bg-white rounded-2xl p-4 outline-none shadow-sm"
                />

            </div>

            {/* Loading */}

            {loading && (
                <div className="bg-white rounded-[30px] p-10 shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-blue-600">
                        Loading Prescriptions...
                    </h2>
                </div>
            )}

            {/* Empty */}

            {!loading && filteredData.length === 0 && (
                <div className="bg-white rounded-[30px] p-12 shadow-lg text-center">
                    <h2 className="text-3xl font-bold text-gray-700">
                        No Prescriptions Found
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Your prescriptions will appear here.
                    </p>
                </div>
            )}

            {/* Cards */}

            {!loading && filteredData.length > 0 && (

                <div className="grid lg:grid-cols-2 gap-8">

                    {filteredData.map((item) => (

                        <div
                            key={item.id}
                            className="group bg-white rounded-[35px] shadow-xl border border-gray-100 p-8 hover:-translate-y-2 transition-all duration-500"
                        >

                            <div className="flex items-center justify-between">

<h2 className="text-3xl font-black text-blue-700">
    Prescription RX-{item.id}
</h2>

                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-bold ${item.status === "Completed"
                                        ? "bg-gray-200 text-gray-700"
                                        : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {item.status}
                                </span>

                            </div>

                            <div className="grid grid-cols-2 gap-5 mt-8">
<div className="mt-6">

    <h3 className="font-bold text-lg text-blue-700 mb-3">
        Prescribed Medicines
    </h3>

    <div className="space-y-3">

        {item.medicines?.map((medicine, index) => (

            <div
                key={index}
                className="bg-blue-50 p-4 rounded-2xl"
            >

                <p>
                    <strong>Medicine:</strong>{" "}
                    {medicine.medicineName}
                </p>

                <p>
                    <strong>Dosage:</strong>{" "}
                    {medicine.dosage}
                </p>

                <p>
                    <strong>Duration:</strong>{" "}
                    {medicine.duration}
                </p>

            </div>

        ))}

    </div>

</div>
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Patient
                                    </p>

                                    <h3 className="font-bold text-lg">
                                        {item.patient}
                                    </h3>
                                </div>

                                

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Prescription ID
                                    </p>

                                    <h3 className="font-bold text-lg">
                                        RX-{item.id}
                                    </h3>
                                </div>

                            </div>

                            <div className="mt-8 bg-blue-50 rounded-3xl p-5">

                                <p className="text-blue-700 font-bold mb-2">
                                    Doctor Notes
                                </p>

<p className="text-gray-600">
    {item.notes}
</p>
                                <div className="mt-5 flex gap-3">

    {item.status === "Issued" && (

        <button
            onClick={() => updateStatus(item.id, "Active")}
            className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold"
        >
            Start Medication
        </button>

    )}

    {item.status === "Active" && (

        <button
            onClick={() => updateStatus(item.id, "Completed")}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold"
        >
            Mark Completed
        </button>

    )}

</div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </PatientLayout>
    );
};

export default PatientPrescriptions;