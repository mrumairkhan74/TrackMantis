import React, { useContext, useEffect, useRef, useState } from 'react';
import { LuMessagesSquare } from "react-icons/lu";
import { FaLocationArrow } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const Message = () => {
    const [isOpen, setIsOpen] = useState(false);


    // Scroll to bottom when new message arrives

    return (
        <>
            {/* Message Icon */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className='fixed bottom-6 right-6 bg-slate-600 text-white z-50 rounded-full p-4 cursor-pointer shadow-lg hover:scale-105 transition'
            >
                <LuMessagesSquare className='text-4xl' />
            </div>

            {/* Chat Box */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 bg-white text-black rounded-lg shadow-lg border-2 border-slate-400 z-50 flex flex-col h-[420px] overflow-hidden">

                    {/* Chat Header */}
                    <div className="bg-slate-500 text-white p-3 text-center font-semibold rounded-t-lg flex items-center gap-2 justify-center"> Live Chat <GoDotFill className='text-green-500 linear animate-ping text-2xl duration-3000' /></div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">

                        <div
                            className="max-w-[80%] p-2 rounded-lg bg-gray-200 self-start mr-auto"
                        >
                            <p className="text-[11px] font-semibold text-gray-600">
                                Umair Khan
                            </p>
                            <p className="text-sm mt-2">hello!</p>
                            <p className="text-[10px] text-right text-gray-400">
                                01/08/2025
                            </p>
                        </div>


                    </div>

                    {/* Input Area */}
                    <div className="flex items-center gap-2 p-2 border-t">
                        <input

                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 text-sm border rounded-full outline-none"
                            onKeyDown={(e) => e.key === 'Enter'}
                        />
                        <button>
                            <FaLocationArrow className="text-xl text-slate-600 hover:text-blue-800" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Message;
