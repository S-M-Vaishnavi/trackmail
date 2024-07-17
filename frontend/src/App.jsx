import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TrackYourEmails from './pages/TrackYourEmails';
import AutomateYourFollowUps from './pages/AutomateYourFollowUps';
import YourDashBoard from './pages/YourDashBoard';
import ThankYou from './pages/ThankYou';
import { UserDataProvider } from './context/UserDataContext';
import Modal from './components/Modal';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        return <TrackYourEmails handleClick={handleClick} currentStep={currentStep} steps={steps} />;
      case 2:
        return <AutomateYourFollowUps handleClick={handleClick} currentStep={currentStep} steps={steps} />;
      case 3:
        return <YourDashBoard handleClick={handleClick} currentStep={currentStep} steps={steps} />;
      case 4:
        return <ThankYou />;
      default:
        return <TrackYourEmails handleClick={handleClick} currentStep={currentStep} steps={steps} />;
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-gray-100 w-full h-screen flex flex-col items-center justify-center">
      <button onClick={openModal} className="bg-blue-500 text-white p-4 rounded mb-4"> Open Modal</button>
      <Modal isVisible={isModalVisible} onClose={closeModal}>
        <div className="w-[80rem] h-[39rem] rounded-xl shadow-xl flex mx-auto bg-gray-100">
          <Sidebar currentStep={currentStep} steps={steps} />
          <main className="w-2/3 bg-gray-100 p-8 rounded-r-xl flex flex-col justify-between">
            <div>
              <UserDataProvider>
                {renderStepContent(currentStep)}
              </UserDataProvider>
            </div>
          </main>
        </div>
      </Modal>
    </div>
  );
};

export default App;

