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
            <div className="w-72 p-4 font-sans h-auto">
              <div className="flex justify-evenly items-center mb-2">
                <button onClick={prevMonth} className="text-xl hover:text-orange-500 transition-colors duration-200">&lt;</button>
                <h2 className="text-lg font-bold">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={nextMonth} className="text-xl hover:text-orange-500 transition-colors duration-200">&gt;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-bold mb-2">
                <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center -ml-[8px]">
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
            <div className="text-sm text-gray-500 mr-2">
              <select id="countries" className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-full block w-[236px] p-3 dark:placeholder-gray-400" value={userData.timeZone} onChange={(e) => handleChange('timeZone', e.target.value)} >
                  <option value="" className="font-200 text-gray-200">Recipient's timezone</option>
                  <option value="Etc/GMT+12">(GMT-12:00) International Date Line West</option>
                  <option value="Pacific/Midway">(GMT-11:00) Midway Island, Samoa</option>
                  <option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option>
                  <option value="US/Alaska">(GMT-09:00) Alaska</option>
                  <option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</option>
                  <option value="America/Tijuana">(GMT-08:00) Tijuana, Baja California</option>
                  <option value="US/Arizona">(GMT-07:00) Arizona</option>
                  <option value="America/Chihuahua">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                  <option value="US/Mountain">(GMT-07:00) Mountain Time (US & Canada)</option>
                  <option value="America/Managua">(GMT-06:00) Central America</option>
                  <option value="US/Central">(GMT-06:00) Central Time (US & Canada)</option>
                  <option value="America/Mexico_City">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                  <option value="Canada/Saskatchewan">(GMT-06:00) Saskatchewan</option>
                  <option value="America/Bogota">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                  <option value="US/Eastern">(GMT-05:00) Eastern Time (US & Canada)</option>
                  <option value="US/East-Indiana">(GMT-05:00) Indiana (East)</option>
                  <option value="Canada/Atlantic">(GMT-04:00) Atlantic Time (Canada)</option>
                  <option value="America/Caracas">(GMT-04:00) Caracas, La Paz</option>
                  <option value="America/Manaus">(GMT-04:00) Manaus</option>
                  <option value="America/Santiago">(GMT-04:00) Santiago</option>
                  <option value="Canada/Newfoundland">(GMT-03:30) Newfoundland</option>
                  <option value="America/Sao_Paulo">(GMT-03:00) Brasilia</option>
                  <option value="America/Argentina/Buenos_Aires">(GMT-03:00) Buenos Aires, Georgetown</option>
                  <option value="America/Godthab">(GMT-03:00) Greenland</option>
                  <option value="America/Montevideo">(GMT-03:00) Montevideo</option>
                  <option value="America/Noronha">(GMT-02:00) Mid-Atlantic</option>
                  <option value="Atlantic/Cape_Verde">(GMT-01:00) Cape Verde Is.</option>
                  <option value="Atlantic/Azores">(GMT-01:00) Azores</option>
                  <option value="Africa/Casablanca">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
                  <option value="Etc/Greenwich">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                  <option value="Europe/Amsterdam">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                  <option value="Europe/Belgrade">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                  <option value="Europe/Brussels">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                  <option value="Europe/Sarajevo">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                  <option value="Africa/Lagos">(GMT+01:00) West Central Africa</option>
                  <option value="Asia/Amman">(GMT+02:00) Amman</option>
                  <option value="Europe/Athens">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                  <option value="Asia/Beirut">(GMT+02:00) Beirut</option>
                  <option value="Africa/Cairo">(GMT+02:00) Cairo</option>
                  <option value="Africa/Harare">(GMT+02:00) Harare, Pretoria</option>
                  <option value="Europe/Helsinki">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                  <option value="Asia/Jerusalem">(GMT+02:00) Jerusalem</option>
                  <option value="Europe/Minsk">(GMT+02:00) Minsk</option>
                  <option value="Africa/Windhoek">(GMT+02:00) Windhoek</option>
                  <option value="Asia/Kuwait">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
                  <option value="Europe/Moscow">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                  <option value="Africa/Nairobi">(GMT+03:00) Nairobi</option>
                  <option value="Asia/Tbilisi">(GMT+03:00) Tbilisi</option>
                  <option value="Asia/Tehran">(GMT+03:30) Tehran</option>
                  <option value="Asia/Muscat">(GMT+04:00) Abu Dhabi, Muscat</option>
                  <option value="Asia/Baku">(GMT+04:00) Baku</option>
                  <option value="Asia/Yerevan">(GMT+04:00) Yerevan</option>
                  <option value="Asia/Kabul">(GMT+04:30) Kabul</option>
                  <option value="Asia/Yekaterinburg">(GMT+05:00) Yekaterinburg</option>
                  <option value="Asia/Karachi">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
                  <option value="Asia/Calcutta">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                  <option value="Asia/Calcutta">(GMT+05:30) Sri Jayawardenapura</option>
                  <option value="Asia/Katmandu">(GMT+05:45) Kathmandu</option>
                  <option value="Asia/Almaty">(GMT+06:00) Almaty, Novosibirsk</option>
                  <option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</option>
                  <option value="Asia/Rangoon">(GMT+06:30) Yangon (Rangoon)</option>
                  <option value="Asia/Bangkok">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                  <option value="Asia/Krasnoyarsk">(GMT+07:00) Krasnoyarsk</option>
                  <option value="Asia/Hong_Kong">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                  <option value="Asia/Kuala_Lumpur">(GMT+08:00) Kuala Lumpur, Singapore</option>
                  <option value="Asia/Irkutsk">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                  <option value="Australia/Perth">(GMT+08:00) Perth</option>
                  <option value="Asia/Taipei">(GMT+08:00) Taipei</option>
                  <option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                  <option value="Asia/Seoul">(GMT+09:00) Seoul</option>
                  <option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</option>
                  <option value="Australia/Adelaide">(GMT+09:30) Adelaide</option>
                  <option value="Australia/Darwin">(GMT+09:30) Darwin</option>
                  <option value="Australia/Brisbane">(GMT+10:00) Brisbane</option>
                  <option value="Australia/Canberra">(GMT+10:00) Canberra, Melbourne, Sydney</option>
                  <option value="Australia/Hobart">(GMT+10:00) Hobart</option>
                  <option value="Pacific/Guam">(GMT+10:00) Guam, Port Moresby</option>
                  <option value="Asia/Vladivostok">(GMT+10:00) Vladivostok</option>
                  <option value="Asia/Magadan">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                  <option value="Pacific/Auckland">(GMT+12:00) Auckland, Wellington</option>
                  <option value="Pacific/Fiji">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                  <option value="Pacific/Tongatapu">(GMT+13:00) Nuku'alofa</option>
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

