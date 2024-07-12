import React,{useState} from 'react'
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrackYourEmails from './pages/TrackYourEmails'
import AutomateYourFollowUps from './pages/AutomateYourFollowUps'
import YourDashBoard from './pages/YourDashBoard'
import ThankYou from './pages/ThankYou';
import StepperControl from './StepperControl';

const App = () => {
    const steps = [
    "Track your emails",
    "Automate your follow-ups",
    "Your dashboard"
  ];

  const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

    const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-gray-300 sm:w-[80rem] h-[35rem] mt-[100px] sm:mt-0 rounded-xl shadow-xl flex flex-col sm:flex sm:flex-row justify-between mx-auto">
      <Sidebar currentStep={currentStep} steps={steps}/>
      <StepperControl handleBack={handleBack} handleNext={handleNext} currentStep={currentStep} steps={steps}/>
    </div>
  )
}

export default App
