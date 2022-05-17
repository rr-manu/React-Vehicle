import React from 'react'
import {useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'

import './App.css'
import authService from './utils/auth.service'
import OwnerDashboard from './components/pages/OwnerDashboard'
import VehicleDetails from './components/pages/VehicleDetails'

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
                </Routes>
            </div>
        </Router>
    )
}



