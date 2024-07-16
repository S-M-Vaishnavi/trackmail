import React from 'react'

const ThankYou = () => {
  return (
    <div> 
      <div class="flex flex-col items-center p-4 space-y-5 bg-white mt-10 h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Thank You !</h1>
        <p>Thank you for your interest! Check your email for a link to the guide.</p>
      </div>
    </div>
  )
}

export default ThankYou
