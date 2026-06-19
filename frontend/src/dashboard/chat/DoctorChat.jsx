import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
const DoctorChat = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");


    const { state } = useLocation();

    const appointmentId = state?.appointmentId;
    const [messages, setMessages] = useState([]);
    useEffect(() => {

        const loadMessages = () => {

            fetch(
                `http://localhost:3000/messages?appointmentId=${appointmentId}`
            )
                .then((res) => res.json())
                .then((data) => setMessages(data));

        };

        loadMessages();

        const interval = setInterval(loadMessages, 1000);

        return () => clearInterval(interval);

    }, [appointmentId]);
    const handleSend = async () => {

        if (!message.trim()) return;

        const newMessage = {
            appointmentId,
            sender: "doctor",
            message: message
        };

        await fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        });

        setMessages((prev) => [...prev, newMessage]);

        setMessage("");
    };
    const endConsultation = async () => {

        await axios.patch(
            `http://localhost:3000/appointments/${appointmentId}`,
            {
                consultationCompleted: true
            }
        );

        alert("Consultation Completed");

        navigate("/doctor/appointments");

    };
    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 p-8">

            {/* Header */}

            <div className="bg-white rounded-[30px] shadow-xl p-6 flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-black text-gray-800">
                        Patient Chat
                    </h1>

                    <p className="text-green-500 font-semibold">
                        ● Patient Online
                    </p>

                </div>

                <div className="text-right">

                    <p className="text-gray-500">
                        Appointment ID
                    </p>

                    <h3 className="font-bold">
                        APP-2026-001
                    </h3>

                </div>

            </div>

            {/* Appointment Info */}

            <div className="grid md:grid-cols-3 gap-6 mt-8">

                <div className="bg-white rounded-3xl p-6 shadow-lg">

                    <p className="text-gray-500">
                        Patient
                    </p>

                    <h3 className="text-2xl font-black text-gray-800 mt-2">
                        Rohith
                    </h3>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-lg">

                    <p className="text-gray-500">
                        Date
                    </p>

                    <h3 className="text-2xl font-black text-gray-800 mt-2">
                        15 Jun 2026
                    </h3>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-lg">

                    <p className="text-gray-500">
                        Time
                    </p>

                    <h3 className="text-2xl font-black text-gray-800 mt-2">
                        02:00 PM
                    </h3>

                </div>

            </div>

            {/* Chat Area */}

            <div className="bg-white mt-8 rounded-[30px] shadow-xl p-6 h-[500px] overflow-y-auto">

                <div className="space-y-5">

                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={`flex ${msg.sender === "doctor"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >

                            <div
                                className={`max-w-[400px] px-5 py-4 rounded-3xl ${msg.sender === "doctor"
                                    ? "bg-gradient-to-r from-cyan-500 to-blue-700 text-white"
                                    : "bg-gray-100 text-gray-800"
                                    }`}
                            >

                                {msg.message}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* Input */}

            <div className="bg-white mt-6 rounded-[30px] shadow-xl p-5 flex gap-4">

                <input
                    type="text"
                    placeholder="Type your reply..."
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    className="flex-1 border border-gray-300 p-4 rounded-2xl outline-none focus:border-cyan-500"
                />

                <div className="flex gap-3">

                    <div className="flex gap-3">

                        <button
                            onClick={handleSend}
                            className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white px-8 rounded-2xl font-bold"
                        >
                            Send
                        </button>

                        <button
                            onClick={() =>
                                navigate("/doctor/create-prescription", {
                                    state: {
                                        appointmentId,
                                    },
                                })
                            }
                            className="bg-green-600 text-white px-8 rounded-2xl font-bold"
                        >
                            Create Prescription
                        </button>

                        <button
                            onClick={endConsultation}
                            className="bg-red-600 text-white px-8 rounded-2xl font-bold"
                        >
                            End Consultation
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default DoctorChat;