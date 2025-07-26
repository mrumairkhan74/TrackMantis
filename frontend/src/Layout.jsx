import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router'

const Layout = () => {
    return (
        <div className='w-full relative h-min-screen bg-gray-100'>
            <div className="w-full">
                <Navbar />
            </div>
            <main className='w-full min-h-screen'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout