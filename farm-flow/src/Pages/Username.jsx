import React from 'react'

const Username = () => {
  return (
    < >
    <div className='min-h-screen bg-green-100 pt-10'>
      <div className='w-100 m-auto px-2'>
        <div className='space-y-3'>
          <label htmlFor="Username" className='block text-sm font-bold'>Username</label>
        <input type="text" id='Username' name='Username' required placeholder='Enter Username' className='w-full px-4 border-2 border-green-500 rounded-md'/>
        <label htmlFor="Location" className='block text-sm font-bold'>Location</label>
        <input type="text" id='Location' name='Location' required placeholder='Enter Location' className='w-full px-4 border-2 border-green-500 rounded-md'/>
        <label htmlFor="number" className='block text-sm font-bold'>Change Phone</label>
        <input type="number" id='ChangePhone' name='ChangePhone' required placeholder='-----------' className='w-full px-4 border-2 border-green-500 rounded-md'/>
        <label htmlFor="email" className='block text-sm font-bold'>Input email address</label>
        <input type="email" id='EmailAddress' name='EmailAddress' required placeholder='--------' className='w-full px-4 border-2 border-green-500 rounded-md'/>
        </div>
        <p className='text-end text-green-500 mt-1'>Add privacy</p>
        <button type='submit' className='bg-green-700 text-white w-full mt-1 rounded-sm'>Accept</button>
      </div>
    </div>
    </>
  )
}

export default Username