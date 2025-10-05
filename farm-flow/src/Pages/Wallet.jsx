import React from 'react'
import { FaArrowLeftLong, FaPlus } from 'react-icons/fa6'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { Link } from 'react-router-dom'


const Wallet = () => {
  return (
    <>
    <div className='min-h-screen bg-green-100 pt-4'>
          <div className='flex items-center gap-3 bg-green-800 w-100 m-auto p-1 rounded-sm'>
            <Link to="/user">
            <FaArrowLeftLong className='cursor-pointer'/>
            </Link>
            <img src="Profile image2.jpg" alt="" className='h-15 rounded-full'/>
            <p className='mt-10'>Hi Username!</p>
          </div>
          <div className='bg-green-400 w-80 m-auto mt-2 rounded-lg'>
            <div className='flex justify-between items-center px-6'>
            <h1>Wallet Balance</h1>
            <MdOutlineRemoveRedEye className='text-green-600'/>
          </div>
          <div className='text-center text-2xl font-bold pb-10 pt-6'>
            <h1>&#8358; 0.00</h1>
          </div>
          </div>
          <div className='bg-green-400 w-80 m-auto mt-2 rounded-lg pb-3'>
            <div className='flex flex-col'>
              <div className='flex justify-center items-center bg-green-700 w-77 mt-2 rounded-lg m-auto cursor-pointer hover:bg-green-800 transition duration-300 ease-linear'>
                <FaPlus className='mr-10'/>
                <Link to='/add'>
                <button type='submit' className='mr-10 cursor-pointer'> Add Money</button>
                </Link>
              </div>
            <button type='submit' className='WalletBtn'>Withdraw</button>
            <button type='submit' className='WalletBtn'>Transaction History</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Wallet