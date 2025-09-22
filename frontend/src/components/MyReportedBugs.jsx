import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './Context/AuthContext';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import 'aos/dist/aos.css';
import Aos from 'aos';

// BackendApi Url
const apiUrl = import.meta.env.VITE_BACKEND_API;

const MyReportedBugs = () => {
  Aos.init();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bugs, setBugs] = useState([]);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const userId = user?._id;

  const priorityColors = {
    Critical: 'border-red-600',
    High: 'border-orange-500',
    Medium: 'border-yellow-400',
    Low: 'border-green-500'
  };

  const fetchData = async () => {
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiUrl}/bug/user/${userId}`, {
        withCredentials: true
      });
      setBugs(res.data.bugs);
    } catch (error) {
      setError(error.response?.data?.message || 'Fetching Failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);


  // Delete Bug
  const handleDelete = async (bugId) => {
    try {
      const res = await axios.delete(`${apiUrl}/bug/${userId}/${bugId}`, { withCredentials: true })
      toast.success('Bug Deleted Successfully')
      setTimeout(() => {
        fetchData()
      }, 1000)
    } catch (error) {
      toast.error('Bug not Deleted')
    }
  }



  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full min-h-screen px-4 md:px-[150px] py-6">
      <h1 className="text-3xl md:text-5xl font-[Poppins] tracking-[2px] mb-6">My Reported Bugs</h1>

      {bugs.length === 0 ? (
        <p className="text-center text-gray-600">No Bugs Uploaded By You</p>
      ):(
        bugs.map((bug) => (
          <div key={bug._id} className="flex flex-col space-y-1 mb-6" data-aos="fade-left" data-aos-easing="linear"
          data-aos-duration="2000">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center shadow-md rounded-md p-4 ">
              <div className={`flex-1 border-l-4 ${priorityColors[bug.priority]} pl-4`}>
                <h2 className="text-xl font-bold tracking-wide mb-1">{bug.bugTitle}</h2>
                <p className="text-gray-600 text-sm mb-3">{bug.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">{bug.operatingSystem}</span>
                  <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">{bug.device}</span>
                  <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">{bug.browser}</span>

                </div>

              </div>
              <div className="flex justify-end items-end  gap-4 md:flex-row">
                <span
                  className={`px-3 py-1 rounded text-sm text-center w-fit
                  ${bug.priority === 'Critical'
                      ? 'bg-red-100 text-red-800'
                      : bug.priority === 'High'
                        ? 'bg-orange-200 text-orange-700'
                        : bug.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                >
                  {bug.priority}
                </span>
                <span
                  className={`px-3 py-1 rounded-md text-sm text-center w-fit
                  ${bug.status === 'open'
                      ? 'bg-green-200 text-green-700'
                      : bug.status === 'inProgress'
                        ? 'bg-yellow-200 text-yellow-700'
                        : 'bg-red-300 text-red-700'
                    }`}
                >
                  {bug.status}
                </span>
              </div>

            </div>

            <div className="flex gap-4 justify-end -mt-4">
              <button
              title='Delete Bug'
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md "
                onClick={() => handleDelete(bug._id)}// Placeholder
              >
                Delete
              </button>
              <Link
              title='Update Bug'
                to={`/bugdetail/${bug._id}`}
                className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md "
              // Placeholder
              >
                Update
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReportedBugs;
