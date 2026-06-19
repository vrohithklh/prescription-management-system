import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../../components/DoctorSidebar";
import Topbar from "../../../components/Topbar";

const Medicines = () => {

    const [medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchMedicines = async () => {

        try {

            const { data } = await axios.get(
                "http://localhost:3000/medicines"
            );

            setMedicines(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchMedicines();

    }, []);

    const handleDeleteMedicine = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/medicines/${id}`
            );

            fetchMedicines();

        }

        catch (error) {

            console.log(error);

        }

    };

    const availableMedicines =
        medicines.filter((item) => item.stock > 20).length;

    const lowStockMedicines =
        medicines.filter(
            (item) => item.stock > 0 && item.stock <= 20
        ).length;

    const outOfStockMedicines =
        medicines.filter(
            (item) => item.stock === 0
        ).length;

    return (

        <div className="flex bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10 overflow-y-auto">

                <Topbar />

                <div className="mt-10">

                    <h1 className="text-5xl font-bold text-gray-800">
                        Medicines Inventory
                    </h1>

                    <p className="text-gray-500 text-lg mt-3">
                        Track medicine stock and inventory availability.
                    </p>

                </div>

                <div className="grid md:grid-cols-4 gap-6 mt-8">

                    <div className="bg-blue-600 text-white p-6 rounded-3xl">
                        <h3>Total Medicines</h3>
                        <p className="text-5xl font-bold mt-3">
                            {medicines.length}
                        </p>
                    </div>

                    <div className="bg-green-600 text-white p-6 rounded-3xl">
                        <h3>Available</h3>
                        <p className="text-5xl font-bold mt-3">
                            {availableMedicines}
                        </p>
                    </div>

                    <div className="bg-orange-500 text-white p-6 rounded-3xl">
                        <h3>Low Stock</h3>
                        <p className="text-5xl font-bold mt-3">
                            {lowStockMedicines}
                        </p>
                    </div>

                    <div className="bg-red-600 text-white p-6 rounded-3xl">
                        <h3>Out Of Stock</h3>
                        <p className="text-5xl font-bold mt-3">
                            {outOfStockMedicines}
                        </p>
                    </div>

                </div>

                <div className="mt-8">

                    <input
                        type="text"
                        placeholder="Search Medicine ID or Name..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="border border-gray-300 px-5 py-3 rounded-2xl w-[350px]"
                    />

                </div>

                <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-xl p-8 overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-200">

                                <th className="text-left py-4">
                                    Medicine ID
                                </th>

                                <th className="text-left py-4">
                                    Medicine
                                </th>

                                <th className="text-left py-4">
                                    Category
                                </th>

                                <th className="text-left py-4">
                                    Price
                                </th>

                                <th className="text-left py-4">
                                    Stock
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
                                medicines
                                    .filter(
                                        (item, index) =>
                                            (`MED${String(index + 1).padStart(3, "0")}`)
                                                .toLowerCase()
                                                .includes(searchTerm.toLowerCase()) ||

                                            item.name
                                                ?.toLowerCase()
                                                .includes(searchTerm.toLowerCase())
                                    )
                                    .map((item, index) => {

                                        let status = "Available";

                                        if (item.stock === 0) {

                                            status = "Out Of Stock";

                                        }

                                        else if (item.stock <= 20) {

                                            status = "Low Stock";

                                        }

                                        return (

                                            <tr
                                                key={item.id}
                                                className="border-b border-gray-100"
                                            >

                                                <td className="py-5">
                                                    MED{String(index + 1).padStart(3, "0")}
                                                </td>

                                                <td className="py-5 font-semibold">
                                                    {item.name}
                                                </td>

                                                <td className="py-5">
                                                    {item.category}
                                                </td>

                                                <td className="py-5">
                                                    ₹{item.price}
                                                </td>

                                                <td className="py-5">
                                                    {item.stock}
                                                </td>

                                                <td className="py-5">

                                                    <span
                                                        className={`px-4 py-2 rounded-full text-sm
                                                        ${status === "Available"
                                                                ? "bg-green-100 text-green-700"
                                                                : status === "Low Stock"
                                                                    ? "bg-yellow-100 text-yellow-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {status}
                                                    </span>

                                                </td>

                                                <td className="py-5 flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            alert(
                                                                `Medicine : ${item.name}\nCategory : ${item.category}\nPrice : ₹${item.price}\nStock : ${item.stock}`
                                                            )
                                                        }
                                                        className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-xl"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDeleteMedicine(item.id)
                                                        }
                                                        className="bg-red-100 text-red-600 px-4 py-2 rounded-xl"
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        );

                                    })
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default Medicines;