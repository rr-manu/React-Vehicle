import React from 'react'
import { Link } from 'react-router-dom'
import authService from "../../utils/auth.service";

import './HomePage.css'

export default function HomePage() {
    return (
        <div className="text-center">
            <h1 className="main-title home-page-title">welcome to our app</h1>
            <Link to="/">
                <button className="primary-button" onClick={authService.logout}>Log out</button>
            </Link>
        </div>
    )
}
