import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import BackgroundImage from '../../assets/images/bg.jpg'

export default function LandingPage() {
    return (
        <header style={ HeaderStyle }>
            <div className='wrapper'>
                <div className='box box1'>
                    <h1 className='title'>VEHIS</h1>
                    <p className='sub-title'>Vehicle Life Cycle Management</p>
                </div>
            </div>
            
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">LOGIN</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>REGISTER </span></button>
                </Link>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}