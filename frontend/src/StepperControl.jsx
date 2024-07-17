import React from 'react';

const StepperControl = ({ handleClick, handleSubmit, currentStep, steps }) => {
  if (!steps || !Array.isArray(steps)) {
    return null;
  }
  return (
    <div>
      {currentStep < steps.length && (
        <div className="flex justify-between mt-[50px]">
          <button className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-200 ml-[30px]"   onClick={() => handleClick("back")} disabled={currentStep === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 mr-[40px]" onClick={(e) => {e.preventDefault(); handleSubmit(e);}}>
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default StepperControl;
