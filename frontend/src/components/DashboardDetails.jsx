import React from 'react'
import Table from './table/Table'

const DashboardDetails = () => {
    return (
        <div className='w-full min-h-screen'>
            <h1 className='text-2xl md:text-4xl font-[Poppins] tracking-wide m-3 p-3'>
                Admin Dashboard
            </h1>
            <Table/>
        </div>
    )
}

export default DashboardDetails