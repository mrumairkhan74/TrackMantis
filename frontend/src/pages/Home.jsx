import React from 'react'
import HeroSection from '../components/HeroSection'
import CardSection from '../components/CardSection'
import RecentActivity from '../components/RecentActivity'
import Message from '../components/message/Message'

const Home = () => {
    return (
        <div className='w-full min-h-screen p-5 shadow-md bg-white relative'>
            <HeroSection />
            <CardSection />
            <RecentActivity />
            <Message />
        </div>
    )
}

export default Home