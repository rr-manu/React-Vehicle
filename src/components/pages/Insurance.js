import React from 'react'
import { Get,Post } from '../../utils/api';
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

import './Insurance.css'

export default function Insurance() {
    //get carid from url
    const carid = window.location.pathname.split("/")[2];
    //const carid = "CAR1";
    console.log(carid);

     //make a get request to get vehicle details
     const getVehicle = async () => {

        const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify(carid)+"]&fcn=queryCar"
        console.log(url);
        const data = await Get(url);
        console.log(data);
        return data;
    };

    const getAllInsuranceSchemes = async () => {
        const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify("")+"]&fcn=queryAllInsuranceSchemes";
        console.log(url);
        const data = await Get(url);
        console.log(data);
        return data;
    };


    const [vehicleData, setVehicleData] = useState();
    const [hasVehicleData, setHasVehicleData] = useState(false);
    const [insuranceSchemes, setInsuranceSchemes] = useState();
    const [hasInsuranceSchemes, setHasInsuranceSchemes] = useState(false);

    const handlePurchase = async (insuranceid) => {
        const post_url = "channels/mychannel/chaincodes/fabcar";
        const post_data = {
            fcn: "purchaseInsurance",
            chaincodeName: "fabcar",
            channelName: "mychannel",
            args: [carid, insuranceid]
        };
        console.log(post_data);
        const data = await Post(post_url, post_data);
        console.log(data);
        return data;
    };

    const handleRaiseClaim= async() => {
        const post_url = "channels/mychannel/chaincodes/fabcar";
        const post_data = {
            fcn: "raiseClaimInsurance",
            chaincodeName: "fabcar",
            channelName: "mychannel",
            args: [carid]
        };
        console.log(post_data);
        const data = await Post(post_url, post_data);
        console.log(data);
        return data;
    }

    useEffect(() => {
        const data = getVehicle()
        .then(data => {

            console.log(data.data.result)
            setVehicleData(data.data.result);
            setHasVehicleData(true);
        })

        .catch(err => {
            console.log(err);
        });

        const insurance_data = getAllInsuranceSchemes()
        .then(insurance_data => {
            console.log(insurance_data.data.result)
            setInsuranceSchemes(insurance_data.data.result);
            setHasInsuranceSchemes(true);
        }
        )
        .catch(err => {
            console.log(err);
        }
        );
    }, []);

  return (
    <div>
            <Link to="/owner-dashboard">
                <button className="primary-button">Dashboard</button>
        </Link>
        <h1>Insurance of {carid}</h1>
    
        <div>
            <h2>Current Insurance Plans</h2>
            <div className='insurance-current'>
            {/* Display details of current insurance plan */}
            {hasVehicleData && vehicleData.insuranceID && <div>
                <p>Insurance ID: {vehicleData.insuranceID}</p>
                <p>Insurance Expiry: {vehicleData.insuranceExpiry}</p>
                <p>Insurance Verified: {vehicleData.isInsuranceVerified.toString()} </p>
                <button onClick={() => {handleRaiseClaim()}}>Raise Claim Request</button>
                </div>
            }
            {
                !hasVehicleData && <p>No Insurance has been purchased for this car.</p>
            }
            </div>
        </div>
        <div>
            <h2>Available Insurance Plans</h2>
            {/* Display details of available insurance plans */}
            <div className='insurance-available'>
            {hasInsuranceSchemes && insuranceSchemes.map(insuranceScheme => {
                return(
                    <div className ="card" key={insuranceScheme.key} >
                        <div className ="container">
                            <h5>Insurance ID: {insuranceScheme.key}</h5>
                            <p>Insurance Name: {insuranceScheme.value.name}</p>
                            <p>Insurance Agency: {insuranceScheme.value.agency}</p>
                            <p>Insurance Price: {insuranceScheme.value.cost}</p>
                            <p>Insurance Coverage: {insuranceScheme.value.coverage}</p>
                            <p>Insurance Validity: {insuranceScheme.value.validity} year</p>
                            <button onClick={() => {handlePurchase(insuranceScheme.key)}}>Purchase</button>
                        </div>
                    </div>
                )
            })}
            </div>

        </div>
    </div>

  )
}

