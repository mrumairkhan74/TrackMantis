import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {  useParams } from 'react-router';
import { ToastContainer,toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_BACKEND_API;

const Table = () => {
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams()
    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/user/`, { withCredentials: true });
            setUsers(res.data.users);
        } catch (err) {
            setError('Something went wrong while fetching users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`${apiUrl}/user/${userId}`, { withCredentials: true });
            toast.success('User Deleted Successfully');
            fetchData(); // refresh user list
        } catch (err) {
            toast.error('Failed to delete user');
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-4">
            <ToastContainer position='top-right'/>
            <div className="overflow-x-auto">
                <div className="text-lg font-semibold text-slate-700 mb-4">User List</div>

                {loading ? (
                    <div className="text-center py-10 text-slate-500 text-lg">Loading users...</div>
                ) : error ? (
                    <div className="text-center py-10 text-red-500 text-lg">{error}</div>
                ) : users.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 text-lg">No users found.</div>
                ) : (
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-slate-600 text-white">
                            <tr>
                                <th className="text-left px-6 py-3 border-b border-slate-700">Name</th>
                                <th className="text-left px-6 py-3 border-b border-slate-700">Email</th>
                                <th className="text-left px-6 py-3 border-b border-slate-700">Role</th>
                                <th className="text-left px-6 py-3 border-b border-slate-700">Task Assign</th>
                                <th className="text-left px-6 py-3 border-b border-slate-700">Bugs</th>
                                <th className="text-center px-6 py-3 border-b border-slate-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-300">
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-slate-100 transition duration-300"
                                >
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4 capitalize">{user.role}</td>
                                    <td className="px-6 py-4 text-center">{user.tasks || 0}</td>
                                    <td className="px-6 py-4 text-center">{user.Bugs.length}</td>
                                    <td className="px-6 py-4 text-center flex flex-col gap-2 md:flex-row">
                                        <Link title='edit' to={`/userRole/${user._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm">
                                            Edit
                                        </Link>
                                        <button title='Delete' onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md ml-2 text-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Table;
