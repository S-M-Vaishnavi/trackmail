import React from 'react';
import StepperControl from '../StepperControl';
import TrackYourEmails from '../pages/TrackYourEmails';
import AutomateYourFollowUps from '../pages/AutomateYourFollowUps';
import YourDashBoard from '../pages/YourDashBoard';
import ThankYou from '../pages/ThankYou';

const MainContent = ({ currentStep, steps, handleBack, handleNext }) => {
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return <TrackYourEmails />;
      case 2:
        return <AutomateYourFollowUps />;
      case 3:
        return <YourDashBoard />;
      case 4:
        return <ThankYou />;
    }
  };

  return (
    <main className="w-2/3 bg-gray-100 p-8 rounded-r-xl flex flex-col justify-between">
      <div>
        {renderStepContent()}
      </div>
      <StepperControl 
        handleBack={handleBack} 
        handleNext={handleNext} 
        currentStep={currentStep} 
        steps={steps}
      />
    </main>
  );
};

export default MainContent;