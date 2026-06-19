import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreatePrescription = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const appointmentId = state?.appointmentId;
const [formData, setFormData] = useState({
    patient: "",
    notes: "",
});

const [medicines, setMedicines] = useState([
    {
        medicineName: "",
        dosage: "",
        duration: "",
    },
]);
const [medicineOptions, setMedicineOptions] = useState([]);
useEffect(() => {

    const fetchMedicines = async () => {

        try {

            const { data } = await axios.get(
                "http://localhost:3000/medicines"
            );

            setMedicineOptions(data);

        } catch (error) {

            console.log(error);

        }

    };

    fetchMedicines();

}, []);
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };
const handleMedicineChange = (index, e) => {

    const updatedMedicines = [...medicines];

    updatedMedicines[index][e.target.name] =
        e.target.value;

    setMedicines(updatedMedicines);

};

const addMedicineSlot = () => {

    setMedicines([
        ...medicines,
        {
            medicineName: "",
            dosage: "",
            duration: "",
        },
    ]);

};
    const handleSave = async (e) => {

        e.preventDefault();

const newPrescription = {
    id: Date.now(),
    appointmentId,
    patient: formData.patient,
    medicines: medicines,
    notes: formData.notes,
    doctor: "Dr. Smith",
    date: new Date().toLocaleDateString(),
    status: "Issued",
};

        try {

            await axios.post(
                "http://localhost:3000/prescriptions",
                newPrescription
            );
await axios.post(
    "http://localhost:3000/notifications",
    {
        id: Date.now() + 1,
        title: "Prescription Issued",
        message: "A new prescription has been issued.",
        time: "Just Now",
        status: "New",
        icon: "💊",
        color: "from-blue-500 to-cyan-700"
    }
);
            alert("Prescription Created Successfully");

setFormData({
    patient: "",
    notes: "",
});

setMedicines([
    {
        medicineName: "",
        dosage: "",
        duration: "",
    },
]);
        } catch (error) {

            console.log(error);

            alert("Failed to Create Prescription");

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

                <h1 className="text-4xl font-black text-gray-800 mb-8">
                    Create Prescription
                </h1>

                <form
                    onSubmit={handleSave}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="patient"
                        placeholder="Patient Name"
                        value={formData.patient}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl"
                        required
                    />

{
    medicines.map((item, index) => (

        <div
            key={index}
            className="border p-4 rounded-xl space-y-3"
        >

            <h3 className="font-bold">
                Medicine {index + 1}
            </h3>

           <select
    name="medicineName"
    value={item.medicineName}
    onChange={(e) =>
        handleMedicineChange(index, e)
    }
    className="w-full border p-3 rounded-xl"
>

    <option value="">
        Select Medicine
    </option>

    {medicineOptions.map((medicine) => (

        <option
            key={medicine.id}
            value={medicine.name}
        >
            {medicine.name}
        </option>

    ))}

</select>

            <input
                type="text"
                name="dosage"
                placeholder="Dosage"
                value={item.dosage}
                onChange={(e) =>
                    handleMedicineChange(index, e)
                }
                className="w-full border p-3 rounded-xl"
            />

            <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={item.duration}
                onChange={(e) =>
                    handleMedicineChange(index, e)
                }
                className="w-full border p-3 rounded-xl"
            />

        </div>

    ))
}

                    <textarea
                        name="notes"
                        placeholder="Doctor Notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl h-32"
                    />
<button
    type="button"
    onClick={addMedicineSlot}
    className="w-full bg-green-600 text-white py-3 rounded-xl font-bold"
>
    + Add Medicine
</button>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-4 rounded-xl font-bold"
                    >
                        Save Prescription
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-full mt-3 bg-gray-600 text-white py-4 rounded-xl font-bold"
                    >
                        Back To Chat
                    </button>
                </form>

            </div>

        </div>

    );

};

export default CreatePrescription;