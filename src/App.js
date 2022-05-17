import React from 'react'
import {useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'
import CarsForSale from './components/pages/CarsForSale'
import TransDashboard from './components/pages/TransDashboard'


import './App.css'
import authService from './utils/auth.service'
import OwnerDashboard from './components/pages/OwnerDashboard'
import VehicleDetails from './components/pages/VehicleDetails'
import InsurDashboard from './components/pages/InsurDashboard'
import ManufDashboard from './components/pages/ManufDashboard'
import ScrapDashboard from './components/pages/ScrapDashboard'

export default function App() {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={ <LandingPage/> } />
                    <Route path="/login" element={ <LoginPage/> } />
                    <Route path="/register" element={ <RegisterPage/> } />
                    <Route path="/forget-password" element={ <ForgetPasswordPage/> } />
                    <Route path="/home" element={ <HomePage/> } />
                    <Route path='/owner-dashboard' element={ <OwnerDashboard/> } />
                    <Route path='/vehicle-details/:carid' element={ <VehicleDetails/> } />
                    <Route path='/cars-for-sale' element={ <CarsForSale/> } />
                    <Route path='/trans-dashboard' element={<TransDashboard/>}/>
                    <Route path='/insur-dashboard' element={<InsurDashboard/>}/>
                    <Route path='/manuf-dashboard' element={<ManufDashboard/>}/>
                    <Route path='/scrap-dashboard' element={<ScrapDashboard/>}/>

                </Routes>
            </div>
        </Router>
    )
}



