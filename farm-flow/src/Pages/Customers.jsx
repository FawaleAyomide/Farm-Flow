import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Customers = () => {
  return (
<>
    <div className='min-h-screen bg-green-100 pt-4'>
      <div className='m-auto w-100 '>
          <div className='flex justify-center items-center bg-green-700 rounded-t-xl pt-10'>
            <Link to="/user" className='mr-auto'>
            <FaArrowLeftLong />
            </Link>
            <p className='font-semibold mr-auto'>Customers</p>
          </div>
          <div className='flex pt-2 mt-2 w-80 m-auto border-2 border-green-400 rounded-lg'>
            <div>
              <img src="Profile image2.jpg" alt="" className='h-13 rounded-full ml-2'/>
            </div>
            <div className='flex flex-col gap-2 ml-2'>
              <div className='flex justify-between'>
              <h1>Asim Ken</h1>
              <p>6:20PM</p>
            </div>
            <div className='flex items-center'>
              <p>I want 50 basket delivered....</p>
              <Link to="/history">
              <HiOutlinePhotograph />
              </Link> 
            </div>
            </div>
          </div>
          <div className='customer-container'>
            <div>
              <img src="Profile image2.jpg" alt="" className='h-13 rounded-full ml-2'/>
            </div>
            <div className='flex flex-col gap-2 ml-2'>
              <div className='flex justify-between'>
              <h1>Asim Ken</h1>
              <p>6:20PM</p>
            </div>
            <div className='flex items-center'>
              <p>I want 50 basket delivered....</p>
              <HiOutlinePhotograph />
            </div>
            </div>
          </div>
          <div className='customer-container'>
            <div>
              <img src="Profile image2.jpg" alt="" className='h-13 rounded-full ml-2'/>
            </div>
            <div className='flex flex-col gap-2 ml-2'>
              <div className='flex justify-between'>
              <h1>Asim Ken</h1>
              <p>6:20PM</p>
            </div>
            <div className='flex items-center'>
              <p>I want 50 basket delivered....</p>
              <HiOutlinePhotograph />
            </div>
            </div>
          </div>
          <div className='customer-container'>
            <div>
              <img src="Profile image2.jpg" alt="" className='h-13 rounded-full ml-2'/>
            </div>
            <div className='flex flex-col gap-2 ml-2'>
              <div className='flex justify-between'>
              <h1>Asim Ken</h1>
              <p>6:20PM</p>
            </div>
            <div className='flex items-center'>
              <p>I want 50 basket delivered....</p>
              <HiOutlinePhotograph />
            </div>
            </div>
          </div>
          <div className='customer-container'>
            <div>
              <img src="Profile image2.jpg" alt="" className='h-13 rounded-full ml-2'/>
            </div>
            <div className='flex flex-col gap-2 ml-2'>
              <div className='flex justify-between'>
              <h1>Asim Ken</h1>
              <p>6:20PM</p>
            </div>
            <div className='flex items-center'>
              <p>I want 50 basket delivered....</p>
              <HiOutlinePhotograph />
            </div>
            </div>
          </div>
          <div className='customer-container'>
            <div>
              <img src="Profile image2.jpg" alt="" className='h-13 rounded-full ml-2'/>
            </div>
            <div className='flex flex-col gap-2 ml-2'>
              <div className='flex justify-between'>
              <h1>Asim Ken</h1>
              <p>6:20PM</p>
            </div>
            <div className='flex items-center'>
              <p>I want 50 basket delivered....</p>
              <HiOutlinePhotograph />
            </div>
            </div>
          </div>
          <div className='customer-container'>
            <div>
              <img src="Profile image2.jpg" alt="" className='h-13 rounded-full ml-2'/>
            </div>
            <div className='flex flex-col gap-2 ml-2'>
              <div className='flex justify-between'>
              <h1>Asim Ken</h1>
              <p>6:20PM</p>
            </div>
            <div className='flex items-center'>
              <p>I want 50 basket delivered....</p>
              <HiOutlinePhotograph />
            </div>
            </div>
          </div>
      </div>
    </div>
</>
  )
}

export default Customers