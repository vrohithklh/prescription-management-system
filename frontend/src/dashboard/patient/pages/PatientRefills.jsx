import { useEffect, useState } from "react";
import axios from "axios";
import PatientLayout from "../layouts/PatientLayout";

const PatientRefills = () => {

    const [refills, setRefills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchRefills();

    }, []);

    const fetchRefills = async () => {

        try {

            const { data } = await axios.get(
                "http://localhost:3000/refills"
            );

            setRefills(data || []);

        }

        catch (error) {

            console.log("Refill Fetch Error:", error);

        }

        finally {

            setLoading(false);

        }

    };

    const filteredRefills = refills.filter((item) =>
        item.medicine
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    const pendingCount = refills.filter(
        (item) => item.status === "Pending"
    ).length;

    const approvedCount = refills.filter(
        (item) => item.status === "Approved"
    ).length;

    const rejectedCount = refills.filter(
        (item) => item.status === "Rejected"
    ).length;

    return (

        <PatientLayout>

            {/* Header */}

            <div className="mb-10">

                <h1 className="text-5xl font-black text-gray-900">
                    Refill Tracking
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Monitor all refill requests and approval progress.
                </p>

            </div>

            {/* Stats Cards */}

            <div className="grid md:grid-cols-3 gap-8 mb-10">

                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-[30px] p-8 shadow-xl">

                    <p className="text-yellow-100">
                        Pending Requests
                    </p>

                    <h2 className="text-5xl font-black mt-3">
                        {pendingCount}
                    </h2>

                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-[30px] p-8 shadow-xl">

                    <p className="text-green-100">
                        Approved Refills
                    </p>

                    <h2 className="text-5xl font-black mt-3">
                        {approvedCount}
                    </h2>

                </div>

                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-[30px] p-8 shadow-xl">

                    <p className="text-red-100">
                        Rejected Requests
                    </p>

                    <h2 className="text-5xl font-black mt-3">
                        {rejectedCount}
                    </h2>

                </div>

            </div>

            {/* Search */}

            <div className="mb-8">

                <input
                    type="text"
                    placeholder="Search medicine..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full lg:w-[400px] p-4 border border-gray-200 rounded-2xl shadow-sm outline-none"
                />

            </div>

            {/* Loading */}

            {loading && (

                <div className="bg-white rounded-[30px] shadow-lg p-10 text-center">

                    <h2 className="text-2xl font-bold text-blue-600">
                        Loading Refill Requests...
                    </h2>

                </div>

            )}

            {/* Empty State */}

            {!loading &&
                filteredRefills.length === 0 && (

                    <div className="bg-white rounded-[30px] shadow-lg p-12 text-center">

                        <h2 className="text-3xl font-bold text-gray-700">
                            No Refill Requests Found
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Your refill requests will appear here.
                        </p>

                    </div>

                )}

            {/* Table */}

            {!loading &&
                filteredRefills.length > 0 && (

                    <div className="bg-white rounded-[35px] shadow-xl border border-gray-100 overflow-hidden">

                        <div className="p-8 border-b">

                            <h2 className="text-2xl font-black text-gray-900">
                                Refill History
                            </h2>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="bg-gray-50 text-left">

                                        <th className="p-5">
                                            Request ID
                                        </th>

                                        <th className="p-5">
                                            Medicine
                                        </th>

                                        <th className="p-5">
                                            Requested Date
                                        </th>

                                        <th className="p-5">
                                            Status
                                        </th>

                                        <th className="p-5">
                                            Tracking
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredRefills.map((item) => (

                                        <tr
                                            key={item.id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >

                                            <td className="p-5 font-bold">
                                                REF-{item.id}
                                            </td>

                                            <td className="p-5">
                                                {item.medicine}
                                            </td>

                                            <td className="p-5">
                                                {item.requestDate}
                                            </td>

                                            <td className="p-5">

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-bold ${item.status === "Approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >

                                                    {item.status}

                                                </span>

                                            </td>

                                            <td className="p-5">

                                                {item.status === "Approved" && (
                                                    <span className="text-green-600 font-semibold">
                                                        ✓ Approved by Doctor
                                                    </span>
                                                )}

                                                {item.status === "Pending" && (
                                                    <span className="text-yellow-600 font-semibold">
                                                        ⏳ Under Review
                                                    </span>
                                                )}

                                                {item.status === "Rejected" && (
                                                    <span className="text-red-600 font-semibold">
                                                        ✕ Request Rejected
                                                    </span>
                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

        </PatientLayout>

    );

};

export default PatientRefills;