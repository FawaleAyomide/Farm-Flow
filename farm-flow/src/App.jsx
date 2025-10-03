import React from 'react'
import './App.css'
import Users from './Pages/Users';
import Edit from './Pages/Edit';
import Wallet from './Pages/Wallet';
import AddMoney from './Pages/AddMoney';
import CapturePhoto from './Pages/CapturePhoto';
import CameraCapture from './Pages/CameraCapture';
import ProfilePicture from './Pages/ProfilePicture';
import UsePicture from './Pages/UsePicture';
import Customers from './Pages/Customers';
import Customer from './Pages/Customer';



function App() {

  return (
    <>
    <Users />
    <Edit />
    <Wallet />
    <AddMoney />
    <CapturePhoto />
    <CameraCapture />
    <ProfilePicture />
    <UsePicture />
    <Customers />
    <Customer />
    </>
  )
}

export default App
