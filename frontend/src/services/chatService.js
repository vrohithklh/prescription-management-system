import axios from "axios";

const API_URL = "http://localhost:5000/chats";

export const getMessages = async (appointmentId) => {
    const response = await axios.get(
        `${API_URL}?appointmentId=${appointmentId}`
    );
    return response.data;
};

export const sendMessage = async (messageData) => {
    const response = await axios.post(API_URL, messageData);
    return response.data;
};

export const endConsultation = async (appointmentId) => {
    const messages = await getMessages(appointmentId);

    for (const msg of messages) {
        await axios.patch(`${API_URL}/${msg.id}`, {
            status: "completed",
        });
    }
};