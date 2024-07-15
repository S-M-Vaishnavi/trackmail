
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TrackYourEmails from './pages/TrackYourEmails';
import AutomateYourFollowUps from './pages/AutomateYourFollowUps';
import YourDashBoard from './pages/YourDashBoard';
import ThankYou from './pages/ThankYou';
import { userDataContext } from './context/UserDataContext';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    date: '',
    time: '',
    timeZone: '',
    email: '',
    followUps:'',
  });
  const [finalData, setFinalData] = useState([]);

  const steps = [
    "Track your emails",
    "Automate your follow-ups",
    "Your dashboard",
    "Thank You"
  ];

  const handleClick = (direction) => {
    let newStep = currentStep;
    if(direction === "next"){
      newStep++;
    }else if(direction === "back"){
      newStep--;
    }

    if(newStep > 0 && newStep <= steps.length){
      setCurrentStep(newStep);
    }
  }

  const renderStepContent = (currentStep) => {
    switch(currentStep) {
      case 1:
        return <TrackYourEmails handleClick={handleClick} currentStep={currentStep} steps={steps} userData={userData} setUserData={setUserData}/>;
      case 2:
        return <AutomateYourFollowUps handleClick={handleClick} currentStep={currentStep} steps={steps} userData={userData} setUserData={setUserData}/>;
      case 3:
        return <YourDashBoard handleClick={handleClick} currentStep={currentStep} steps={steps} userData={userData} setUserData={setUserData}/>;
      case 4:
        return <ThankYou />;
      default:
        return <TrackYourEmails handleClick={handleClick} currentStep={currentStep} steps={steps} userData={userData} setUserData={setUserData}/>;
    }
  };

  return (
    <div className="bg-gray-100 w-[80rem] h-[39rem] mt-[41px] rounded-xl shadow-xl flex mx-auto">
      <Sidebar currentStep={currentStep} steps={steps} />
      <main className="w-2/3 bg-gray-100 p-8 rounded-r-xl flex flex-col justify-between">
        <div>
          <userDataContext.Provider value={{userData,setUserData,finalData,setFinalData}}>
          {renderStepContent(currentStep)}
          </userDataContext.Provider>
        </div>
      </main>
    </div>
  );
};

export default App;