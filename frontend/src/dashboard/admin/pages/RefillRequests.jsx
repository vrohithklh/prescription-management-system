import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../layouts/AdminLayout";

const RefillRequests = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [requests, setRequests] = useState([]);

    useEffect(() => {

        const fetchRefills = async () => {

            try {

                const { data } = await axios.get(
                    "http://localhost:3000/refills"
                );

                setRequests(data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchRefills();

    }, []);
    const updateStatusHandler = async (id, status) => {

        try {

            const { data } = await axios.patch(
                `http://localhost:3000/refills/${id}`,
                { status }
            );

            setRequests(
                requests.map((request) =>
                    request.id === id
                        ? data
                        : request
                )
            );

        } catch (error) {

            console.log(error);

        }

    };
    return (

        <AdminLayout>

            <div className="flex items-center justify-between mb-12 flex-wrap gap-6">

                <div>

                    <h1 className="text-6xl font-black text-gray-900">

                        Refill Requests

                    </h1>

                    <p className="text-gray-500 mt-4 text-lg">

                        Monitor patient medicine refill requests and approvals.

                    </p>

                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">

                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-[32px] p-8 text-white">

                    <p>Pending Requests</p>

                    <h1 className="text-6xl font-black mt-5">

                        {
                            requests.filter(
                                (item) => item.status === "Pending"
                            ).length
                        }

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-[32px] p-8 text-white">

                    <p>Approved</p>

                    <h1 className="text-6xl font-black mt-5">

                        {
                            requests.filter(
                                (item) => item.status === "Approved"
                            ).length
                        }

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-pink-500 to-rose-700 rounded-[32px] p-8 text-white">

                    <p>Rejected</p>

                    <h1 className="text-6xl font-black mt-5">

                        {
                            requests.filter(
                                (item) => item.status === "Rejected"
                            ).length
                        }

                    </h1>

                </div>

            </div>
            <input
                type="text"
                placeholder="Search by Refill ID or Patient..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
                className="w-full lg:w-[420px] bg-white border border-cyan-100 rounded-3xl px-6 py-5 outline-none shadow-lg mb-8"
            />
            <div className="relative overflow-hidden bg-white border border-cyan-100 rounded-[40px] shadow-2xl p-8">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-200 text-left">

                                <th className="pb-6">Request ID</th>
                                <th className="pb-6">Patient</th>
                                <th className="pb-6">Medicine</th>
                                <th className="pb-6">Status</th>
                                <th className="pb-6">Actions</th>
                                <th className="pb-6">Request Date</th>
                            </tr>

                        </thead>

                        <tbody>

                            {requests
                                .filter((request) =>
                                    (request.patient?.name || request.patient || "")
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase()) ||

                                    `REF${String(request.id).padStart(3, "0")}`
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((request) => (

                                    <tr
                                        key={request.id}
                                        className="border-b border-gray-100 hover:bg-cyan-50"
                                    >

                                        <td className="py-6 font-bold text-cyan-600">
                                            REF{String(request.id).padStart(3, "0")}
                                        </td>

                                        <td className="py-6">

                                            {request.patient?.name || request.patient}

                                        </td>

                                        <td className="py-6">

                                            {request.medicine}

                                        </td>

                                        <td className="py-6">

                                            <span
                                                className={`px-4 py-2 rounded-full text-sm font-bold ${request.status === "Approved"
                                                    ? "bg-green-100 text-green-600"
                                                    : request.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-red-100 text-red-600"
                                                    }`}
                                            >

                                                {request.status}

                                            </span>

                                        </td>
                                        <td className="py-6">
                                            {request.requestDate}
                                        </td>
                                        <td className="py-6 flex gap-3">

                                            <button
                                                onClick={() =>
                                                    updateStatusHandler(
                                                        request.id,
                                                        "Approved"
                                                    )
                                                }
                                                className="px-4 py-2 rounded-full bg-green-100 text-green-600 font-bold"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatusHandler(
                                                        request.id,
                                                        "Rejected"
                                                    )
                                                }
                                                className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-bold"
                                            >
                                                Reject
                                            </button>

                                        </td>


                                    </tr>

                                ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout >

    );

};

export default RefillRequests;