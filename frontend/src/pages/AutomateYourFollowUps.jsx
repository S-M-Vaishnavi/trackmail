import React, { useContext, useState,useEffect } from 'react';
import StepperControl from '../StepperControl';
import { useUserData } from '../context/UserDataContext';

const AutomateYourFollowUps = ({ currentStep, steps, handleClick }) => {
  const { userData, updateUserData } = useUserData();
  const [error, setError] = useState('');

  const validateError = () => {
    if (!userData.sequence) {
      setError("Select any one Sequence");
      return false;
    }
    setError('');
    return true;
  }

  const handleChange = (e) => {
    updateUserData({ sequence: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateError()) {
      handleClick("next", true);
    }
  }
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Automate your follow-ups. </h2>
        <p className="mb-2 text-gray-600">Save dozens of hours every month.</p>
        <p className="mb-6 text-gray-600">Never manually follow-up with anyone, ever again</p>
        <div className='bg-white rounded-lg shadow-md p-6 mx-auto'>
          <h1>Select Ping Sequence</h1>
          <div className="flex items-center mt-3">
            <input id="radio-vertical-group-1" type="radio" name="sequence" className="mr-2"value="default" checked={userData.sequence === "default"}onChange={handleChange}/>
            <label htmlFor="radio-vertical-group-1" className="cursor-pointer text-gray-600 text-sm font-normal">
              Default
            </label>
          </div>
          <div className="flex items-center mt-3">
            <input id="radio-vertical-group-2" type="radio" name="sequence" className="mr-2"value="sequence1" checked={userData.sequence === "sequence1"}onChange={handleChange}/>
            <label htmlFor="radio-vertical-group-2" className="cursor-pointer text-gray-600 text-sm font-normal">
              Follow-Up Sequence #1
            </label>
          </div>
          <div className="flex items-center mt-3">
            <input id="radio-vertical-group-3" type="radio" name="sequence" className="mr-2"value="sequence2" checked={userData.sequence === "sequence2"}onChange={handleChange}/>
            <label htmlFor="radio-vertical-group-3" className="cursor-pointer text-gray-600 text-sm font-normal">
              Follow-Up Sequence #2
            </label>
          </div>
          <div className="flex items-center mt-3">
            <input id="radio-vertical-group-4" type="radio" name="sequence" className="mr-2"value="sequence3" checked={userData.sequence === "sequence3"}onChange={handleChange} />
            <label htmlFor="radio-vertical-group-4" className="cursor-pointer text-gray-600 text-sm font-normal">
              Follow-Up Sequence #3
            </label>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div>
            <button className='border border-blue p-3 bg-blue-600 text-white mt-4 w-[180px]'>
              Attach Sequence
            </button>
          </div>
        </div>
      </div>
      <StepperControl  handleClick={handleClick}  handleSubmit={handleSubmit}  currentStep={currentStep}  steps={steps} />
    </div>
  )
}

export default AutomateYourFollowUps