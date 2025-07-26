import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_BACKEND_API

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null)

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        try {
            const res = await axios.post(`${apiUrl}/user/signup`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Signup Successfully');
            setTimeout(() => {
                if (res.data.user.role === 'admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            }, 2000);
        } catch (error) {
            toast.error(error?.response?.data?.error || 'Signup Failed');
        }
    };



    return (
        <>
            <ToastContainer position='top-right' />
            <div className=" w-full min-h-screen flex items-center justify-center">
                <div className="bg-white shadow-xl rounded-2xl w-[90%] max-w-md p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-600 font-[Poppins] mb-8">Signup</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Image <span className='text-red-500'>*</span></label>
                            <input
                                type="file"
                                accept='image/*'
                                autoComplete="off"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Name <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                autoComplete="off"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Email <span className='text-red-500'>*</span></label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="off"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Password <span className='text-red-500'>*</span></label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="off"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <p className='text-gray-500'>Already have an Account?</p> <Link className='text-slate-700' to={'/login'}>Login</Link>
                        </div>
                        <button
                            title='Signup submit'
                            type="submit"
                            className="w-full py-3 mt-4 rounded-lg text-white font-semibold text-lg bg-gradient-to-r from-slate-600 to-slate-900 hover:from-slate-900 hover:to-slate-500 transition-all duration-300"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit()
                                }
                            }}
                        >
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
