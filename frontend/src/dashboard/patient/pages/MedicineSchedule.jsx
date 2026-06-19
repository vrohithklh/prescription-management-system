import { useEffect, useState } from "react";
import axios from "axios";
import PatientLayout from "../layouts/PatientLayout";

const MedicineSchedule = () => {

    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {

        try {

            const { data } = await axios.get(
                "http://localhost:3000/medicines"
            );

            setMedicines(data || []);

        }

        catch (error) {

            console.log("Medicine Fetch Error:", error);

        }

        finally {

            setLoading(false);

        }

    };

    const filteredMedicines = medicines.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <PatientLayout>

            {/* Header */}

            <div className="mb-10">

                <h1 className="text-5xl font-black text-gray-900">
                    Medicine Schedule
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Daily medicine timing management and healthcare tracking.
                </p>

            </div>

            {/* Search */}

            <div className="mb-8">

                <input
                    type="text"
                    placeholder="Search medicine..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full lg:w-[400px] p-4 border border-gray-200 rounded-2xl shadow-sm outline-none"
                />

            </div>

            {/* Loading */}

            {loading && (

                <div className="bg-white rounded-[30px] shadow-lg p-10 text-center">

                    <h2 className="text-2xl font-bold text-blue-600">
                        Loading Schedule...
                    </h2>

                </div>

            )}

            {/* Empty State */}

            {!loading && filteredMedicines.length === 0 && (

                <div className="bg-white rounded-[30px] shadow-lg p-12 text-center">

                    <h2 className="text-3xl font-bold text-gray-700">
                        No Medicines Found
                    </h2>

                    <p className="text-gray-500 mt-3">
                        No medicine schedule available.
                    </p>

                </div>

            )}

            {/* Cards */}

            {!loading && filteredMedicines.length > 0 && (

                <div className="grid lg:grid-cols-3 gap-8">

                    {filteredMedicines.map((item) => (

                        <div
                            key={item.id}
                            className="group relative overflow-hidden rounded-[35px] p-8 bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-700 text-white shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >

                            <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] bg-white/10 rounded-full blur-3xl"></div>

                            <div className="relative z-10">

                                <p className="text-cyan-100 text-sm font-semibold">
                                    Daily Medicine
                                </p>

                                <h2 className="text-4xl font-black mt-5">
                                    {item.name}
                                </h2>

                                <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-3xl p-5">

                                    <p className="text-cyan-100 text-sm">
                                        Suggested Time
                                    </p>

                                    <h3 className="text-3xl font-black mt-2">
                                        08:00 AM
                                    </h3>

                                </div>

                                <div className="mt-6">

                                    <p className="text-cyan-100">
                                        Category
                                    </p>

                                    <h3 className="font-bold text-xl mt-1">
                                        {item.category}
                                    </h3>

                                </div>

                                <div className="mt-6 flex items-center gap-3">

                                    <div className="w-3 h-3 rounded-full bg-green-300 animate-pulse"></div>

                                    <span className="text-sm">
                                        Reminder Active
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

            {/* Bottom Widget */}

            <div className="mt-12 bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 rounded-[35px] p-10 text-white shadow-2xl">

                <h2 className="text-4xl font-black">
                    Smart Medicine Tracking
                </h2>

                <p className="mt-4 text-cyan-100 max-w-3xl">
                    Stay updated with medicine reminders, refill schedules,
                    prescription monitoring and healthcare progress.
                </p>

                <button
                    className="mt-8 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-lg hover:scale-105 transition"
                >
                    View Full Schedule
                </button>

            </div>

        </PatientLayout>

    );

};

export default MedicineSchedule;