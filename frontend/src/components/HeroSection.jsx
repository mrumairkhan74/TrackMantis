import React from 'react'
import { Link } from 'react-router-dom'
import 'aos/dist/aos.css';
import Aos from 'aos';
const HeroSection = () => {
    Aos.init();
    return (
        <div className='w-full flex flex-col items-center justify-center mt-3 h-[500px] gap-5 ' data-aos="fade-down" data-aos-easing="linear"
            data-aos-duration="2000">
            <h1 className="text-center text-gray-700 md:text-3xl font-[Poppins] lg:text-4xl text-3xl font-bold tracking-wide font-['Fira_Code',monospace] text-center" data-aos="fade-down" data-aos-easing="linear"
                data-aos-duration="2000" >Track,Manage, and Resolve Bugs Efficiently</h1>
            <p className='p-3 text-[18px] md:text-xl lg:text-2xl font-[Poppins]  text-gray-500 text-center' data-aos="fade-left" data-aos-easing="linear"
                data-aos-duration="2000">Bug Track helps Development Teams Collaborate effectively to identify, prioritize and fix Software issues . </p>
            <div className="flex items-center justify-center md:gap-4 gap-2">
             
                <Link to={'/reportbug'} className="bg-slate-700 text-white border-2 border-slate-700 hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-900 hover:text-white p-3 rounded-md md:text-[16px] text-[12px] font-bold tracking-wide" title="view Bug" data-aos="fade-left" data-aos-easing="linear"
                data-aos-duration="2000" >Report Bug</Link>
                <Link to={'/bug'} className="text-slate-700 border-2 hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-900 hover:text-white p-3 rounded-md md:text-[16px] text-[12px] font-bold tracking-wide" title="view Bug" data-aos="fade-left" data-aos-easing="linear"
                data-aos-duration="2000" >View Bugs</Link>
            </div>
        </div>
    )
}

export default HeroSection