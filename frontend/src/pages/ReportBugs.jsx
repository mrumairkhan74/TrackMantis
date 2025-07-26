import React from 'react';
import ReportBugForm from '../components/forms/ReportBugForm';
import { MdCloseFullscreen } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ReportBugs = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full min-h-screen p-5'>
            <div className="flex gap-2 md:items-center justify-between md:px-[250px] p-2">
                <h2 className='text-2xl md:text-5xl font-bold tracking-wide font-[Poppins]'>Report a New Bug</h2>
                <MdCloseFullscreen
                    onClick={() => navigate(-1)}
                    className='text-3xl md:text-3xl transition-all duration-1000 ease-in-out hover:scale-110 cursor-pointer hover:text-slate-700 rounded-md p-1'
                />
            </div>

            <ReportBugForm />
        </div>
    );
}

export default ReportBugs;
