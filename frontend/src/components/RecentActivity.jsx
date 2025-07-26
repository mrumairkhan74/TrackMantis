import React, { useEffect, useState, } from 'react'
import axios from 'axios'
import Loading from './Loading/Loading'
import { Link } from 'react-router'
const apiUrl = import.meta.env.VITE_BACKEND_API
const RecentActivity = () => {
    const [bugs, setBugs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchBugs = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await axios.get(`${apiUrl}/bug/`);
            setBugs(res.data.bugs)
        }
        catch (error) {
            return setError('Something went wrong while fetching bugs Detail')
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchBugs()
    }, [])

    const priorityColors = {
        Critical: 'border-red-600',
        High: 'border-orange-500',
        Medium: 'border-yellow-400',
        Low: 'border-green-500'
    };
    return (
        <div className='w-full rounded-md shadow-md bg-white mt-3 md:px-[250px]  p-5 block m-auto '>
            <h1 className='p-2 lg:px-[150px] lg:px-0 text-2xl font-bold tracking-wide m-5 font-[Poppins]'>RecentActivity</h1>
            {/* 1st */}
            {!loading && bugs.slice(0, 3).map(bug => (
                <Link to={`bugDetails/${bug._id}`} key={bug._id} className="flex items-center justify-between md:py-[12px] md:px-[150px] p-2 shadow-md my-3 ">
                    <div className={`border-l-8 ${bug.priority === "Critical" ? "border-red-700 " :
                        bug.priority === "High" ? "border-red-600 " :
                            bug.priority === "Medium" ? "border-yellow-400 " :
                                bug.priority === "Low" ? "border-slate-400 " :
                                    "bg-gray-100 text-gray-600"} p-5 `}>
                        <h2 className='md:text-xl text-[16px] font-[Poppins]'>New Bug reported by <span className='font-bold'> {bug.createdBy}</span></h2>
                        <p className='md:text-xl text-[10px] text-gray-500'>{bug.bugTitle} </p>
                        <div className="flex gap-2 m-2 p-2">
                            <p title='Priority'
                                className={`p-2 text-[10px] rounded-full cursor-pointer
                            ${bug.priority === "Critical" ? "bg-red-300 text-red-700 " :
                                        bug.priority === "High" ? "bg-red-200 text-red-600 " :
                                            bug.priority === "Medium" ? "bg-yellow-200 text-yellow-600 " :
                                                "bg-green-200 text-green-600 "
                                    }`
                                }>

                                {bug.priority}
                            </p>
                            <p className='p-2 text-[10px] rounded-full bg-slate-100 text-slate-400' title='device'>{bug.device}</p>
                            <p className='p-2 text-[10px] rounded-full bg-slate-100 text-slate-400' title='OperatingSystem'>{bug.operatingSystem}</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <div className={` ${bug.status === 'open'
                            ? 'bg-green-200 text-green-700'
                            : bug.status === 'inProgress'
                                ? 'bg-yellow-200 text-yellow-700'
                                : bug.status === 'close'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-red-200 text-red-700'
                            }  md:text-[16px] text-[10px] p-2 rounded-[20px]`}>{bug.status}</div>
                        <div className="bg-gray-100 text-gray-500 md:text-[16px] text-[8px] p-2 rounded-[20px]">{new Date(bug.createdAt).toDateString()}</div>
                    </div>
                </Link>
            ))}

        </div>
    )
}

export default RecentActivity