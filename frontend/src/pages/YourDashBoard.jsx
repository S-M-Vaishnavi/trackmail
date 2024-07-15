import React from 'react'
import video from '../assets/video.mp4'
import StepperControl from '../StepperControl';


const YourDashBoard = ( {currentStep, steps, handleClick }) => {
  const handleSubmit = () => {
    console.log("Your dashboard");
    handleClick("next");
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
