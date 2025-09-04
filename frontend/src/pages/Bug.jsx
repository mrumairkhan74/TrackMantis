import React from 'react'
import {Link} from 'react-router-dom'
import BugDetails from '../components/BugDetails'
const Bug = () => {
  return (
    <div className='w-full mt-5'>
      <div className="flex items-center justify-between p-5 md:px-[150px]">
      <h1 className='text-xl font-bold tracking-wide md:text-3xl font-[Poppins]'> Reported Bugs</h1>
      <Link to={'/reportbug'} className="bg-gradient-to-r from-slate-600 to-slate-900 px-2 py-3 rounded-[3px] text-white md:p-5 font-bold text-[12px] md:text-xl relative text-white 
             after:content-[''] after:absolute after:left-0 after:bottom-0 md:after:top-[70px] after:top-[40px] 
             after:h-[5px] after:w-0 after:bg-slate-900 
             after:transition-all after:duration-500  hover:bg-none hover:text-slate-700 
             hover:after:w-full" title='report new Bug'>Report New bug</Link>
      </div>
      <BugDetails/>
    </div>
  )
}

export default Bug