import React from 'react';
import './Vehicle.css'
import { useNavigate } from "react-router-dom";
import { Post } from "../../utils/api";


const Vehicles=({data})=>{

    const navigate = useNavigate();
    const url = "channels/mychannel/chaincodes/fabcar"

    const handleClick = (id) => {
        console.log("Welcome to view details");
        console.log(id);
        navigate(`/vehicle-details/${id}`);
    };

    const handleMaintainance = async(id) => {
        console.log("Welcome to maintainance");
        console.log(id);

        //post api to request for mainatainance
        const mainatainance_data = {
            fcn: "requestInspection",
            chaincodeName:"fabcar",
            channelName: "mychannel",
            args: [id]
        }
        console.log(mainatainance_data);

        const postResponse = await Post(url, mainatainance_data);
        console.log(postResponse);
    };

    const handleSell = async(id) => {
        console.log("Welcome to sell");
        console.log(id);

        const resale_data = {
            fcn: "putUpForResale",
            chaincodeName:"fabcar",
            channelName: "mychannel",
            args: [id]
        }
        console.log(resale_data);

        const postResponse = await Post(url, resale_data);
        console.log(postResponse);
    };

    const handleScrap = async(id) => {
        console.log("Welcome to scrap");
        console.log(id);

        // const resale_data = {
        //     fcn: "requestForScrap",
        //     chaincodeName:"fabcar",
        //     channelName: "mychannel",
        //     args: [JSON.stringify(id)]
        // }
        // console.log(resale_data);

        // const postResponse = await Post(url, resale_data);
        // console.log(postResponse);
    };

    const handleInsurance = (id) => {
        console.log("Welcome to insurance");
        console.log(id);
        navigate(`/insurance/${id}`);
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
                           
                        </div>
                            <button onClick={() => handleClick(vehicle.key)} >View Details</button>
                            <button onClick={() => handleMaintainance(vehicle.key)} >Request Maintainance</button>
                            <button onClick={() => handleInsurance(vehicle.key)} >View/Renew Insurance</button>
                            <button onClick={() => handleSell(vehicle.key)} >Sell Car</button>
                            <button onClick={() => handleScrap(vehicle.key)} >Request for scrap</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Vehicles;