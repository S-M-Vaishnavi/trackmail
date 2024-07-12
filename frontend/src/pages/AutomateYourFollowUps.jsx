import React from 'react'


const AutomateYourFollowUps = () => {
  return (
    <div>
       <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Automate your follow-ups. </h2>
      <p className="mb-2 text-gray-600">Save dozens of hours every month.</p>
      <p className="mb-6 text-gray-600">Never manually follow-up with anyone, ever again</p>
      <div className='bg-white rounded-lg shadow-md p-6 mx-auto'>
        <h1>Select Ping Sequence</h1>
      <div class="flex items-center">
      <input id="radio-vertical-group-1" type="radio" name="radio-vertical-group" class="hidden checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100" checked/>
      <label for="radio-vertical-group-1" class="flex items-center cursor-pointer text-gray-600 text-sm font-normal">
      <span class="border border-gray-300  rounded-full mr-2 w-4 h-4 "></span> Radio button 
      </label>
      </div>
      <div class="flex items-center">
      <input id="radio-vertical-group-2" type="radio" name="radio-vertical-group" class="hidden checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"/>
      <label for="radio-vertical-group-2" class="flex items-center cursor-pointer text-gray-600 text-sm font-normal">
      <span class="border border-gray-300  rounded-full mr-2 w-4 h-4 "></span> Radio button 
      </label>
      </div>
      <div class="flex items-center">
      <input id="radio-vertical-group-3" type="radio" name="radio-vertical-group" class="hidden checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"/>
      <label for="radio-vertical-group-3" class="flex items-center cursor-pointer text-gray-600 text-sm font-normal">
      <span class="border border-gray-300  rounded-full mr-2 w-4 h-4 "></span> Radio button 
      </label>
      </div>
      </div>
    </div>
    </div>
  )
}

export default AutomateYourFollowUps
