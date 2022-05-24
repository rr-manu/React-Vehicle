import React from "react";
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import authService from "../../utils/auth.service";
import { Get } from "../../utils/api";
import Vehicles from "./Vehicle";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {

    const username = authService.getUsername();
    const [hasVehicles, setHasVehicles] = useState(false);


  
    //make a get request to get vehicle list
    const getVehicles = async () => {


        const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify(username)+"]&fcn=queryCarByOwner"
        console.log(url);
        const data = await Get(url);
        console.log(data);
        return data;
    };

    const [vehiclesData, setVehiclesData] = useState([]);

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

    

    return (
        <div className="text-center">
            <h1 className="main-title home-page-title">Welcome to Owner Dashboard ,{username}</h1>
            <Link to="/cars-for-sale">
                <button className="primary-button">Cars for Sale</button>
            </Link>
            <Link to="/">
                <button className="primary-button" onClick={authService.logout}>Log out</button>
            </Link>
            <Link to="/vehicle-form">
                <button className="primary-button">Add Vehicle</button>
            </Link>
            {/* Display vehicle if hasVehicleData */}
            {hasVehicles ? <Vehicles data={vehiclesData} /> : <h2>No Vehicles Found</h2>}

        </div>
    )
}