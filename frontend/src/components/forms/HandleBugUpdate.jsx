import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';

const apiUrl = import.meta.env.VITE_BACKEND_API;

const HandleBugUpdate = () => {
    const { id } = useParams()
    const [status, setStatus] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload
        try {
            const res = await axios.put(`${apiUrl}/bug/${id}`, { status }, { withCredentials: true });
            toast.success('Status Updated Successfully');
            setTimeout(() => {
                navigate('/mybugs');
            }, 1000);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong');
        }
    };


    return (
        <div className="min-h-screen p-6 flex justify-center items-center bg-gray-100">
            <ToastContainer position="top-right" />
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-slate-700 mb-4 font-[Poppins]">
                    Update bug
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Bug Detail</label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Status</label>
                    <select name="status" id="" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="" disabled>Select Status</option>
                        <option value="open">Open</option>
                        <option value="inProgress">in Progress</option>
                        <option value="close">Close</option>
                    </select>
                </div>

                <button
                    title='Save Changes'
                    type="submit"
                    className="w-full bg-gradient-to-r from-slate-600 to-slate-900 text-white py-2 px-4 rounded hover:opacity-90 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default HandleBugUpdate;
