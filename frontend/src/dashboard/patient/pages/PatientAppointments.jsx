import { useEffect, useState } from "react";
import axios from "axios";
import PatientLayout from "../layouts/PatientLayout";
import { useNavigate } from "react-router-dom";
const PatientAppointments = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const specializations = [
        "Cardiologist",
        "Neurologist",
        "Dermatologist",
        "General Physician",
    ];

    const doctors = {
        Cardiologist: ["Dr. Smith", "Dr. Wilson"],
        Neurologist: ["Dr. Kumar", "Dr. Raj"],
        Dermatologist: ["Dr. Priya", "Dr. Meena"],
        "General Physician": ["Dr. Sharma", "Dr. Reddy"],
    };

    const [appointments, setAppointments] = useState([]);

    const [formData, setFormData] = useState({
        specialization: "",
        doctor: "",
        date: "",
        time: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "specialization") {

            setFormData({
                ...formData,
                specialization: value,
                doctor: "",
            });

            return;
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };
    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {

            const { data } = await axios.get(
                "http://localhost:3000/appointments"
            );

            setAppointments(data);

        } catch (error) {

            console.log(error);

        }
    };
    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentTime(new Date());

        }, 1000);

        return () => clearInterval(interval);

    }, []);
    const handleBookAppointment = async (e) => {

        e.preventDefault();

        if (
            !formData.specialization ||
            !formData.doctor ||
            !formData.date ||
            !formData.time
        ) {
            alert("Please fill all fields");
            return;
        }

        const selectedDateTime = new Date(
            `${formData.date} ${formData.time}`
        );

        if (selectedDateTime < new Date()) {
            alert("Cannot book past appointment");
            return;
        }
        if (isNaN(selectedDateTime.getTime())) {
            alert("Invalid date or time");
            return;
        }
        if (formData.date.length !== 10) {
            alert("Invalid date format");
            return;
        }
        const newAppointment = {
            patient: "ARKIT",
            doctor: formData.doctor,
            date: formData.date,
            time: formData.time,
            status: "Pending",
        };

        try {

            const { data } = await axios.post(
                "http://localhost:3000/appointments",
                newAppointment
            );

            setAppointments([
                data,
                ...appointments,
            ]);

            setFormData({
                specialization: "",
                doctor: "",
                date: "",
                time: "",
            });

            alert("Appointment Booked Successfully");

        } catch (error) {

            console.log(error);

            alert("Booking Failed");

        }
    };
    const approvedCount = appointments.filter(
        (item) => item.status === "Approved"
    ).length;

    const pendingCount = appointments.filter(
        (item) => item.status === "Pending"
    ).length;

    const rejectedCount = appointments.filter(
        (item) => item.status === "Rejected"
    ).length;

    const canStartConsultation = (appointmentDate, appointmentTime) => {

        const appointmentDateTime = new Date(
            `${appointmentDate} ${appointmentTime}`
        );

        return currentTime >= appointmentDateTime;
    };
    return (

        <PatientLayout>

            <div className="mb-10">

                <h1 className="text-5xl font-black text-gray-900">
                    My Appointments
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Book, manage and track all doctor appointments.
                </p>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">

                <div className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white p-8 rounded-[30px] shadow-xl">

                    <h3 className="text-lg font-semibold">
                        Total Appointments
                    </h3>

                    <p className="text-5xl font-black mt-3">
                        {appointments.length}
                    </p>

                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-8 rounded-[30px] shadow-xl">

                    <h3 className="text-lg font-semibold">
                        Approved
                    </h3>

                    <p className="text-5xl font-black mt-3">
                        {approvedCount}
                    </p>

                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-8 rounded-[30px] shadow-xl">

                    <h3 className="text-lg font-semibold">
                        Pending
                    </h3>

                    <p className="text-5xl font-black mt-3">
                        {pendingCount}
                    </p>

                </div>

            </div>

            <div className="bg-white rounded-[35px] shadow-xl border border-gray-100 p-8 mb-10">

                <h2 className="text-3xl font-black text-gray-900 mb-6">
                    Book New Appointment
                </h2>

                <form
                    onSubmit={handleBookAppointment}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
                >

                    <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-2xl outline-none"
                    >
                        <option value="">
                            Select Specialization
                        </option>

                        {specializations.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-2xl outline-none"
                    >
                        <option value="">
                            Select Doctor
                        </option>

                        {(doctors[
                            formData.specialization
                        ] || []).map((doctor) => (
                            <option
                                key={doctor}
                                value={doctor}
                            >
                                {doctor}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="border border-gray-300 p-4 rounded-2xl outline-none"
                    />

                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-2xl outline-none"
                    />

                    <button
                        type="submit"
                        className="lg:col-span-4 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold hover:opacity-90"
                    >
                        Book Appointment
                    </button>

                </form>

            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {appointments.map((appointment) => (

                    <div
                        key={appointment.id}
                        className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition-all duration-300"
                    >

                        <div className="flex justify-between items-center">

                            <h2 className="text-2xl font-black text-gray-900">
                                {appointment.doctor}
                            </h2>

                            <span
                                className={`px-4 py-2 rounded-full text-sm font-bold ${appointment.status === "Approved"
                                    ? "bg-green-100 text-green-700"
                                    : appointment.status === "Rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {appointment.status}
                            </span>

                        </div>

                        <p className="text-gray-500 mt-2">
                            {appointment.specialization}
                        </p>

                        <div className="mt-8 space-y-4">

                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Date
                                </span>

                                <span className="font-bold">
                                    {appointment.date}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Time
                                </span>

                                <span className="font-bold">
                                    {appointment.time}
                                </span>

                            </div>

                        </div>
                        {appointment.consultationCompleted ? (

                            <div className="mt-6 text-center text-green-600 font-bold">
                                ✅ Consultation Completed
                            </div>

                        ) : appointment.status === "Approved" ? (

                            canStartConsultation(
                                appointment.date,
                                appointment.time
                            ) ? (

                                <button
                                    onClick={() =>
                                        navigate("/chat", {
                                            state: {
                                                appointmentId: appointment.id
                                            }
                                        })
                                    }
                                    className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold"
                                >
                                    Join Consultation
                                </button>

                            ) : (

                                <div className="mt-6 text-center text-orange-600 font-bold">
                                    Consultation starts at {appointment.time}
                                </div>

                            )

                        ) : null}

                    </div>

                ))}

            </div>

        </PatientLayout>

    );

};

export default PatientAppointments;