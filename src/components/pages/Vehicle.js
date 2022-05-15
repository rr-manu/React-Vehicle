import React from 'react';
import './Vehicle.css'

const Vehicles=({data})=>{
    return(
        <div>
            <h1>Vehicles</h1>
            <div className='outer' >
                {data.map(vehicle=>{
                    return(
                        <div className ="card" key={vehicle.key}>
                        <div className ="container">
                            <h3>{vehicle.value.make}</h3>
                            <h3>{vehicle.value.model}</h3>
                            <p>{vehicle.value.color}</p>
                            <p>{vehicle.value.status}</p>
                        </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Vehicles;