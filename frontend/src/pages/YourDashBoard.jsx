import React from 'react'
import video from '../assets/video.mp4'
import StepperControl from '../StepperControl';
import { useUserData } from '../context/UserDataContext';

import axios from 'axios';

const YourDashBoard = ( {currentStep, steps, handleClick }) => {

  const { userData } = useUserData();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let res = await axios.post("http://localhost:8000/api/mail",userData,{
        headers:{
          'Content-Type':'application/json',
        },
      });
      console.log(res);
      handleClick("next");
    } catch(error){
      console.error('Error creating user:',error.response.data);
    }
    
  }
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your dashboard.</h2>
        <p className="mb-2 text-gray-600">See your metrics like average open rate,click rate, and reply rate.</p>
        <p className="mb-6 text-gray-600">Configure your Ping sequences and other settings.</p>
        <video src={video} controls className='w-[600px] h-[300px] mx-auto'></video>
        <StepperControl handleSubmit={handleSubmit}  handleClick={handleClick} currentStep={currentStep} steps={steps} />
    </div>
  </div>
  )
}

export default YourDashBoard
