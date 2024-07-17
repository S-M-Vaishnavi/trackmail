import React, { useState } from 'react';
import video from '../assets/video.mp4';
import StepperControl from '../StepperControl';
import { useUserData } from '../context/UserDataContext';
import axios from 'axios';

const YourDashBoard = ({ currentStep, steps, handleClick }) => {
  const { userData } = useUserData();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post(`${apiUrl}/mail`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
      handleClick("next");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data.error || 'The email has already been taken! Enter any other email');
      } else {
        console.error('Error', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your dashboard.</h2>
        <p className="mb-2 text-gray-600">See your metrics like average open rate, click rate, and reply rate.</p>
        <p className="mb-6 text-gray-600">Configure your Ping sequences and other settings.</p>
        <video src={video} controls className='w-[600px] h-[300px] mx-auto'></video>
        <div className='flex justify-center mt-4'>
          {loading ? (
            <button type="button" className="bg-indigo-500 text-white font-bold py-2 px-4 rounded inline-flex items-center" disabled>
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              </svg>
              Processing...
            </button>
          ) : ""}
        </div>
        {serverError && <p className='text-red-500 text-sm mt-1 text-center font-bold'>{serverError}</p>}
        <StepperControl handleSubmit={handleSubmit} handleClick={handleClick} currentStep={currentStep} steps={steps} />
      </div>
    </div>
  );
};

export default YourDashBoard;
