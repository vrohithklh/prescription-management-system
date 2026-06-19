import React, { useEffect, useState } from "react";

function ConsultationChat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/messages")
            .then((res) => res.json())
            .then((data) => setMessages(data));
    }, []);

    return (
        <div>
            <h2>Consultation Chat</h2>

            {messages.map((msg) => (
                <div key={msg.id}>
                    <strong>{msg.sender}</strong> : {msg.message}
                </div>
            ))}
        </div>
    );
}

export default ConsultationChat;