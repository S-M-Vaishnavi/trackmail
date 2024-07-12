import React from "react";
import checkBlue from '../assets/checkBlue.png'
import checkWhite from '../assets/checkWhite.png'

const ProgressBar = ({ currentStep, totalSteps }) => (
  <div className="w-full h-[5px] bg-gray-200 rounded-xl">
    <div 
      className="bg-blue-500 h-[5px] rounded-xl transition-all duration-300" 
      style={{ width: currentStep === 1 ? '0%' : `${((currentStep-1) / (totalSteps-1)) * 100}%` }}
    ></div>
  </div>
);

const StepItem = ({ title, isActive, isCompleted }) => (
  <div className="flex items-center mb-4">
    <div
      className={`flex items-center justify-center w-8 h-8 border-2 rounded-full`}
      style={{
        backgroundColor: isActive ? "hsl(210, 100%, 50%)" : "transparent",
        borderColor: isActive ? "hsl(210, 100%, 50%)" : "hsl(229, 24%, 87%)",
      }}
    >
      <img 
        src={isActive ? checkWhite : checkBlue} 
        alt="" 
        className="w-5 h-5"
      />
    </div>
    <p className="ml-4 text-gray-600">{title}</p>
  </div>
);

const Sidebar = ({ currentStep, steps }) => {
  return (
    <aside className="absolute top-0 left-0 right-[100%] sm:relative pt-8 sm:pl-8 sm:basis-[50%] flex items-start justify-center sm:flex-col sm:justify-start bg-white">
      <div className="flex flex-col items-start w-full">
        <h1 className="text-2xl font-bold mb-2">Hi there!</h1>
        <p className="mb-6">Welcome to Mailtag!</p>
        
        <div className="flex items-center justify-between w-full mb-3">
          <div className="border bg-gray-100 font-semibold w-[37px] text-center rounded-[28px]">
            {currentStep}/{steps.length}
          </div>
          <div className="flex-grow mx-4">
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
          </div>
        </div>
      
        {steps.map((step, index) => (
          <StepItem
            key={index}
            title={step}
            isCompleted={index < currentStep - 1}
            isActive={index === currentStep - 1}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
