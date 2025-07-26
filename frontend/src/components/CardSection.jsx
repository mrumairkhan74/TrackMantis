import React from 'react'
import { MdDisplaySettings } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { LuMessageSquareMore } from "react-icons/lu";
import 'aos/dist/aos.css';
import Aos from 'aos';
const CardSection = () => {
    Aos.init();
    return (
        <div className='w-full  md:h-[400px] mt-3  flex flex-col md:flex-row items-center justify-center gap-4' data-aos="zoom-in" data-aos-easing="linear"
        data-aos-duration="2000">
            <div className="flex flex-col bg-white md:w-[200px] md:h-[300px] m-5 rounded-md shadow-md shadow-gray-500  items-center md:hover:scale-100 md:scale-90 transition-all duration-1000 ease-in-out cursor-pointer" title='intutive Dashboard' data-aos="flip-left" data-aos-easing="linear"
                data-aos-duration="2000">
                <MdDisplaySettings className='w-[100px] h-[100px] m-5 text-slate-700 p-4' />
                <h1 className="text-xl text-center font-bold pl-5 tracking-wide p-2 font-[Poppins]">Intutive Dashboard</h1>
                <p className='text-start p-5 text-gray-500 text-[16px]'>Easy-to-use interface that gives you a complete visibility into reported issues with powerful filtering and sorting option    </p>
            </div>
            <div className="flex flex-col bg-white md:w-[200px] md:h-[300px]  m-5 rounded-md shadow-md shadow-gray-500 items-center md:scale-110 md:hover:scale-120 transition-all duration-1000 ease-in-out cursor-pointer" title='Comprehensive Tracking' data-aos="flip-left" data-aos-easing="linear"
                data-aos-duration="2000">
                <GoShieldCheck className='w-[100px] h-[100px] m-5 text-slate-700 p-4' />
                <h1 className="text-xl text-center font-bold  tracking-wide p-2 font-[Poppins]">Comprehensive Tracking</h1>
                <p className='text-start p-5 text-gray-500 text-[16px]'>Track every aspect of your bugs with details metadata including priority, status, screenshots, and reproduction steps.     </p>
            </div>
            <div className="flex flex-col bg-white md:w-[200px] md:h-[400px]  m-5 rounded-md shadow-md shadow-gray-500  items-center md:scale-90 md:hover:scale-100 transition-all duration-1000 ease-in-out cursor-pointer" title='Colloaboration Features' data-aos="flip-left" data-aos-easing="linear"
                data-aos-duration="2000">
                <LuMessageSquareMore className='w-[100px] h-[100px] m-5 text-slate-700 p-4' />
                <h1 className="text-xl text-center font-bold  tracking-wide p-2 font-[Poppins]">Collaboration Features</h1>
                <p className='text-start p-5 text-gray-500 text-[16px]'> Comment on bugs attach solution files and collaborate with your team to resolve issues faster.</p>
            </div>
        </div>
    )
}

export default CardSection