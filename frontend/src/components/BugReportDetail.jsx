import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import CommentForm from './forms/CommentForm';
import Loading from './Loading/Loading';

// BackendApiUrl
const apiUrl = import.meta.env.VITE_BACKEND_API
import 'aos/dist/aos.css';
import Aos from 'aos';
const BugReportDetail = () => {
    Aos.init()
    const { id } = useParams();
    const [bug, setBugs] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const fetchBugsData = async () => {
        setLoading(true),
            setError(null)
        try {
            const res = await axios.get(`${apiUrl}/bug/${id}`, { withCredentials: true })
            setBugs(res.data.bug)
        }
        catch (error) {
            setError("Failed To Load Bugs Details")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBugsData()
    }, [])

    return (
        <>
            {loading && <Loading />}

            {error && <p className='text-center flex items-center justify-center text-red-500 text-2xl'>{error}</p>}
            <div className="w-full min-h-screen p-6 md:px-28" data-aos="flip-left" data-aos-easing="linear"
                data-aos-duration="2000">

                {/* BUG TITLE & ACTIONS */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center justify-center gap-3">
                        <FaArrowLeftLong
                            onClick={() => navigate(-1)}
                            className='text-3xl md:text-3xl transition-all duration-1000 ease-in-out hover:scale-110 cursor-pointer hover:text-slate-700 rounded-md p-1'
                        />
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                            {bug.bugTitle}
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <p className={` ${bug.status === "open" ? "bg-green-700 text-white " :
                            bug.status === "inProgress" ? "bg-green-200 text-green-600 " :
                                "bg-red-100 text-red-600"}  md:text-[16px] text-[10px] px-2 py-1 rounded-md`}>{bug.status}</p>
                    </div>
                </div>

                {/* TAGS & REPORTED INFO */}
                <div className="flex items-center gap-3 mb-4">
                    {/* Priority */}
                    <span className={`px-2 py-1 rounded text-sm
                            ${bug.priority === "Critical" ? "bg-red-100 text-red-800" :
                            bug.priority === "High" ? "bg-red-200 text-red-700" :
                                bug.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                                    bug.priority === "Low" ? "bg-slate-100 text-slate-700" :
                                        "bg-gray-100 text-gray-600"}
                            `}>
                        {bug.priority}
                    </span>
                    {/* Severity */}
                    <span className={`px-2 py-1 rounded text-sm font-semibold
                                ${bug.severity === "Blocker" ? "bg-red-300 text-red-900" :
                            bug.severity === "Major" ? "bg-orange-300 text-orange-900" :
                                bug.severity === "Minor" ? "bg-yellow-300 text-yellow-900" :
                                    bug.severity === "Cosmetic" ? "bg-blue-300 text-blue-900" :
                                        "bg-gray-300 text-gray-800"}`
                    }>
                        {bug.severity}
                    </span>

                    <span className="text-gray-500 text-sm">Reported by {bug.createdBy?.userName}. on {new Date(bug.createdAt).toDateString()}</span>
                </div>

                {/* DESCRIPTION SECTION */}
                <div className="bg-white shadow-md p-5 rounded mb-6">
                    <h2 className="font-semibold text-lg mb-2">
                        {bug.description}
                    </h2>
                    <p className="mb-4 font-none">{bug.additionalInfo}</p>

                </div>

                {/* SCREENSHOTS */}
                {bug.screenShots && bug.screenShots.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {bug.screenShots.map((img, i) => (
                            <img loading="lazy" key={i} src={img.url} alt={`Screenshot ${i + 1}`} className="rounded shadow" />
                        ))}
                    </div>
                )}

                {/* ENVIRONMENT */}
                <div className="bg-white shadow-md  p-5 rounded mb-6">
                    <h2 className="font-semibold text-lg mb-3">Environment</h2>
                    <ul className="text-gray-700 flex gap-2 flex-col md:flex-row items-center">
                        <li className='flex flex-col md:flex-row items-center gap-3'>
                            <strong>Document Files:</strong>
                            {bug.documentFiles?.length > 0 ? (
                                <ul className="space-y-2 mt-2 bg-gray-200 rounded-full px-4 py-2">
                                    {bug.documentFiles.map((doc, index) => (
                                        <li key={index}>
                                            <a
                                                href={`${doc.url}?fl_attachment=${doc.fileName}`}
                                                download={doc.fileName}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                {doc.fileName}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="bg-gray-200 rounded-full px-4 py-2">No documents</span>
                            )}
                        </li>
                        <li className='flex flex-col md:flex-row items-center gap-3'><strong>Platform:</strong> <span className='bg-gray-200 rounded-full px-4 py-2'>{bug.operatingSystem} </span></li>
                        <li className='flex flex-col md:flex-row items-center gap-3'><strong>Browser:</strong> <span className='bg-gray-200 rounded-full px-4 py-2'>{bug.browser} </span></li>
                        <li className='flex flex-col md:flex-row items-center gap-3'><strong>Device:</strong> <span className='bg-gray-200 rounded-full px-4 py-2'>{bug.device} </span></li>
                    </ul>
                </div>

                {/* COMMENTS */}
                <div className="bg-white shadow-md p-5 rounded mb-6">
                    <h2 className="font-semibold text-lg mb-4">Comments</h2>

                    <CommentForm />

                </div>

                {/* RELATED BUGS & SOLUTION */}
                <div className="bg-white shadow-md p-5 rounded mb-6">
                    <h2 className="font-semibold text-lg mb-3">Related Bugs</h2>
                    <ul className="text-blue-600 underline text-sm space-y-2">
                        <li>#1234 - Login form validation issues on Android</li>
                        <li>#987 - Session timeout handling for mobile</li>
                    </ul>
                </div>

                {/* MARK AS RESOLVED */}
                <button className="bg-slate-600 text-white px-6 py-3 rounded font-semibold hover:bg-slate-700 transition">
                    Mark as Resolved
                </button>
            </div >


        </>
    );
};

export default BugReportDetail;
