import PatientLayout from "../layouts/PatientLayout";
import { useEffect, useState } from "react";
import axios from "axios";

const PatientNotifications = () => {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        fetchNotifications();

    }, []);

    const fetchNotifications = async () => {

        try {

            const { data } = await axios.get(
                "http://localhost:3000/notifications"
            );

            setNotifications(data);

        } catch (error) {

            console.log(error);

        }

    };

    const newCount = notifications.filter(
        (item) => item.status === "New"
    ).length;

    return (

        <PatientLayout>

            <div className="mb-10">

                <h1 className="text-5xl font-black text-gray-900">
                    Notifications
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Stay updated with appointments, prescriptions, chats and refill requests.
                </p>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">

                <div className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white p-8 rounded-[30px] shadow-xl">

                    <h3 className="text-lg font-semibold">
                        Total Notifications
                    </h3>

                    <p className="text-5xl font-black mt-3">
                        {notifications.length}
                    </p>

                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white p-8 rounded-[30px] shadow-xl">

                    <h3 className="text-lg font-semibold">
                        New Notifications
                    </h3>

                    <p className="text-5xl font-black mt-3">
                        {newCount}
                    </p>

                </div>

                <div className="bg-gradient-to-r from-purple-500 to-indigo-700 text-white p-8 rounded-[30px] shadow-xl">

                    <h3 className="text-lg font-semibold">
                        System Status
                    </h3>

                    <p className="text-2xl font-black mt-5">
                        Active
                    </p>

                </div>

            </div>

            <div className="space-y-6">

                {notifications.map((notification) => (

                    <div
                        key={notification.id}
                        className="relative overflow-hidden bg-white border border-gray-100 rounded-[32px] p-8 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                    >

                        <div
                            className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${notification.color}`}
                        ></div>

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                            <div className="flex items-start gap-5">

                                <div
                                    className={`w-16 h-16 rounded-3xl bg-gradient-to-r ${notification.color} flex items-center justify-center text-2xl shadow-lg`}
                                >
                                    {notification.icon}
                                </div>

                                <div>

                                    <h2 className="text-2xl font-black text-gray-900">
                                        {notification.title}
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        {notification.message}
                                    </p>

                                    <p className="text-sm text-gray-400 mt-3">
                                        {notification.time}
                                    </p>

                                </div>

                            </div>

                            <div>

                                <span
                                    className={`px-5 py-2 rounded-full font-bold text-sm ${notification.status === "New"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {notification.status}
                                </span>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </PatientLayout>

    );

};

export default PatientNotifications;