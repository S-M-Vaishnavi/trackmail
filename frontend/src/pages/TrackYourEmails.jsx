import React from 'react'
import Calendar from '../components/Calendar';
import TimePicker from '../components/TimePicker';

const TrackYourEmails = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Track your emails.</h2>
      <p className="mb-2 text-gray-600">Know what happens after you click send.</p>
      <p className="mb-6 text-gray-600">Get alerts when your e-mails are opened, clicked, and replied to.</p>
      
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex justify-around items-start'>
          <Calendar />
          <div className='flex flex-col items-end'>
            <TimePicker />
            <div className="mt-6 text-sm text-gray-500 mr-2">
              <select id="countries" className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-full  block w-[200px] p-3 dark:placeholder-gray-400">
                <option selected className='font-200 text-gray-200'> Recipient's timezone</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackYourEmails