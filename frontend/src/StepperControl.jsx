
import React from 'react';

const StepperControl = ({ handleClick, handleSubmit, currentStep, steps }) => {
  return (
    <div className='container flex justify-around mt-[60px] mb-8'>
      {/* back button */}
      <button
        onClick={() => handleClick("back")}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out
          ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentStep === 1}
      >
        Back
      </button>

      {/* next button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className='bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out'
      >
        {currentStep === steps.length  ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;





