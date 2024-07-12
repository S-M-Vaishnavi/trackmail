import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App = () => {
  const steps = [
    "Track your emails",
    "Automate your follow-ups",
    "Your dashboard",
    "Thank You"
  ];
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="bg-gray-100 w-[80rem] h-[39rem] mt-[41px] rounded-xl shadow-xl flex mx-auto">
      <Sidebar currentStep={currentStep} steps={steps} />
      <MainContent currentStep={currentStep} steps={steps}handleBack={handleBack}handleNext={handleNext}/>
    </div>
  );
};

export default App;