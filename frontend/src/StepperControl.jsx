
import React from 'react';

const StepperControl = ({ handleBack,handleNext ,currentStep, steps }) => {
  return (
    <div className='container justify-around'>
      <div className="flex justify-between">
       <button className="relative inline-block font-semibold leading-6 text-gray-800 rounded disabled:opacity-50 no-underline cursor-pointer group"  onClick={handleBack} disabled={currentStep === 1}>
                <div className="relative z-10 flex items-center px-6 py-3 space-x-2 rounded-full"s>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-6 h-6">
                  <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 0-1.06 0l-4.25 4.25a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 0 0 1.06-1.06L8.06 10l3.72-3.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd"></path>
                </svg>
                    <span>Back</span>
                </div>
        </button>

        <button className="relative inline-block font-semibold leading-6 text-white no-underline cursor-pointer group rounded-xl" onClick={handleNext} disabled={currentStep === steps.length}>
                <div className="relative z-10 flex items-center px-6 py-2 space-x-2 rounded-full" style={{ backgroundColor: 'hsl(210, 100%, 50%)' }}>
                    <span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                    </svg>
                </div>
        </button>
      </div>
    </div>
  );
};

export default StepperControl;





