import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading/Loading';

const apiUrl = import.meta.env.VITE_BACKEND_API;

const BugDetails = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔍 Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('allstatus');
  const [priorityFilter, setPriorityFilter] = useState('allpriority');
  const [sortOrder, setSortOrder] = useState('newest');

  const fetchBugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiUrl}/bug/`, { withCredentials: true });
      setBugs(res.data.bugs);
    } catch (error) {
      setError('Something went wrong while fetching bugs detail');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const priorityColors = {
    Critical: 'border-red-600',
    High: 'border-orange-500',
    Medium: 'border-yellow-400',
    Low: 'border-green-500'
  };

  // 🧠 Filtered and Sorted Bugs
  const filteredBugs = bugs
    .filter((bug) => {
      const matchesSearch =
        bug.bugTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'allstatus' || bug.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesPriority =
        priorityFilter === 'allpriority' || bug.priority.toLowerCase() === priorityFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOrder === 'priority') {
        const priorityRank = { Critical: 1, High: 2, Medium: 3, Low: 4 };
        return (priorityRank[a.priority] || 5) - (priorityRank[b.priority] || 5);
      }
      return 0;
    });

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gray-50 py-10 px-4">
      <div className="md:w-[60%] w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 font-[Poppins]">
          All Reported Bugs
        </h1>

        {/* 🔍 Filters Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 border-b border-gray-300 pb-4 mb-6">
          <input
            type="text"
            placeholder="Search bugs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:flex-1 p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto p-3 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="allstatus">All Status</option>
            <option value="open">Open</option>
            <option value="inProgress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full md:w-auto p-3 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="allpriority">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full md:w-auto p-3 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="newest">Sort By: Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {/* 🔁 Loading / Error / Empty States */}
        {loading && <Loading />}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && filteredBugs.length === 0 && (
          <p className="text-center text-gray-500">No bugs match your filters.</p>
        )}

        {/* 🐞 Bug Cards */}
        {!loading &&
          filteredBugs.map((bug) => (
            <div
              key={bug._id}
              className="flex justify-between items-start md:flex-row flex-col md:items-center  gap-4 border-b border-gray-200 py-5"
            >
              <Link
                to={`/bugDetails/${bug._id}`}
                className={`flex gap-3 w-full md:w-3/4 border-l-8 ${priorityColors[bug.priority]} p-4 rounded-md hover:bg-gray-100 transition-all`}
              >
                <div className="w-[80px] h-[60px] bg-gray-200 rounded-md overflow-hidden">
                  {bug.screenShots?.[0]?.url ? (
                    <img
                      src={bug.screenShots[0].url}
                      alt="Bug Screenshot"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-500 flex items-center justify-center h-full">
                      No Image
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-gray-800">{bug.bugTitle}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{bug.description}</p>
                  <ul className="flex flex-wrap gap-2 text-sm mt-2">
                    <li className="bg-gray-200 px-2 py-1 rounded">{bug.operatingSystem}</li>
                    <li
                      className={`px-2 py-1 rounded font-medium ${bug.severity === 'Blocker'
                          ? 'bg-red-300 text-red-900'
                          : bug.severity === 'Major'
                            ? 'bg-orange-300 text-orange-900'
                            : bug.severity === 'Minor'
                              ? 'bg-yellow-300 text-yellow-900'
                              : 'bg-blue-300 text-blue-900'
                        }`}
                    >
                      {bug.severity}
                    </li>
                    <li className="bg-gray-200 px-2 py-1 rounded">{bug.project}</li>
                  </ul>
                  <div className="flex gap-4 text-xs text-gray-500 mt-2">
                    <span>{new Date(bug.createdAt).toDateString()}</span>
                    <span className="font-semibold">{bug.createdBy}</span>
                  </div>
                </div>
              </Link>

              <div className="flex flex  gap-2 md:w-1/4">
                <span
                  title='priority'
                  className={`px-3 py-1 text-sm rounded text-center w-fit ${bug.priority === 'Critical'
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
                  title='status'
                  className={`px-3 py-1 text-sm rounded text-center w-fit ${bug.status === 'open'
                      ? 'bg-green-200 text-green-700'
                      : bug.status === 'inProgress'
                        ? 'bg-yellow-200 text-yellow-700'
                        : bug.status === 'close'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-red-200 text-red-700'
                    }`}
                >
                  {bug.status}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BugDetails;
