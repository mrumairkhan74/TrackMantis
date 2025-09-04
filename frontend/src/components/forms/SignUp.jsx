import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import Aos from 'aos';

const apiUrl = import.meta.env.VITE_BACKEND_API;

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    Aos.init();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            if (image) {
                formData.append("image", image);
            }

            await axios.post(`${apiUrl}/user/signup`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            toast.success("Account created successfully");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.error || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" />
            <div
                className="w-full min-h-screen flex items-center justify-center bg-gray-50"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1500"
            >
                <div className="bg-white shadow-xl rounded-2xl w-[90%] max-w-md p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-700 font-[Poppins] mb-8">
                        Create Account
                    </h1>

                    <form onSubmit={handleSignUp}>
                        {/* Name */}
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                autoComplete="off"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-indigo-300 
                                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="off"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-indigo-300 
                                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-indigo-300 
                                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-indigo-300 
                                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm mb-1">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-indigo-300 
                                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Links */}
                        <div className="flex items-start justify-start gap-2 mb-3">
                            <p className="text-gray-500">Already have an account?</p>
                            <Link className="text-slate-700 font-semibold" to="/login">
                                Login
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-3 mt-2 rounded-lg text-white font-semibold text-lg 
                            bg-gradient-to-r from-slate-600 to-slate-900 
                            hover:from-slate-900 hover:to-slate-500 
                            transition-all duration-300"
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
