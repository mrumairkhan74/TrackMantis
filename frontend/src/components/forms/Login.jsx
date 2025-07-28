import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../Context/AuthContext';
const apiUrl = import.meta.env.VITE_BACKEND_API
import 'aos/dist/aos.css';
import Aos from 'aos';

const Login = () => {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    Aos.init()

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const res = await axios.post(`${apiUrl}/user/login`, { email, password }, { withCredentials: true });

            const { user, token } = res.data;

            toast.success("Login Successfully");

            // Call login with both user and token
            login({ user, token });

            setTimeout(() => {
                if (user.role === 'admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            }, 2000);

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.error || "Login failed");
        } finally {
            setLoading(false)
        }
    }



    return (
        <>
            <ToastContainer position='top-right' />
            <div className=" w-full min-h-screen flex items-center justify-center" data-aos="flip-right" data-aos-easing="linear"
                data-aos-duration="2000">
                <div className="bg-white shadow-xl rounded-2xl w-[90%] max-w-md p-8 overflow-hidden">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-600 font-[Poppins] mb-8">Login</h1>

                    <form onSubmit={handleLogin}>
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="off"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Password</label>
                            <input

                                type="password"
                                placeholder="Enter your password"
                                autoComplete="off"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between gap-4">
                                <Link className='text-slate-700'> Forget Password?</Link>
                            </div>
                            <div className="flex items-start justify-start gap-4">
                                <p className='text-gray-500'>Create New Acc?</p>
                                <Link className='text-slate-700' to={'/signup'}>Signup</Link>
                            </div>
                        </div>

                        <button
                            data-aos="fade-up" data-aos-easing="linear"
                            data-aos-duration="2000"
                            title='Login submit'
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleLogin()
                                }
                            }}
                            disabled={loading}
                            type="submit"
                            className="w-full py-3 mt-4 rounded-lg text-white font-semibold text-lg bg-gradient-to-r from-slate-600 to-slate-900 hover:from-slate-900 hover:to-slate-500 transition-all duration-300"
                        >
                            {loading ? "Login..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
