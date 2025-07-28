import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router';
import 'aos/dist/aos.css';
import Aos from 'aos';
const apiUrl = import.meta.env.VITE_BACKEND_API;

const EditProfile = () => {
    Aos.init();
    const [loading, setLoading] = useState(false)
    const { user, login } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || '');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(user?.image?.url || '');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('name', name);
            if (image) {
                formData.append('image', image);
            }

            const res = await axios.put(`${apiUrl}/user/${user.id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            login(res.data.user); // Update context
            toast.success('Profile updated!');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen p-6 flex justify-center items-center bg-gray-100">
            <ToastContainer position="top-right" />
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md overflow-hidden"
                data-aos="flip-left" data-aos-easing="linear"
                data-aos-duration="2000"
            >
                <h2 className="text-2xl font-bold text-slate-700 mb-4 font-[Poppins]">
                    Edit Profile
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Profile Image</label>
                    <div className="flex items-center gap-4">
                        <img loading="lazy"
                            src={preview || '/fallback.jpg'}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border"
                        />
                        <input type="file" onChange={handleImageChange} />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <button
                    data-aos="fade-up" data-aos-easing="linear"
                    data-aos-duration="2000"
                    title='Save Edit Profile'
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-slate-600 to-slate-900 text-white py-2 px-4 rounded hover:opacity-90 transition"
                >
                    {loading ? 'Save Changes' : 'Saving...'}
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
