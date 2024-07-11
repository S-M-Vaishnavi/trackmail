import React, { useState } from 'react';
import Stepper from './Stepper';
import TrackYourEmails from './components/TrackYourEmails';
import AutomateYourFollowUps from './components/AutomateYourFollowUps';
import YourDashBoard from './components/YourDashBoard';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [ "Track Your Emails","Automate Your follow-Ups","Your Dashboard"];
  const displayStep = (step) => {
    switch(step){
      case 1:
        return <TrackYourEmails handleClick={handleClick} currentStep={currentStep} steps={steps}/>;
      case 2:
        return <AutomateYourFollowUps handleClick={handleClick} currentStep={currentStep} steps={steps}/>;
      case 3:
        return <YourDashBoard handleClick={handleClick} currentStep={currentStep} steps={steps}/>;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    if(direction === "next") {
      newStep++;
    }else if(direction === "back"){
      newStep--;
    }

    if(newStep > 0 && newStep <= steps.length){
      setCurrentStep(newStep);
    }
  };

  return (
    <div className="w-11/12 mx-auto shadow-xl rounded-2xl pb-2 px-10 bg-white">
    {/* stepper */}
    <div className='container mt-5 xl:px-[200px] md:px-0'>
      <Stepper steps={steps} currentStep={currentStep}/>
      {/* Display Components */}
      <div className='mt-20 pr-10 mr-10 md:pr-0 md:mr-0'>
          {displayStep(currentStep)}
      </div>
    </div>
  </div>
  )
}

export default App
