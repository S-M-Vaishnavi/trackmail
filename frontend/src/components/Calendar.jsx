import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  firstDayOfMonth = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

  const months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];

  const renderCalendarDays = () => {
    const days = [];
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDay = prevMonthDays - firstDayOfMonth + i + 1;
      days.push(<div key={`prev-${i}`} className="w-10 h-10 text-gray-400 flex items-center justify-center">{prevMonthDay}</div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div  key={i} className={`w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-200 ${selectedDate === i ? 'bg-orange-500 text-white rounded-full' : 'rounded-lg'}`} onClick={() => setSelectedDate(i)}>
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

  return (
    <div className="w-72 p-4 font-sans">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-xl hover:text-orange-500 transition-colors duration-200">&lt;</button>
        <h2 className="text-lg font-bold">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={nextMonth} className="text-xl hover:text-orange-500 transition-colors duration-200">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-bold mb-2">
        <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;