import React ,{useState,useEffect} from 'react';
import './Vehicle.css'
import { useNavigate } from "react-router-dom";
import { Post } from "../../utils/api";
import authService from '../../utils/auth.service';


const Vehicles=({data})=>{

    const navigate = useNavigate();
    const url = "channels/mychannel/chaincodes/fabcar"
    const orgName = authService.getOrgName();
    const [isOwner, setIsOwner] = useState(false);

    const handleClick = (id) => {
        console.log("Welcome to view details");
        console.log(id);
        navigate(`/vehicle-details/${id}`);
    };

    const handleMaintainance = async(id) => {
        alert("Maintainance request is being sent");
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
        alert("Vehicle is being put up for resale")
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
        alert("Vehicle is being sent for scrapping")
        console.log("Welcome to scrap");
        console.log(id);

        const resale_data = {
            fcn: "requestForScrap",
            chaincodeName:"fabcar",
            channelName: "mychannel",
            args: [id]
        }
        console.log(resale_data);

        const postResponse = await Post(url, resale_data);
        console.log(postResponse);
    };

    const handleInsurance = (id) => {
        console.log("Welcome to insurance");
        console.log(id);
        navigate(`/insurance/${id}`);
    };

    const handleDelete = async(id) => {
        console.log("Welcome to delete");
        console.log(id);

        const resale_data = {
            fcn: "deleteCar",
            chaincodeName:"fabcar",
            channelName: "mychannel",
            args: [id]
        }
        console.log(resale_data);

        const postResponse = await Post(url, resale_data);
        console.log(postResponse);
    }

    useEffect(() => {
        console.log("The organization is: "+ orgName);
        if(orgName === "Owner"){
            setIsOwner(true);
        }
    }, [])
         
    return(
        <div>
            {isOwner && <div>
            <h1>Vehicles Owned</h1>
            <div className='outer-main' >
                {data.map(vehicle=>{
                    return(
                        <div className ="card-main" key={vehicle.key} >
        
                            <div className ="container-main">
                                <h3>{vehicle.value.make}</h3>
                                <h3>{vehicle.value.model}</h3>
                                <p>{vehicle.value.color}</p>
                                <p>{vehicle.value.status}</p>
                           
                            </div>
                            <div className="buttons">
                                <button className='secondary-button' onClick={() => handleClick(vehicle.key)} >View Details</button>
                                <button className='secondary-button' onClick={() => handleMaintainance(vehicle.key)} >Request Maintainance</button>
                                <button className='secondary-button' onClick={() => handleInsurance(vehicle.key)} >View/Renew Insurance</button>
                                <button className='secondary-button' onClick={() => handleSell(vehicle.key)} >Sell Car</button>
                                <button className='secondary-button' onClick={() => handleScrap(vehicle.key)} >Scrap Car</button>
                               
                            </div>
            
                        </div>
                    
            )}
            )}
            </div>
            </div>}
            {!isOwner && <div>
            <h1>Vehicles Produced</h1>
            <div className='outer-main' >
                {data.map(vehicle=>{
                    return(
                        <div className ="card-main" key={vehicle.key} >
        
                            <div className ="container-main">
                                <h3>{vehicle.value.make}</h3>
                                <h3>{vehicle.value.model}</h3>
                                <p>{vehicle.value.transmissionType}</p>
                                <p>{vehicle.value.fuelType}</p>
                                <p>{vehicle.value.color}</p>
                           
                            </div>
                            <div className="buttons">
                                <button className='secondary-button' onClick={() => handleClick(vehicle.key)} >View Details</button>
                                <button className='secondary-button' onClick={() => handleDelete(vehicle.key)} >Delete Car</button>
                            </div>
            
                        </div>
                    
            )}
            )}
            </div>
            </div>}
        </div>
    )
}

export default Vehicles;