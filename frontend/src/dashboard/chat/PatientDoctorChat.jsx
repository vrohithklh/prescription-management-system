import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const PatientDoctorChat = () => {

    const [message, setMessage] = useState("");
    const { state } = useLocation();
    const navigate = useNavigate();

    const appointmentId = state?.appointmentId;
    console.log(appointmentId);
    const [messages, setMessages] = useState([]);
    useEffect(() => {

        const loadMessages = () => {

            fetch(
                `http://localhost:3000/messages?appointmentId=${appointmentId}`
            )
                .then((res) => res.json())
                .then((data) => setMessages(data));

        };

        const checkConsultation = async () => {

            const { data } = await axios.get(
                `http://localhost:3000/appointments/${appointmentId}`
            );

            if (data.consultationCompleted) {

                navigate("/consultation-ended", {
                    state: {
                        appointmentId
                    }
                });

            }

        };

        loadMessages();

        const interval = setInterval(() => {

            loadMessages();
            checkConsultation();

        }, 1000);

        return () => clearInterval(interval);

    }, [appointmentId]);
    const handleSend = async () => {

        if (!message.trim()) return;

        const newMessage = {
            appointmentId,
            sender: "patient",
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

    return (

        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 p-8">

            {/* Header */}

            <div className="bg-white rounded-[30px] shadow-xl p-6 flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-black text-gray-800">
                        Dr. Smith
                    </h1>

                    <p className="text-green-500 font-semibold">
                        ● Online
                    </p>

                </div>

                <div className="text-right">

                    <p className="text-gray-500">
                        Appointment
                    </p>

                    <h3 className="font-bold">
                        15 Jun 2026
                    </h3>

                </div>

            </div>

            {/* Messages */}

            <div className="bg-white mt-8 rounded-[30px] shadow-xl p-6 h-[500px] overflow-y-auto">

                <div className="space-y-5">

                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={`flex ${msg.sender === "patient"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >

                            <div
                                className={`max-w-[400px] px-5 py-4 rounded-3xl ${msg.sender === "patient"
                                    ? "bg-blue-600 text-white"
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
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    className="flex-1 border p-4 rounded-2xl outline-none"
                />

                <button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white px-8 rounded-2xl font-bold"
                >
                    Send
                </button>

            </div>

        </div>

    );

};

export default PatientDoctorChat;