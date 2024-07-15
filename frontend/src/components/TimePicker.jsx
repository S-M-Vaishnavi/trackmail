import React, { useState } from 'react';

const TimePicker = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isPM, setIsPM] = useState(false);

  const incrementHour = () => setHour((prev) => (prev % 12) + 1);
  const decrementHour = () => setHour((prev) => (prev - 2 + 12) % 12 + 1);
  
  const incrementMinute = () => setMinute((prev) => (prev + 1) % 60);
  const decrementMinute = () => setMinute((prev) => (prev - 1 + 60) % 60);

  const toggleAMPM = () => setIsPM((prev) => !prev);

  return (
    <div className="flex items-center space-x-4 font-sans">
      <span className="text-2xl font-semibold">{hour}</span>

      <div className="flex flex-col items-center">
        <button onClick={incrementHour} className="text-gray-400 hover:text-gray-600 transform rotate-90">&lt;</button>
        <button onClick={decrementHour} className="text-gray-400 hover:text-gray-600 transform rotate-90">&gt;</button>
      </div>
      <span className="text-2xl font-semibold">{minute}</span>
      <div className="flex flex-col items-center">
        <button onClick={incrementMinute} className="text-gray-400 hover:text-gray-600 transform rotate-90">&lt;</button>
        <button onClick={decrementMinute} className="text-gray-400 hover:text-gray-600 transform rotate-90">&gt;</button>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`text-sm ${!isPM ? 'font-bold' : 'text-gray-400'}`}>AM</span>
        <button onClick={toggleAMPM} className={`w-12 h-6 rounded-full p-1 ${isPM ? 'bg-blue-500' : 'bg-gray-300'} transition-colors duration-200 ease-in-out`}>
          <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${isPM ? 'translate-x-6' : ''}`}></div>
        </button>
        <span className={`text-sm ${isPM ? 'font-bold' : 'text-gray-400'}`}>PM</span>
      </div>
    </div>
  );
};

export default TimePicker;