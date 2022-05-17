import React from 'react';
import './Vehicle.css'
import { useNavigate } from "react-router-dom";


const Vehicles=({data})=>{

    const navigate = useNavigate();

    const handleClick = (id) => {
        console.log("hi there");
        console.log(id);
        navigate(`/vehicle-details/${id}`);
    };

         
    return(
        <div>
            <h1>Vehicles Owned</h1>
            <div className='outer' >
                {data.map(vehicle=>{
                    return(
                        <div className ="card" key={vehicle.key} >
                        <div className ="container">
                            <h3>{vehicle.value.make}</h3>
                            <h3>{vehicle.value.model}</h3>
                            <p>{vehicle.value.color}</p>
                            <p>{vehicle.value.status}</p>
                            <button onClick={() => handleClick(vehicle.key)}>View Details</button>
                        </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Vehicles;