import React from 'react';
import authService from '../../utils/auth.service';
import { useState, useEffect } from 'react';
import { Get, Post } from '../../utils/api';
import { Link } from 'react-router-dom';
import Vehicles from './Vehicle';

export default function InsurDashboard(){

    const username = authService.getUsername();
    const [hasInsuranceSchemes, setHasInsuranceSchemes] = useState(false);
    const [insuranceSchemes, setInsuranceSchemes] = useState([]);
    const [hasClaimRequests, setHasClaimRequests] = useState(false);
    const [claimRequests, setClaimRequests] = useState([]);

    //make a get request to get all insurance schemes owned by the company
    const getInsuranceSchemes = async () => {
            
            const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify(username)+"]&fcn=queryInsuranceByAgency"
            console.log(url);
            const data = await Get(url);
            console.log(data);
            return data;
    }

    const getInsuranceClaimRequests = async () => {
        const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify(username)+"]&fcn=queryInsuranceClaimRequestsByAgency"
        console.log(url);
        const data = await Get(url);
        console.log(data);
        return data;
    }

    const handleDelete = async (id) => {
        const post_url = "channels/mychannel/chaincodes/fabcar";
        const post_data = {
            fcn: "deleteInsurance",
            chaincodeName: "fabcar",
            channelName: "mychannel",
            args: [id]
        };
        console.log(post_data);
        const data = Post(post_url, post_data);
        console.log(data);
    }

    useEffect(() => {
        const insuranceData = getInsuranceSchemes().then(data => {
            console.log(data.data.result.length)
            if(data.data.result.length > 0){
                setHasInsuranceSchemes(true);
            }

            console.log(data.data.result)
            setInsuranceSchemes(data.data.result);

        })
        .catch(err => {
            console.log(err);
        });
        
        const claimRequestsData = getInsuranceClaimRequests().then(data => {
            console.log(data.data.result.length)
            if(data.data.result.length > 0){
                setHasClaimRequests(true);
            }

            console.log(data.data.result)
            setClaimRequests(data.data.result);

        })
        .catch(err => {
            console.log(err);
        });
    }, []);


    
    return(
        <div className='text-center'>
            <h1 className='title'>Insurance Company Dashboard</h1>
            <h1 className='sub-title'>Welcome {username}</h1>
            <Link to="/">
                <button className="primary-button" onClick={authService.logout}>Log out</button>
            </Link>
            <Link to="/insur-form">
                <button className="primary-button">Create Insurance</button>
            </Link>
            <h2>Insurance schemes provided by {username}</h2>
            {/* Display insurance schemes if hasInsuranceData */}
            {hasInsuranceSchemes && <div className='outer-main'>
                {insuranceSchemes.map(insuranceScheme => {
                    return <div className='card-main'>
                        <div className='container-main'>
                        <h3>{insuranceScheme.key}</h3>
                        <p>Name : {insuranceScheme.value.name}</p>
                        <p>Agency : {insuranceScheme.value.agency}</p>
                        <p>Coverage : {insuranceScheme.value.coverage}</p>
                        <p>Validity : {insuranceScheme.value.validity} year</p>
                        <p>Cost : Rs.{insuranceScheme.value.cost}/-</p>
                        <button className="secondary-button" onClick={()=>handleDelete(insuranceScheme.key)}>Remove</button> 
                        </div>
                    </div>
                }
                )}

                </div> }  
            {!hasInsuranceSchemes && <h3>No insurance schemes found</h3>}
            <h2>Insurance Claim Requests Recieved</h2>
            {/* Display insurance claim requests if hasInsuranceClaimRequests */}
            {hasClaimRequests && <div className='outer-main'>
                {claimRequests.map(claimRequest => {
                    return(
                        <div className='card-main'>
                            <div className='container-main'>
                            <h3>{claimRequest.value.model}</h3>
                            <p>{claimRequest.value.color}</p>

                            <button className="secondary-button">Approve Claim</button>
                            <button className="secondary-button">Decline Claim</button>
                            </div>
                        </div>
                    )
                }
                )}
            </div> }
            {!hasClaimRequests && <h3>No insurance claim requests found</h3>}
        </div>
    )
}