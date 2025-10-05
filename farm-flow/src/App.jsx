import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Users from './Components/Users';
import Edit from './Pages/Edit';
import Wallet from './Pages/Wallet';
import AddMoney from './Pages/AddMoney';
import Customers from './Pages/Customers';
import Customer from './Pages/Customer';
import CapturePhoto from './Pages/CapturePhoto';
import CameraCapture from './Pages/CameraCapture';




function App() {

  return (
    <>
    <Users />
      <Routes>
        <Route path='/user' element={<Users />}/>
        <Route path='/edit' element={<Edit />}/>
        <Route path='/wallet' element={<Wallet />}/>
        <Route path='/add' element={<AddMoney />}/>
        <Route path='/customers' element={<Customers />}/>
        <Route path='/history' element={<Customer />}/>
        <Route path='/capture' element={<CapturePhoto />}/>
        <Route path='/camera' element={<CameraCapture />}/>
      </Routes>
    </>
  )
}

export default App
