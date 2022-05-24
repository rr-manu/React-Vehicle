import React from 'react';
import authService from '../../utils/auth.service';
import { useState, useEffect } from 'react';
import { Get, Post } from '../../utils/api';
import { Link } from 'react-router-dom';
import Vehicles from './Vehicle';

export default function ManufDashboard(){

    const username = authService.getUsername();
    const [hasVehicles, setHasVehicles] = useState(false);
    const [vehiclesData, setVehiclesData] = useState([]);

    //make a get request to get vehicle list
    const getVehicles = async () => {


        const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify(username)+"]&fcn=queryCarByOwner"
        console.log(url);
        const data = await Get(url);
        console.log(data);
        return data;
    };
    useEffect(() => {
        const data = getVehicles().then(data => {
            console.log(data.data.result.length)
            if(data.data.result.length > 0){
                setHasVehicles(true);
            }

            console.log(data.data.result)
            setVehiclesData(data.data.result);

        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return(
        <div className='text-center'>
            <h1>Welcome to Manufacturer Dashboard, {username}</h1>
            <Link to="/">
                <button className="primary-button" onClick={authService.logout}>Log out</button>
            </Link>
            <Link to="/vehicle-form">
                <button className="primary-button">Create Vehicle</button>
            </Link>
            <Vehicles data={vehiclesData} />
        </div>
    )
}