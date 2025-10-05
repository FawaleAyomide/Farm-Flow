import React from 'react'
import { PiMapPinAreaBold } from 'react-icons/pi'
import { LuBadgeCheck } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'

const Users = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/edit,');
  };

  return (
    < >
    <div className='min-h-screen bg-green-100 pt-4'>
      <div className='m-auto w-100 border-2 border-green-500 rounded-lg '>
      <div className='flex justify-end items-center gap-1'>
        <PiMapPinAreaBold  className='text-green-500'/>
        <h1 className='pt-1 mr-10 text-sm'>Markurdi</h1>
      </div>
      <div className='flex gap-2 p-2'>
        <div>
          <img src="Profile image2.jpg" alt="profile picture" className='h-15 rounded-full'/>
        </div>
        <div className='flex gap-1 mt-5 leading-5'>
          <div>
            <h1>Username</h1>
            <h1>Joan Ken</h1>
          </div>
          <LuBadgeCheck  className='text-green-500 mt-6'/>
        </div>
      </div>
      <h1 className='pl-2 mt-2 font-semibold text-lg'>Contact Information</h1>
      <div className='flex justify-between pl-2'>
        <div>
          <p>username@gmail.com</p>
          <p>+23412607078</p>
        </div>
        <Link to="/edit">
        <button onClick={handleEditClick} className='text-md px-2 m-4 2 w-10 bg-green-700 rounded-xl cursor-pointer hover:bg-green-800  transition duration-300 ease-linear'>Edit</button>
        </Link>
      </div>
    </div>
    <div className='m-auto w-100 border-2 border-green-500 mt-4'>
      <div className='border-b-2 border-green-500 p-2'>
        <Link to="/customers">History</Link>
      </div>
      <div className='border-b-2 border-green-500 p-2'>
        <a href="">Chat</a>
      </div>
      <div className='border-b-2 border-green-500 p-2'>
        <Link to="/wallet">Wallet</Link>
      </div>
      <div className='p-2'>
        <a href="">Settings</a>
      </div>
    </div>
    </div>
    </>
  )
}

export default Users