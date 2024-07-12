import React from 'react';
import checkBlue from '../assets/checkBlue.png';
import checkWhite from '../assets/checkWhite.png';

const Sidebar = ({ currentStep, steps }) => {
  return (
    <aside className="w-1/3 pt-8 pl-8 bg-white rounded-l-xl">
      <h1 className="text-2xl font-bold mb-2">Hi there!</h1>
      <p className="mb-6 text-gray-600">Welcome to Mailtag!</p>
      
      <div className="flex items-center mb-6">
        <div className="bg-gray-100 rounded-xl font-semibold px-2 py-1 text-sm">
          {currentStep}/{steps.length}
        </div>
        <div className="flex-grow ml-4 mr-4 bg-gray-200 h-1 rounded-full">
          <div 
            className="bg-blue-500 h-1 rounded-full transition-all duration-300" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {steps.map((step, index) => (
        <div key={index} className="flex items-center mb-4">
          <div
            className={`flex items-center justify-center w-8 h-8 border-2 rounded-full
              ${index + 1 === currentStep ? 'border-blue-500' : index + 1 < currentStep ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}
            `}
          >
            <img 
              src={index + 1 < currentStep ? checkWhite : checkBlue} 
              alt="" 
              className="w-5 h-5"
            />
          </div>
          <p className={`ml-4 ${index + 1 === currentStep ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}>{step}</p>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;