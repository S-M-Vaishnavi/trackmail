import React, { useState, useEffect,useContext } from 'react';
import { useUserData } from '../context/UserDataContext';
import StepperControl from '../StepperControl';

const TrackYourEmails = ({ currentStep, steps, handleClick}) => {

  const { userData, updateUserData } = useUserData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [isPM, setIsPM] = useState(false);
  const [errors, setErrors] = useState({});

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    if (userData.date) {
      const date = new Date(userData.date);
      setCurrentDate(date);
      setSelectedDate(date.getDate());
    }
    if (userData.time) {
      const [time, period] = userData.time.split(' ');
      const [hours, minutes] = time.split(':');
      setHour(parseInt(hours) % 12 || 12);
      setMinute(parseInt(minutes));
      setIsPM(period === 'PM');
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;
      updateUserData({ date: formattedDate });
    }
  }, [selectedDate, currentDate]);

  useEffect(() => {
    const formattedHour = isPM ? (hour % 12) + 12 : hour % 12;
    const formattedTime = `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
    updateUserData({ time: formattedTime });
  }, [hour, minute, isPM]);

  console.log(userData)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  firstDayOfMonth = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

  const incrementHour = () => setHour((prev) => (prev % 12) + 1);
  const decrementHour = () => setHour((prev) => (prev - 2 + 12) % 12 + 1);
  const incrementMinute = () => setMinute((prev) => (prev + 1) % 60);
  const decrementMinute = () => setMinute((prev) => (prev - 1 + 60) % 60);
  const toggleAMPM = () => setIsPM((prev) => !prev);

  const renderCalendarDays = () => {
    const days = [];
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDay = prevMonthDays - firstDayOfMonth + i + 1;
      days.push(<div key={`prev-${i}`} className="w-10 h-10 text-gray-400 flex items-center justify-center">{prevMonthDay}</div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className={`w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-200 ${selectedDate === i ? 'bg-orange-500 text-white rounded-full' : 'rounded-lg'}`} onClick={() => setSelectedDate(i)}>
          {i}
        </div>
      );
    }

    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(
          <div key={`next-${i}`} className="w-10 h-10 text-gray-400 flex items-center justify-center">
            {i}
          </div>
        );
      }
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleChange = (field, value) => {
    updateUserData({ [field]: value });
    setErrors({ [field]: '' });
  };


  const validate = () => {
    const newErrors = {};
    if (!userData.date) newErrors.date = 'Date is required';
    if (!userData.time) newErrors.time = 'Time is required';
    if (!userData.timeZone) newErrors.timeZone = 'Time zone is required';
    if (!userData.email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleClick("next", true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Track your emails.</h2>
      <p className="mb-2 text-gray-600">Know what happens after you click send.</p>
      <p className="mb-6 text-gray-600">Get alerts when your e-mails are opened, clicked, and replied to.</p>

      <div className="bg-white shadow-md pt-[20px]">
        <div className="flex justify-around items-start">
          <div>
            <div className="w-72 p-4 font-sans">
              <div className="flex justify-evenly items-center mb-2">
                <button onClick={prevMonth} className="text-xl hover:text-orange-500 transition-colors duration-200">&lt;</button>
                <h2 className="text-lg font-bold">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={nextMonth} className="text-xl hover:text-orange-500 transition-colors duration-200">&gt;</button>
              </div>
              <div className="grid grid-cols-7 gap-[10px] text-center font-bold mb-2">
                <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
              </div>
              <div className="grid grid-cols-7 gap-[10px] text-center -ml-[8px]">
                {renderCalendarDays()}
              </div>
            </div>
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
          <div className="flex flex-col items-end">
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
            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            <div className="mt-6 text-sm text-gray-500 mr-2">
              <select
                id="countries"
                className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-full block w-[236px] p-3 dark:placeholder-gray-400"
                value={userData.timeZone}
                onChange={(e) => handleChange('timeZone', e.target.value)}
              >
                <option value="" className="font-200 text-gray-200">Recipient's timezone</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
              {errors.timeZone && <p className="text-red-500 text-xs mt-1">{errors.timeZone}</p>}
            </div>
            <div className="mt-6 mr-2">
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[236px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="john.doe@domain.com"
                value={userData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>
      </div>
      <StepperControl  handleClick={handleClick}  handleSubmit={handleSubmit}  currentStep={currentStep}  steps={steps} />
    </div>
  );
};

export default TrackYourEmails;

