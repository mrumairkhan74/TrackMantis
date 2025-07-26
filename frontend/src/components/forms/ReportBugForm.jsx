import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const apiUrl = import.meta.env.VITE_BACKEND_API;
const ReportBugForm = () => {
  const [screenshots, setScreenshots] = useState([]);
  const [previewUrls, setPreviewUrl] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);

  const [bugTitle, setBugTitle] = useState('')
  const [project, setProject] = useState('')
  const [priority, setPriority] = useState('')
  const [severity, setSeverity] = useState('')
  const [bugType, setBugType] = useState('')
  const [description, setDescription] = useState('')
  const [operatingSystem, setOperatingSystem] = useState('')
  const [browser, setBrowser] = useState('')
  const [device, setDevice] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const navigate = useNavigate();

  const handleSubmitBug = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bugTitle', bugTitle);
    formData.append('project', project);
    formData.append('priority', priority);
    formData.append('severity', severity);
    formData.append('description', description);
    formData.append('bugType', bugType);
    formData.append('operatingSystem', operatingSystem);
    formData.append('browser', browser);
    formData.append('device', device);
    formData.append('additionalInfo', additionalInfo);

    screenshots.forEach((file) => {
      formData.append('screenShot', file); // same key for multiple files
    });
    documentFiles.forEach((file) => {
      formData.append('documentFiles', file); // same key for multiple files
    });

    try {
      const res = await axios.post(`${apiUrl}/bug/create`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Your bug was reported successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Upload failed');
    }
  };




  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setScreenshots(files);

    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrl(urls);
  };
  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    setDocumentFiles(files);
  };
  

  return (
    <>
      <ToastContainer position='top-right' />
      <div className="flex flex-col items-center px-6 md:px-[250px] mt-10">
        <form className="w-full bg-white shadow-md rounded-lg p-5 space-y-6" onSubmit={handleSubmitBug} >

          {/* Title & Project */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="bugTitle" className="text-lg font-semibold">Bug Title*</label>
              <input type="text" id="bugTitle" value={bugTitle} onChange={e => setBugTitle(e.target.value)} placeholder="Brief description of the bug" className="border border-gray-300 rounded-md p-2 text-base" />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="project" className="text-lg font-semibold">Project*</label>
              <select id="project" value={project} onChange={e => setProject(e.target.value)} className="border border-gray-300 rounded-md p-2 text-base bg-white">
                <option value="">Select project</option>
                <option value="WebsiteRedesign">Website Redesign</option>
                <option value="MobileApp">Mobile App</option>
                <option value="AppServices">Api Services</option>
                <option value="AdminDashboard">Admin Dashboard</option>
              </select>
            </div>
          </div>

          {/* Priority, Severity, Type */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="priority" className="text-lg font-semibold">Priority*</label>
              <select id="priority" value={priority} onChange={e => setPriority(e.target.value)} className="border border-gray-300 rounded-md p-2 text-base bg-white">
                <option value="">Select priority</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="severity" className="text-lg font-semibold">Severity*</label>
              <select id="severity" value={severity} onChange={e => setSeverity(e.target.value)} className="border border-gray-300 rounded-md p-2 text-base bg-white">
                <option value="">Select severity</option>
                <option value="Blocker">Blocker</option>
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
                <option value="Cosmetic">Cosmetic</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="bugType" className="text-lg font-semibold">Bug Type*</label>
              <select id="bugType" value={bugType} onChange={e => setBugType(e.target.value)} className="border border-gray-300 rounded-md p-2 text-base bg-white">
                <option value="">Select type</option>
                <option value="Functional">Functional</option>
                <option value="Visual">Visual</option>
                <option value="Performance">Performance</option>
                <option value="Security">Security</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-semibold">Description*</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows="5" className="border border-gray-300 rounded-md p-2 text-base resize-none" placeholder="Detailed steps to reproduce the bug, expected vs actual behavior"></textarea>
          </div>

          {/* Screenshot Upload with Preview */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Screenshots</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="mb-3 w-[300px] bg-slate-300 p-2 rounded-md" />

            <div className="border border-dashed border-gray-400 rounded-md p-5 text-center text-gray-500">
              {previewUrls && previewUrls.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative w-[200px] h-[150px]">
                      <img src={url} alt={`preview-${index}`} className="w-full h-full object-cover rounded-md" />
                      <button
                      title='preview'
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(previewUrls[index]);
                          const newPreviews = [...previewUrls];
                          const newScreenshots = [...screenshots];
                          newPreviews.splice(index, 1);
                          newScreenshots.splice(index, 1);
                          setPreviewUrl(newPreviews);
                          setScreenshots(newScreenshots);
                        }}
                        className="absolute top-1 right-1 bg-white text-black rounded-full px-2 py-0.5 text-sm shadow"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Upload files or drag and drop<br />PNG, JPG, GIF up to 5MB</p>
              )}
            </div>

          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold mb-2">Document Files</label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.xlsx"
              onChange={handleDocumentChange}
              className="mb-3 w-[300px] bg-slate-300 p-2 rounded-md"
            />
          </div>
          {/* Environment */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="os" className="text-lg font-semibold">Operating System</label>
              <select id="os" value={operatingSystem} onChange={e => setOperatingSystem(e.target.value)} className="border border-gray-300 rounded-md p-2 text-base bg-white">
                <option value="">Select OS</option>
                <option value="Window">Windows</option>
                <option value="MacOS">macOS</option>
                <option value="Linux">Linux</option>
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="browser" className="text-lg font-semibold">Browser</label>
              <select id="browser" value={browser} onChange={e => setBrowser(e.target.value)} className="border border-gray-300 rounded-md p-2 text-base bg-white">
                <option value="">Select Browser</option>
                <option value="Chrome">Chrome</option>
                <option value="Firefox">Firefox</option>
                <option value="Safari">Safari</option>
                <option value="Edge">Edge</option>
                <option value="Opera">Opera</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="device" className="text-lg font-semibold">Device</label>
              <input type="text" id="device" value={device} onChange={e => setDevice(e.target.value)} placeholder="e.g. iPhone 12, MacBook" className="border border-gray-300 rounded-md p-2 text-base" />
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex flex-col">
            <label htmlFor="additional" className="text-lg font-semibold">Additional Information</label>
            <input type="text" id="additional" value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} className="border border-gray-300 rounded-md p-2 text-base" placeholder="Any other relevant information" />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button type="button" className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700">Submit Bug Report</button>
          </div>
        </form>
      </div>
    </>

  );
};

export default ReportBugForm;
