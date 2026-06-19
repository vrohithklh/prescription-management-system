import { useEffect, useState } from "react";
import axios from "axios";
import PatientLayout from "../layouts/PatientLayout";

const RefillRequest = () => {

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

    const handleRefillRequest = async (medicine) => {

        try {

            const refillData = {

                id: Date.now(),

                patient:
                    JSON.parse(localStorage.getItem("user"))
                        ?.name || "Patient",

                medicine: medicine.name,

                requestDate:
                    new Date()
                        .toISOString()
                        .split("T")[0],

                status: "Pending",

            };

            await axios.post(
                "http://localhost:3000/refills",
                refillData
            );

            alert(
                `${medicine.name} refill request submitted successfully`
            );

        }

        catch (error) {

            console.log(error);

            alert(
                "Unable to submit refill request"
            );

        }

    };

    const filteredMedicines =
        medicines.filter((item) =>
            item.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );

    return (

        <PatientLayout>

            {/* Header */}

            <div className="mb-10">

                <h1 className="text-5xl font-black text-gray-900">
                    Refill Requests
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Request medicine refills instantly and track approval status.
                </p>

            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-3 gap-8 mb-10">

                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-[30px] p-8 shadow-xl">

                    <p className="text-cyan-100">
                        Available Medicines
                    </p>

                    <h2 className="text-5xl font-black mt-3">
                        {medicines.length}
                    </h2>

                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-[30px] p-8 shadow-xl">

                    <p className="text-green-100">
                        Active Inventory
                    </p>

                    <h2 className="text-5xl font-black mt-3">
                        {
                            medicines.filter(
                                (m) => Number(m.stock) > 0
                            ).length
                        }
                    </h2>

                </div>

                <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[30px] p-8 shadow-xl">

                    <p className="text-pink-100">
                        Low Stock Medicines
                    </p>

                    <h2 className="text-5xl font-black mt-3">
                        {
                            medicines.filter(
                                (m) =>
                                    Number(m.stock) > 0 &&
                                    Number(m.stock) < 50
                            ).length
                        }
                    </h2>

                </div>

            </div>

            {/* Search */}

            <div className="mb-10">

                <input
                    type="text"
                    placeholder="Search medicines..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full lg:w-[450px] border border-gray-200 rounded-2xl p-4 outline-none shadow-sm"
                />

            </div>

            {/* Loading */}

            {loading && (

                <div className="bg-white rounded-[30px] p-12 shadow-lg text-center">

                    <h2 className="text-2xl font-bold text-blue-600">
                        Loading Medicines...
                    </h2>

                </div>

            )}

            {/* Empty State */}

            {!loading &&
                filteredMedicines.length === 0 && (

                    <div className="bg-white rounded-[30px] p-12 shadow-lg text-center">

                        <h2 className="text-3xl font-bold text-gray-700">
                            No Medicines Found
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Medicine inventory is empty.
                        </p>

                    </div>

                )}

            {/* Medicine Cards */}

            {!loading &&
                filteredMedicines.length > 0 && (

                    <div className="grid lg:grid-cols-3 gap-8">

                        {filteredMedicines.map((item) => (

                            <div
                                key={item.id}
                                className="group relative overflow-hidden bg-white rounded-[35px] border border-gray-100 p-8 shadow-xl hover:-translate-y-2 transition-all duration-500"
                            >

                                <div className="absolute top-[-40px] right-[-40px] w-[150px] h-[150px] bg-cyan-400/10 blur-3xl rounded-full"></div>

                                <div className="relative z-10">

                                    <span className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-bold">

                                        MED-{item.id}

                                    </span>

                                    <h2 className="text-3xl font-black text-gray-900 mt-6">

                                        {item.name}

                                    </h2>

                                    <p className="text-gray-500 mt-2">

                                        {item.category}

                                    </p>

                                    <div className="mt-8 space-y-3">

                                        <div className="flex justify-between">

                                            <span className="text-gray-500">
                                                Manufacturer
                                            </span>

                                            <span className="font-bold">
                                                {item.manufacturer}
                                            </span>

                                        </div>

                                        <div className="flex justify-between">

                                            <span className="text-gray-500">
                                                Stock
                                            </span>

                                            <span className="font-bold">
                                                {item.stock}
                                            </span>

                                        </div>

                                        <div className="flex justify-between">

                                            <span className="text-gray-500">
                                                Price
                                            </span>

                                            <span className="font-bold">
                                                ₹{item.price}
                                            </span>

                                        </div>

                                    </div>

                                    <button
                                        onClick={() =>
                                            handleRefillRequest(item)
                                        }
                                        className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold shadow-lg hover:scale-[1.02] transition-all"
                                    >

                                        Request Refill

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

        </PatientLayout>

    );

};

export default RefillRequest;