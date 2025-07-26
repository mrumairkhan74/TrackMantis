import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
const apiUrl = import.meta.env.VITE_BACKEND_API;
import 'aos/dist/aos.css';
import Aos from 'aos';
const CommentForm = () => {
  Aos.init();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const { id: bugId } = useParams();
  const { user } = useContext(AuthContext);
  const [uploadFile, setUploadFile] = useState('')
  // Properly formatted GET request
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${apiUrl}/comment/bug/${bugId}`);
      setComments(res.data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError(error.response?.data?.message || 'Failed to load comments');
    }
  };


  useEffect(() => {
    if (bugId) fetchComments();
  }, [bugId]);

  // POST request with proper error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) return setError('You must be logged in to comment');
    if (!comment.trim()) return setError('Comment cannot be empty');

    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('bugId', bugId);
    if (uploadFile) {
      formData.append('uploadFile', uploadFile);
    }

    try {
      await axios.post(`${apiUrl}/comment/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      setComment('');
      setUploadFile('');
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
      setError(error.response?.data?.message || 'Failed to post comment');
    }
  };



  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/comment/${commentId}`,
        { withCredentials: true }
      );
      toast.success('Comment Deleted Successfully')
      setTimeout(() => {
        fetchComments();
      }, [1000])
    } catch (error) {
      console.error('Failed to delete comment:', error);
      setError(error.response?.data?.message || 'Failed to delete comment');
    }
  };

  return (
    <>
      <ToastContainer position='top-right' duration={500} />
      {error && <div className="error text-red-500">{error}</div>}
      <div className="comments-list md:flex-row flex flex-col items-center gap-2 border-b-3 mb-2 border-gray-200 ">
        {comments.map((comment) => (
          <div key={comment._id} className="comment shadow-md shadow-gray-300 rounded-md py-1 px-3 mx-0 my-5">
            <div className="flex items-center gap-2 p-2">
              <img loading="lazy"
                src={comment.createdBy.userImage || '/default.webp'}
                alt={comment.createdBy.userName}
                className="w-10 h-10 rounded-full object-cover border-1 border-slate-500"
              />
              <h4 className='font-bold my-2 tracking-wide py-2'>{comment.createdBy?.userName}</h4>
            </div>
            <div className="flex items-center gap-2 flex-col md:flex-row">
              <p className='text-[18px] tracking-wide px-4'>{comment.comment}</p>

              {comment.uploadFile && comment.uploadFile.length > 0 && comment.uploadFile.map((file, index) => (
                <a
                  title={file.fileName}
                  key={index}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='text-blue-600 rounded-full block bg-gray-200 py-2 px-3'
                >
                  📎 {file.fileName}
                </a>
              ))}
            </div>

            <div className="flex justify-end items-center my-2">

              <button
              title='Delete Comment'
                onClick={() => deleteComment(comment._id)}
                className='text-white bg-red-700 rounded-full px-2 py-1'
              >
                Delete
              </button>

              <p className='text-slate-900 opacity-50  p-2 '>{new Date(comment.createdAt).toDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Your form JSX */}
      <div className="comment-section">
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            rows={4}
            className='w-full resize-none border-gray-300 border rounded-md p-3 '
          />
          <input
            type="file"
            onChange={(e) => setUploadFile(e.target.files[0])}
            className="mt-2 bg-gray-200 py-2 px-4 "
            accept=".pdf,.doc,.docx,.png,.jpg"
          />
          <div className='flex justify-end items-center'>

            <button title='Post Comment' type="submit" className='bg-slate-700 text-white  p-2 rounded-md my-2 '>Post Comment</button>
          </div>
        </form>



      </div>

    </>
  );
};

export default CommentForm;