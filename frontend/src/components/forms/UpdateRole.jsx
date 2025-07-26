import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';

const apiUrl = import.meta.env.VITE_BACKEND_API;

const UpdateRole = () => {
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload
        try {
            const res = await axios.put(`${apiUrl}/user/role/${id}`, { role }, { withCredentials: true });
            toast.success('Role Updated Successfully');
            setTimeout(() => {
                navigate('/dashboard');
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
                    Update Role
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">User Role</label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Role</label>
                    <select name="status" id="" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="" disabled>Select Role</option>
                        <option value="user">User</option>
                        <option value="tester">Tester</option>
                        <option value="developer">Developer</option>
                    </select>
                </div>

                <button
                title='Submit'
                    type="submit"
                    className="w-full bg-gradient-to-r from-slate-600 to-slate-900 text-white py-2 px-4 rounded hover:opacity-90 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UpdateRole;
