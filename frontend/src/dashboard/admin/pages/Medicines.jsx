import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../layouts/AdminLayout";

const Medicines = () => {

    const [medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingMedicine, setEditingMedicine] = useState(null);

    const [medicineForm, setMedicineForm] = useState({
        name: "",
        category: "",
        manufacturer: "",
        stock: "",
        price: "",
    });
    useEffect(() => {

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

        fetchMedicines();

    }, []);
    const deleteMedicineHandler = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/medicines/${id}`
            );

            setMedicines(
                medicines.filter(
                    (medicine) => medicine.id !== id
                )
            );

            alert("Medicine deleted successfully");

        } catch (error) {

            console.log(error);

            alert("Delete failed");

        }

    };

    const editMedicineHandler = async (medicine) => {

        const updatedMedicine = {
            ...medicine,
            stock: medicine.stock + 10
        };

        try {

            const { data } = await axios.put(
                `http://localhost:3000/medicines/${medicine.id}`,
                updatedMedicine
            );

            setMedicines(
                medicines.map((m) =>
                    m.id === medicine.id
                        ? data
                        : m
                )
            );

            alert("Medicine updated successfully");

        } catch (error) {

            console.log(error);

            alert("Update failed");

        }

    };
    const saveMedicineHandler = async () => {

        try {

            if (editingMedicine) {

                const { data } = await axios.put(
                    `http://localhost:3000/medicines/${editingMedicine.id}`,
                    medicineForm
                );

                setMedicines(
                    medicines.map((medicine) =>
                        medicine.id === editingMedicine.id
                            ? data
                            : medicine
                    )
                );

            } else {

                const { data } = await axios.post(
                    "http://localhost:3000/medicines",
                    medicineForm
                );

                setMedicines([...medicines, data]);

            }

            setShowForm(false);

        } catch (error) {

            console.log(error);

        }

    };
    return (

        <AdminLayout>

            <div className="flex items-center justify-between mb-12 flex-wrap gap-6">

                <div>

                    <h1 className="text-6xl font-black text-gray-900">

                        Medicines Management

                    </h1>

                    <p className="text-gray-500 mt-4 text-lg">

                        Monitor medicines, stock availability, and healthcare inventory.

                    </p>

                </div>

                <button
                    onClick={() => {

                        setEditingMedicine(null);

                        setMedicineForm({
                            name: "",
                            category: "",
                            manufacturer: "",
                            stock: "",
                            price: "",
                        });

                        setShowForm(true);

                    }}
                    className="px-8 py-4 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold"
                >

                    + Add Medicine

                </button>
            </div>

            <div className="mb-10">

                <input
                    type="text"
                    placeholder="Search by ID or Name..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="w-full lg:w-[420px] bg-white border border-cyan-100 rounded-3xl px-6 py-5 outline-none"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">

                <div className="bg-gradient-to-br from-cyan-500 to-blue-700 rounded-[32px] p-8 text-white">

                    <p>Total Medicines</p>

                    <h1 className="text-6xl font-black mt-5">

                        {medicines.length}

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-[32px] p-8 text-white">

                    <p>Available Stock</p>

                    <h1 className="text-6xl font-black mt-5">

                        {medicines.length}

                    </h1>

                </div>

                <div className="bg-gradient-to-br from-pink-500 to-rose-700 rounded-[32px] p-8 text-white">

                    <p>Low Stock</p>

                    <h1 className="text-6xl font-black mt-5">

                        0

                    </h1>

                </div>

            </div>

            <div className="bg-white rounded-[40px] shadow-2xl p-8">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-200 text-left">

                                <th className="pb-6">Medicine ID</th>
                                <th className="pb-6">Medicine Name</th>
                                <th className="pb-6">Category</th>
                                <th className="pb-6">Status</th>
                                <th className="pb-6">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {medicines
                                .filter((medicine) =>
                                    medicine.name
                                        ?.toLowerCase()
                                        .includes(searchTerm.toLowerCase()) ||

                                    `MED${String(medicine.id).padStart(3, "0")}`
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((medicine) => (

                                    <tr
                                        key={medicine.id}
                                        className="border-b border-gray-100"
                                    >

                                        <td className="py-6 text-cyan-600 font-bold">
                                            MED{String(medicine.id).padStart(3, "0")}

                                        </td>

                                        <td className="py-6 font-semibold text-gray-800">

                                            {medicine.medicineName || medicine.name}

                                        </td>

                                        <td className="py-6">

                                            {medicine.category || "General"}

                                        </td>

                                        <td className="py-6">

                                            <span
                                                className={
                                                    medicine.stock > 0
                                                        ? "px-4 py-2 rounded-full bg-green-100 text-green-600"
                                                        : "px-4 py-2 rounded-full bg-red-100 text-red-600"
                                                }
                                            >
                                                {medicine.stock > 0
                                                    ? "Available"
                                                    : "Unavailable"}

                                            </span>

                                        </td>

                                        <td className="py-6 flex gap-4">
                                            <button
                                                onClick={() => {

                                                    setEditingMedicine(medicine);

                                                    setMedicineForm({
                                                        name: medicine.name || "",
                                                        category: medicine.category || "",
                                                        manufacturer: medicine.manufacturer || "",
                                                        stock: medicine.stock || "",
                                                        price: medicine.price || "",
                                                    });

                                                    setShowForm(true);

                                                }}
                                                className="px-5 py-2 rounded-2xl bg-blue-100 text-blue-700 font-bold"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteMedicineHandler(medicine.id)}
                                                className="px-5 py-2 rounded-2xl bg-red-100 text-red-600 font-bold"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                </div>

            </div>
            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white p-8 rounded-3xl w-[500px]">

                        <h2 className="text-3xl font-bold mb-6">

                            {editingMedicine
                                ? "Edit Medicine"
                                : "Add Medicine"}

                        </h2>

                        <input
                            type="text"
                            placeholder="Medicine Name"
                            value={medicineForm.name}
                            onChange={(e) =>
                                setMedicineForm({
                                    ...medicineForm,
                                    name: e.target.value,
                                })
                            }
                            className="w-full border p-3 rounded-xl mb-4"
                        />

                        <input
                            type="text"
                            placeholder="Category"
                            value={medicineForm.category}
                            onChange={(e) =>
                                setMedicineForm({
                                    ...medicineForm,
                                    category: e.target.value,
                                })
                            }
                            className="w-full border p-3 rounded-xl mb-4"
                        />

                        <input
                            type="number"
                            placeholder="Stock"
                            value={medicineForm.stock}
                            onChange={(e) =>
                                setMedicineForm({
                                    ...medicineForm,
                                    stock: e.target.value,
                                })
                            }
                            className="w-full border p-3 rounded-xl mb-4"
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={medicineForm.price}
                            onChange={(e) =>
                                setMedicineForm({
                                    ...medicineForm,
                                    price: e.target.value,
                                })
                            }
                            className="w-full border p-3 rounded-xl mb-4"
                        />

                        <input
                            type="text"
                            placeholder="Manufacturer"
                            value={medicineForm.manufacturer}
                            onChange={(e) =>
                                setMedicineForm({
                                    ...medicineForm,
                                    manufacturer: e.target.value,
                                })
                            }
                            className="w-full border p-3 rounded-xl mb-4"
                        />

                        <div className="flex gap-4">

                            <button
                                onClick={saveMedicineHandler}
                                className="bg-green-600 text-white px-6 py-3 rounded-xl"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setShowForm(false)}
                                className="bg-gray-400 text-white px-6 py-3 rounded-xl"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </AdminLayout >

    );

};

export default Medicines;