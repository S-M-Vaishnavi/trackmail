import React from 'react';

const StepperControl = ({ handleBack, handleNext, currentStep, steps }) => {

    if (!steps || !Array.isArray(steps)) {
      return null;
    }
  return (
    <div className="flex justify-between mt-8">
      <button 
        className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-200"
        onClick={handleBack} 
        disabled={currentStep === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back
      </button>
      <button 
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={handleNext} 
        disabled={currentStep === steps.length}
      >
        Next
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default StepperControl;

