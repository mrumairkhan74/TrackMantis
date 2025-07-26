import React from 'react'
import HeroSection from '../components/HeroSection'
import CardSection from '../components/CardSection'
import RecentActivity from '../components/RecentActivity'
import FooterDetailed from '../components/FooterDetailed'

const Home = () => {
    return (
        <div className='w-full min-h-screen p-5 shadow-md bg-white'>
            <HeroSection />
            <CardSection />
            <RecentActivity />
        </div>
    )
}

export default Home