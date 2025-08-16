import React, { useContext, useState } from 'react';
import { LuMessagesSquare } from "react-icons/lu";
import { FaLocationArrow } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const apiUrl = import.meta.env.VITE_BACKEND_API;

const Message = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const { user } = useContext(AuthContext);

    const sendMessage = async () => {
        if (!input) return;
        const newMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, newMsg]);

        try {
            const res = await axios.post(`${apiUrl}/chat`, { message: input, userId: user?._id });

            const botReply = res.data.data.aiMessage;
            setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
            setInput('');
        } catch (err) {
            console.error("Chat error:", err);
            setMessages((prev) => [...prev, { role: "bot", content: "Something went wrong. Try again." }]);
        }
    };

    return (
        <>
            {/* Floating Message Icon */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-slate-600 text-white z-50 rounded-full p-4 cursor-pointer shadow-lg hover:scale-105 transition"
            >
                <LuMessagesSquare className="text-4xl" />
            </div>

            {/* Chat Box */}
            {isOpen && (
                <div
                    className="fixed bottom-20 right-4 sm:right-6 w-[90%] sm:w-80 max-w-sm bg-white text-black rounded-lg shadow-lg border-2 border-slate-400 z-50 flex flex-col h-[70vh] sm:h-[420px] overflow-hidden"
                >
                    {/* Chat Header */}
                    <div className="bg-slate-500 text-white p-3 text-center font-semibold rounded-t-lg flex items-center gap-2 justify-center">
                        Live Chat <GoDotFill className="text-green-500 animate-ping text-2xl duration-3000" />
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {/* User Message */}
                                {msg.role === 'user' && (
                                    <>
                                        <div className="max-w-[70%] sm:max-w-xs p-2 my-1 rounded-lg text-sm bg-slate-500 text-white">
                                            {msg.content}
                                        </div>
                                        <img
                                            src={user?.image?.url || "/default-avatar.png"}
                                            alt="user"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </>
                                )}

                                {/* Bot Message */}
                                {msg.role === 'bot' && (
                                    <>
                                        <img
                                            src="/mantis.png" // replace with your website logo path
                                            alt="bot"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div className="max-w-[70%] sm:max-w-xs p-2 my-1 rounded-lg text-sm bg-gray-200 text-black">
                                            {msg.content}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="flex items-center gap-2 p-2 border-t">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 text-sm border rounded-full outline-none"
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button onClick={sendMessage}>
                            <FaLocationArrow className="text-xl text-slate-600 hover:text-blue-800" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Message;
