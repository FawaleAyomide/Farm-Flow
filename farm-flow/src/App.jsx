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
    </>
  )
}

export default App
