import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading/Loading';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

const apiUrl = import.meta.env.VITE_BACKEND_API;

const RecentActivity = () => {
  Aos.init();
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiUrl}/bug/`);
      setBugs(res.data.bugs);
    } catch (error) {
      setError('Something went wrong while fetching bug details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div className='w-full bg-white rounded-md shadow-md p-4 md:px-20 mt-4 overflow-hidden'>
      <h1 className='text-xl sm:text-2xl font-bold tracking-wide mb-6 font-[Poppins] text-center md:text-left'>Recent Activity</h1>

      {!loading && bugs && bugs.slice(0, 3).map(bug => (
        <Link
          to={`bugDetails/${bug._id}`}
          key={bug._id}
          className='flex flex-col md:flex-row justify-between gap-4 items-start md:items-center border-l-8 shadow-sm p-4 my-4 bg-white overflow-hidden'
          data-aos='fade-up'
          data-aos-easing='linear'
          data-aos-duration='2000'
          style={{
            borderLeftColor:
              bug.priority === 'Critical' ? '#dc2626' :
              bug.priority === 'High' ? '#f97316' :
              bug.priority === 'Medium' ? '#facc15' :
              bug.priority === 'Low' ? '#10b981' : '#e5e7eb'
          }}
        >
          <div className='flex-1'>
            <h2 className='text-sm sm:text-base md:text-lg font-semibold font-[Poppins]'>
              New Bug reported by <span className='font-bold'>{bug.createdBy}</span>
            </h2>
            <p className='text-xs sm:text-sm text-gray-500 mt-1'>{bug.bugTitle}</p>
            <div className='flex flex-wrap gap-2 mt-3'>
              <p className={`px-3 py-1 text-xs rounded-full 
                ${bug.priority === 'Critical' ? 'bg-red-200 text-red-700' :
                  bug.priority === 'High' ? 'bg-orange-200 text-orange-700' :
                    bug.priority === 'Medium' ? 'bg-yellow-200 text-yellow-700' :
                      'bg-green-200 text-green-700'
                }`}
              >
                {bug.priority}
              </p>
              <p className='px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600'>{bug.device}</p>
              <p className='px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600'>{bug.operatingSystem}</p>
            </div>
          </div>

          <div className='flex flex-row md:flex-col gap-2 md:items-end items-start mt-4 md:mt-0'>
            <div className={`px-3 py-1 text-xs md:text-sm rounded-full font-semibold 
              ${bug.status === 'open' ? 'bg-green-200 text-green-700' :
                bug.status === 'inProgress' ? 'bg-yellow-200 text-yellow-700' :
                  bug.status === 'close' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-200 text-red-700'
              }`}
            >
              {bug.status}
            </div>
            <div className='px-3 py-1 text-xs md:text-sm rounded-full bg-gray-100 text-gray-600'>
              {new Date(bug.createdAt).toDateString()}
            </div>
          </div>
        </Link>
      ))}

      {loading && <Loading />}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default RecentActivity;
